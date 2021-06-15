import time
from .config import debug, is_main_loop_active
from . import json_patch


class Executor:
    def __init__(self, loop):
        self.loop = loop
        self.queue = loop.queue_request

    def ipc(self, action, ffid, attr, args=None):
        if action == "free":  # GC
            if not is_main_loop_active():
                return {"val": True}  # Event loop is dead, no need for GC

        r = int(time.time() * 1000)  # unique request ts, acts as ID for response
        l = None  # the lock
        if action == "get":  # return obj[prop]
            l = self.queue(r, {"r": r, "action": "get", "ffid": ffid, "key": attr})
        if action == "init":  # return new obj[prop]
            l = self.queue(r, {"r": r, "action": "init", "ffid": ffid, "key": attr, "args": args})
        if action == "call":  # return await obj[prop]
            l = self.queue(r, {"r": r, "action": "call", "ffid": ffid, "key": attr, "args": args})
        if action == "inspect":  # return require('util').inspect(obj[prop])
            l = self.queue(r, {"r": r, "action": "inspect", "ffid": ffid})
        if action == "serialize":  # return JSON.stringify(obj[prop])
            l = self.queue(r, {"r": r, "action": "serialize", "ffid": ffid})
        if action == "free":  # return JSON.stringify(obj[prop])
            l = self.queue(r, {"r": r, "action": "free", "ffid": ffid})

        if not l.wait(10):
            raise Exception("Execution timed out")
        res = self.loop.responses[r]
        del self.loop.responses[r]
        return res

    def getProp(self, ffid, method):
        resp = self.ipc("get", ffid, method)
        return resp["key"], resp["val"]

    def callProp(self, ffid, method, args):
        resp = self.ipc("call", ffid, method, args)
        return resp["key"], resp["val"]

    def initProp(self, ffid, method, args):
        resp = self.ipc("init", ffid, method, args)
        return resp["key"], resp["val"]

    def inspect(self, ffid):
        resp = self.ipc("inspect", ffid, "")
        return resp["val"]

    def free(self, ffid):
        resp = self.ipc("free", ffid, "")
        return resp["val"]


INTERNAL_VARS = ["ffid", "_ix", "_exe"]

# "Proxy" classes get individually instanciated for every thread and JS object
# that exists. It interacts with an Executor to communicate.
class Proxy(object):
    def __init__(self, exe, ffid):
        self.ffid = ffid
        self._exe = exe
        self._ix = 0

    def _call(self, method, methodType, val):
        def fn(*args):
            mT, v = self._exe.callProp(self.ffid, method, args)
            # bleh, functions inside functions cause inf recursion
            # can we avoid from JS? --done, with { call } wrapper
            if mT == "fn":
                raise Error("Generator functions are not supported right now")
            return self._call(method, mT, v)

        def instantiatable(*args):
            mT, v = self._exe.initProp(self.ffid, method, args)
            # when we call "new" keyword we always get object back
            return self._call(self.ffid, mT, v)

        debug("MT", method, methodType, val)
        if methodType == "fn":
            return fn
        if methodType == "class":
            return instantiatable
        if methodType == "obj":
            return Proxy(self._exe, val)
        if methodType == "void":
            return None
        else:
            return val

    def __getattr__(self, attr):
        methodType, val = self._exe.getProp(self.ffid, attr)
        return self._call(attr, methodType, val)

    def __getitem__(self, attr):
        methodType, val = self._exe.getProp(self.ffid, attr)
        return self._call(attr, methodType, val)

    def __iter__(self):
        self._ix = 0
        return self

    def __next__(self):
        if self._ix < self.length:
            result = self[self._ix]
            self._ix += 1
            return result
        else:
            raise StopIteration

    def __setattr__(self, name, value):
        if name in INTERNAL_VARS:
            object.__setattr__(self, name, value)
        else:
            raise Exception("Sorry, all JS objects are immutable right now")

    def __str__(self):
        return self._exe.inspect(self.ffid)

    def __json__(self):
        # important ref
        return {"ffid": self.ffid}

    def __del__(self):
        self._exe.free(self.ffid)