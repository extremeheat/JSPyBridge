import time, threading, json, sys
from . import connection, config
from queue import Queue


class TaskState:
    def __init__(self):
        self.stopping = False

    def wait(self, ms):
        stopTime = time.time() + (ms / 1000)
        while time.time() < stopTime and not self.stopping:
            time.sleep(0.2)
        if self.stopping:
            sys.exit(1)


# The event loop here is shared across all threads. All of the IO between the
# JS and Python happens through this event loop. Because of Python's "Global Interperter Lock"
# only one thread can run Python at a time, so no race conditions to worry about.
class EventLoop:
    active = True
    sleepSeconds = 0.01
    # EventEmitters in JS to listen for
    events = []
    # The threads created managed by this event loop.
    threads = []

    outbound = []

    # After a socket request is made, it's ID is pushed to self.requests. Then, after a response
    # is recieved it's removed from requests and put into responses, where it should be deleted
    # by the consumer.
    requests = {}  # Map of requestID -> threading.Lock
    responses = {}  # Map of requestID -> response payload

    # === THREADING ===
    def _newTaskThread(self, handler, *args):
        state = TaskState()
        t = threading.Thread(target=handler, args=(state, *args), daemon=True)
        self.threads.append([state, handler, t])
        t.start()
        return t

    def start(self, method):
        h = hash(method)
        self._newTaskThread(method)

    # Signal to the thread that it should stop. No forcing.
    def stop(self, method):
        for state, handler, thread in self.threads:
            if method == handler:
                state.stopping = True

    # Force the thread to stop -- if it doesn't kill after a set amount of time.
    def abort(self, method, killAfter=0.5):
        for state, handler, thread in self.threads:
            if handler == method:
                state.stopping = True
                killTime = time.time() + killAfter
                while thread.is_alive():
                    time.sleep(0.2)
                    if time.time() < killTime:
                        thread.terminate()

        self.threads = [x for x in self.threads if x[1] != method]

    # Stop the thread immediately
    def terminate(self):
        pass

    # === EVENTS ===
    def _removeFromEventLoop(self, id_or_eventName):
        self.events = [
            x for x in self.events if (x[0] != id_or_eventName and x[2] != id_or_eventName)
        ]

    def on(self, what, event, handler, asynchronous=False):
        bridge = self

        def run():
            evts = what.addEventListener(event)
            for evt in evts:
                if asynchronous:
                    bridge._newTaskThread(handler, evt)
                else:
                    handler(evt)
            return True, False

        def end():
            if asynchronous:
                self.stop(handler)
            else:
                what.removeEventListener(event)

        identifier = hash(what) + hash(event) + hash(handler)
        self.events.append([identifier, what, event, run, end])

    def off(self, what, eventName, handler=None):
        identifier = hash(what) + hash(eventName) + hash(handler)
        for _identifier, _what, _event, _run, _end in self.events:
            if what == _what and eventName == _event:
                # No handler specified, remove all that match what & evt name
                if not handler or identifier == _identifier:
                    _end()  # remove just those that match signature
        # filter out the array
        if handler:
            self._removeFromEventLoop(identifier)
        else:
            self.events = [x for x in self.events if (x[1] != what and x[2] != eventName)]

    # == IO ==

    # `queue_request` pushes this event onto the Payload
    def queue_request(self, request_id, payload, timeout=None):
        self.outbound.append(payload)
        lock = threading.Event()
        self.requests[request_id] = [lock, timeout]
        return lock

    # === LOOP ===
    def loop(self):
        while self.active:
            # Send the next outbound request batch
            connection.writeAll(self.outbound)
            self.outbound = []

            # Run all of the event handler checks
            removes = []
            for identifier, what, event, run, end in self.events:
                ok, remove = run()
                if remove:
                    removes.append(identifier)
            for remove in removes:
                end()
                self.removeFromEventLoop(remove)

            # Iterate over the open threads and check if any have been killed, if so
            # remove them from self.threads
            self.threads = [x for x in self.threads if x[2].is_alive()]

            inbounds = connection.readAll()
            for inbound in inbounds:
                r = inbound["r"]
                if r in self.requests:
                    lock, timeout = self.requests[r]
                    self.responses[r] = inbound
                    del self.requests[r]
                    lock.set()  # release, allow calling thread to resume

            time.sleep(self.sleepSeconds)
