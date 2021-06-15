import time, threading, json, sys
from . import connection, config
from queue import Queue


class TaskState:
    def __init__(self):
        self.stopping = False

    def wait(self, ms):
        stopTime = time.time() + (ms / 1000)
        # print('stopTime', stopTime)
        while time.time() < stopTime and not self.stopping:
            time.sleep(0.2)
        if self.stopping:
            # print("we were cancelled!")
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
                # print("FOUND", state)
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
        # if type(i_or_handler) is int:
        #     del self.eventMap[i]
        #     return
        # else:
        #     for i in self.eventMap:
        #         v = self.eventMap[i]
        #         for eventName, eventHandler in v:
        #             if eventName == id_or_eventName:
        #                 del self.eventMap[i]
        #                 return

        self.events = [
            x
            for x in self.events
            if (x[0] != id_or_eventName and x[2] != id_or_eventName)
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
        # if hwhat not in eventMap:
        #     eventMap[hwhat] = {}
        # if hevent not in eventMap[hwhat]:
        #     eventMap[hwhat] = []
        # addToEventLoop(identifier, wrapper)
        self.events.append([identifier, what, event, run, end])

    def off(self, what, eventName, handler=None):
        identifier = hash(what) + hash(eventName) + hash(handler)
        for _identifier, _what, _event, _run, _end in self.events:
            if what == _what and eventName == _event:
                if (
                    not handler
                ):  # No handler specified, remove all that match what & evt name
                    _end()
                elif (
                    identifier == _identifier
                ):  # remove just those that match signature
                    _end()
        # filter out the array
        if handler:
            self._removeFromEventLoop(identifier)
        else:
            self.events = [
                x for x in self.events if (x[1] != what and x[2] != eventName)
            ]

    # == IO ==

    # `queue_request` pushes this event onto the Payload
    def queue_request(self, request_id, payload, timeout=None):
        self.outbound.append(payload)
        lock = threading.Event()
        self.requests[request_id] = [lock, timeout]
        return lock

    # === LOOP ===
    def loop(self):
        # print("LOOP STARTED", self.active)
        while self.active:
            # assert len(self.outbound) < 100
            # print(".", self.outbound)
            # Send the next outbound request batch
            connection.writeAll(self.outbound)
            self.outbound = []

            # print("2")

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

            # print("3")

            inbounds = connection.readAll()
            # print("4")
            for inbound in inbounds:
                r = inbound["r"]
                if r in self.requests:
                    lock, timeout = self.requests[r]
                    self.responses[r] = inbound
                    del self.requests[r]
                    # print("set", r, self.responses)
                    lock.set()  # release, allow calling thread to resume

            time.sleep(self.sleepSeconds)


# task = {
#     canceled: if the task was requested to be canceled. After the stop() timeout, this task is terminated
#     wait: wait for n seconds, alternative to time.sleep that can be canceled
#     once: once, alternative to JSPyBridge.once() that can be canceled
# }

# class Bot:
#     def addEventListener(self,name):
#         return []
#     def removeEventListener(self,name):
#         print("Event emitter was removed!", name)
#         return []
# bot = Bot()

# loop = EventLoop()

# def onSleep(args):
#     print("sleep called", args)

# loop.on(bot, 'sleep', onSleep)
# loop.off(bot, 'sleep', onSleep)

# def tas(task):
#     print("task", task)
#     task.wait(1000)
#     print("Done on our own")

# loop.start(tas)
# print("___STOPPING")
# loop.stop(tas)
# loop.loop()

# bridge.exit()
