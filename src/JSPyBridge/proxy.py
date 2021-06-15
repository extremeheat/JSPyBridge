import time
from . import config, json_patch

# debug = print
debug = lambda *x: x


class Executor:
    def __init__(self, loop):
        self.loop = loop
        self.queue = loop.queue_request

    def ipc(self, action, ffid, attr, args=None):
        r = int(time.time() * 1000)  # unique request ts, acts as ID for response
        # print("Ip", action, ffid, r)
        l = None  # the lock
        if action == "get":  # return obj[prop]
            l = self.queue(r, {"r": r, "action": "get", "ffid": ffid, "key": attr})
        if action == "init":  # return new obj[prop]
            l = self.queue(
                r, {"r": r, "action": "init", "ffid": ffid, "key": attr, "args": args}
            )
        if action == "call":  # return await obj[prop]
            l = self.queue(
                r, {"r": r, "action": "call", "ffid": ffid, "key": attr, "args": args}
            )
        if action == "inspect":  # return require('util').inspect(obj[prop])
            l = self.queue(r, {"r": r, "action": "inspect", "ffid": ffid})
        if action == "serialize":  # return JSON.stringify(obj[prop])
            l = self.queue(r, {"r": r, "action": "serialize", "ffid": ffid})
        if action == "free":  # return JSON.stringify(obj[prop])
            l = self.queue(r, {"r": r, "action": "free", "ffid": ffid})

        # debug("Waiting...", action, ffid, attr)
        # print("LOCK",)
        if not l.wait(10):
            raise Exception("Server timed out!")
        # print("R", self.loop.responses)
        res = self.loop.responses[r]
        del self.loop.responses[r]
        debug("Waited...")
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


INTERNAL_VARS = ["id", "exe"]

# "Proxy" classes get individually instanciated for every thread and JS object
# that exists. It interacts with an Executor to communicate.
class Proxy(object):
    def __init__(self, exe, ffid):
        self.id = ffid
        self.exe = exe

    def _call(self, method, methodType, val):
        def fn(*args):
            debug("FN", self.id, method, args)
            mT, v = self.exe.callProp(self.id, method, args)
            debug(mT, v)
            # bleh, functions inside functions cause inf recursion
            # can we avoid from JS? --done, with { call } wrapper
            if mT == "fn":
                raise Error("Generator functions are not supported right now")
            return self._call(method, mT, v)

        def instantiatable(*args):
            # debug("IA",args, json.dumps(args))
            mT, v = self.exe.initProp(self.id, method, args)
            # when we call "new" keyword we always get object back
            return self._call(self.id, mT, v)

        debug("MT", method, methodType, val)
        if methodType == "fn":
            return fn
        if methodType == "class":
            return instantiatable
        if methodType == "obj":
            return Proxy(self.exe, val)
        if methodType == "void":
            return None
        else:
            return val

    def __getattr__(self, attr):
        debug("Get ==", self.id, attr)
        methodType, val = self.exe.getProp(self.id, attr)
        return self._call(attr, methodType, val)

    def __setattr__(self, name, value):
        # print("set", name, value)
        if name in INTERNAL_VARS:
            object.__setattr__(self, name, value)
        else:
            raise Exception("Sorry, all JS objects are immutable right now")

    def __str__(self):
        return self.exe.inspect(self.id)
        # return self.__class__.__name__

    def __json__(self):
        # important ref
        debug("&&&&DICT CALLED")
        return {"ffid": self.id}

    # def __del__(self):
    #     free(self.id)
