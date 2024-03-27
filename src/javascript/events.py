import time, threading, json, sys
from . import connection, config, pyi
from queue import Queue
from weakref import WeakValueDictionary


class TaskState:
    def __init__(self):
        self.stopping = False
        self.sleep = self.wait

    def wait(self, sec):
        stopTime = time.time() + sec
        while time.time() < stopTime and not self.stopping:
            time.sleep(0.2)
        if self.stopping:
            sys.exit(1)


class EventExecutorThread(threading.Thread):

    def __init__(self):
        super().__init__()
        self.running = True
        self.jobs = Queue()
        self.doing = []
        self.daemon = True

    def add_job(self, request_id, cb_id, job, args):
        if request_id in self.doing:
            return  # We already are doing this
        self.doing.append(request_id)
        self.jobs.put([request_id, cb_id, job, args])

    def run(self):
        while self.running:
            request_id, cb_id, job, args = self.jobs.get()
            ok = job(args)
            if self.jobs.empty():
                self.doing = []


# The event loop here is shared across all threads. All of the IO between the
# JS and Python happens through this event loop. Because of Python's "Global Interperter Lock"
# only one thread can run Python at a time, so no race conditions to worry about.
class EventLoop:

    def __init__(self):
        connection.start()

        self.active = True
        self.freeable = []
        self.queue = Queue()

        # This contains a map of active callbacks that we're tracking.
        # As it's a WeakRef dict, we can add stuff here without blocking GC.
        # Once this list is empty (and a CB has been GC'ed) we can exit.
        # Looks like someone else had the same idea :)
        # https://stackoverflow.com/questions/21826700/using-python-weakset-to-enable-a-callback-functionality
        self.callbacks = WeakValueDictionary()

        # The threads created managed by this event loop.
        self.threads = []

        self.outbound = []

        # After a socket request is made, it's ID is pushed to self.requests. Then, after a response
        # is recieved it's removed from requests and put into responses, where it should be deleted
        # by the consumer.
        self.requests = {}  # Map of requestID -> threading.Lock
        self.responses = {}  # Map of requestID -> response payload

        self.callbackExecutor = EventExecutorThread()
        self.callbackExecutor.start()
        self.pyi = pyi.PyInterface(self, config.executor)

    def stop(self):
        connection.stop()

    # === THREADING ===
    def newTaskThread(self, handler, *args):
        state = TaskState()
        t = threading.Thread(target=handler, args=(state, *args), daemon=True)
        self.threads.append([state, handler, t])
        return t

    def startThread(self, method):
        for state, handler, thread in self.threads:
            if method == handler:
                thread.start()
                return
        t = self.newTaskThread(method)
        t.start()

    # Signal to the thread that it should stop. No forcing.
    def stopThread(self, method):
        for state, handler, thread in self.threads:
            if method == handler:
                state.stopping = True

    # Force the thread to stop -- if it doesn't kill after a set amount of time.
    def abortThread(self, method, killAfter=0.5):
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
    def terminateThread(self, method):
        for state, handler, thread in self.threads:
            if handler == method:
                thread.terminate()
        self.threads = [x for x in self.threads if x[1] != method]

    # == IO ==

    # `queue_request` pushes this event onto the Payload
    def queue_request(self, request_id, payload, timeout=None):
        self.outbound.append(payload)
        lock = threading.Event()
        self.requests[request_id] = [lock, timeout]
        self.queue.put("send")
        return lock

    def queue_payload(self, payload):
        self.outbound.append(payload)
        self.queue.put("send")

    def await_response(self, request_id, timeout=None):
        lock = threading.Event()
        self.requests[request_id] = [lock, timeout]
        self.queue.put("send")
        return lock

    def on_exit(self):
        if len(self.callbacks):
            config.debug("cannot exit because active callback", self.callbacks)
        while len(self.callbacks) and connection.is_alive():
            time.sleep(0.4)
        time.sleep(0.4)  # Allow final IO
        self.callbackExecutor.running = False
        self.queue.put("exit")

    # === LOOP ===
    def loop(self):
        while self.active:
            # Wait until we have jobs
            self.queue.get(block=True)
            # Empty the jobs & start running stuff !
            self.queue.empty()

            # Send the next outbound request batch
            connection.writeAll(self.outbound)
            self.outbound = []

            # Iterate over the open threads and check if any have been killed, if so
            # remove them from self.threads
            self.threads = [x for x in self.threads if x[2].is_alive()]

            if len(self.freeable) > 40:
                self.queue_payload({"r": 0, "action": "free", "ffid": "", "args": self.freeable})
                self.freeable = []

            # Read the inbound data and route it to correct handler
            inbounds = connection.readAll()
            for inbound in inbounds:
                r = inbound["r"]
                cbid = inbound["cb"] if "cb" in inbound else None
                if "c" in inbound and inbound["c"] == "pyi":
                    j = inbound
                    self.callbackExecutor.add_job(r, cbid, self.pyi.inbound, inbound)
                if r in self.requests:
                    lock, timeout = self.requests[r]
                    barrier = threading.Barrier(2, timeout=5)
                    self.responses[r] = inbound, barrier
                    del self.requests[r]
                    lock.set()  # release, allow calling thread to resume
                    barrier.wait()
