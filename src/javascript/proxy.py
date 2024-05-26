import time, threading, json, sys, os, traceback
from . import config, json_patch
from .errors import JavaScriptError

debug = config.debug

# This is the Executor, something that sits in the middle of the Bridge and is the interface for
# Python to JavaScript. This is also used by the bridge to call Python from Node.js.
class Executor:
    def __init__(self, loop):
        self.loop = loop
        loop.pyi.executor = self
        self.queue = loop.queue_request
        self.i = 0
        self.bridge = self.loop.pyi

    def ipc(self, action, ffid, attr, args=None):
        # NOTE The actions here translate to function calls in bridge.js
        self.i += 1
        r = self.i  # unique request ts, acts as ID for response
        l = None  # the lock
        if action == "get":  # return obj[prop]
            l = self.queue(r, {"r": r, "action": "get", "ffid": ffid, "key": attr})
        elif action == "init":  # return new obj[prop]
            l = self.queue(r, {"r": r, "action": "init", "ffid": ffid, "key": attr, "args": args})
        elif action == "inspect":  # return require('util').inspect(obj[prop])
            l = self.queue(r, {"r": r, "action": "inspect", "ffid": ffid, "key": attr})
        elif action == "serialize":  # return JSON.stringify(obj[prop])
            l = self.queue(r, {"r": r, "action": "serialize", "ffid": ffid})
        elif action == "blob":
            l = self.queue(r, {"r": r, "action": "blob", "ffid": ffid})
        elif action == "set":
            l = self.queue(r, {"r": r, "action": "set", "ffid": ffid, "key": attr, "args": args})
        elif action == "keys":
            l = self.queue(r, {"r": r, "action": "keys", "ffid": ffid})
        else:
            assert False, f"Unhandled action '{action}'"

        if not l.wait(10):
            if not config.event_thread:
                print(config.dead)
            print("Timed out", action, ffid, attr, repr(config.event_thread))
            raise Exception(f"Timed out accessing '{attr}'")
        res, barrier = self.loop.responses[r]
        del self.loop.responses[r]
        barrier.wait()
        if "error" in res:
            raise JavaScriptError(attr, res["error"])
        return res

    # forceRefs=True means that the non-primitives in the second parameter will not be recursively
    # parsed for references. It's specifcally for eval_js.
    def pcall(self, ffid, action, attr, args, *, timeout=1000, forceRefs=False):
        """
        This function does a two-part call to JavaScript. First, a preliminary request is made to JS
        with the function ID, attribute and arguments that Python would like to call. For each of the
        non-primitive objects in the arguments, in the preliminary request we "request" an FFID from JS
        which is the authoritative side for FFIDs. Only it may assign them; we must request them. Once
        JS recieves the pcall, it searches the arguments and assigns FFIDs for everything, then returns
        the IDs in a response. We use these IDs to store the non-primitive values into our ref map.
        On the JS side, it creates Proxy classes for each of the requests in the pcall, once they get
        destroyed, a free call is sent to Python where the ref is removed from our ref map to allow for
        normal GC by Python. Finally, on the JS side it executes the function call without waiting for
        Python. A init/set operation on a JS object also uses pcall as the semantics are the same.
        """
        wanted = {}
        self.ctr = 0
        callRespId, ffidRespId = self.i + 1, self.i + 2
        self.i += 2
        self.expectReply = False
        # p=1 means we expect a reply back, not used at the meoment, but
        # in the future as an optimization we could skip the wait if not needed
        packet = {"r": callRespId, "action": action, "ffid": ffid, "key": attr, "args": args}

        def ser(arg):
            if hasattr(arg, "ffid"):
                self.ctr += 1
                return {"ffid": arg.ffid}
            else:
                # Anything we don't know how to serialize -- exotic or not -- treat it as an object
                self.ctr += 1
                self.expectReply = True
                wanted[self.ctr] = arg
                return {"r": self.ctr, "ffid": ""}

        if forceRefs:
            _block, _locals = args
            packet["args"] = [args[0], {}]
            flocals = packet["args"][1]
            for k in _locals:
                v = _locals[k]
                if (
                    (type(v) is int)
                    or (type(v) is float)
                    or (v is None)
                    or (v is True)
                    or (v is False)
                ):
                    flocals[k] = v
                else:
                    flocals[k] = ser(v)
            packet["p"] = self.ctr
            payload = json.dumps(packet)
        else:
            payload = json.dumps(packet, default=ser)
            # a bit of a perf hack, but we need to add in the counter after we've already serialized ...
            payload = payload[:-1] + f',"p":{self.ctr}}}'

        l = self.loop.queue_request(callRespId, payload)
        # We only have to wait for a FFID assignment response if
        # we actually sent any non-primitives, otherwise skip
        if self.expectReply:
            l2 = self.loop.await_response(ffidRespId)
            if not l2.wait(timeout):
                raise Exception("Execution timed out")
            pre, barrier = self.loop.responses[ffidRespId]
            del self.loop.responses[ffidRespId]

            if "error" in pre:
                raise JavaScriptError(attr, res["error"])

            for requestId in pre["val"]:
                ffid = pre["val"][requestId]
                self.bridge.m[ffid] = wanted[int(requestId)]
                # This logic just for Event Emitters
                try:
                    if hasattr(self.bridge.m[ffid], "__call__"):
                        setattr(self.bridge.m[ffid], "iffid", ffid)
                except Exception:
                    pass

            barrier.wait()

        if not l.wait(timeout):
            if not config.event_thread:
                print(config.dead)
            raise Exception(
                f"Call to '{attr}' timed out. Increase the timeout by setting the `timeout` keyword argument."
            )
        res, barrier = self.loop.responses[callRespId]
        del self.loop.responses[callRespId]

        barrier.wait()

        if "error" in res:
            raise JavaScriptError(attr, res["error"])
        return res["key"], res["val"]

    def getProp(self, ffid, method):
        resp = self.ipc("get", ffid, method)
        return resp["key"], resp["val"]

    def setProp(self, ffid, method, val):
        self.pcall(ffid, "set", method, [val])
        return True

    def callProp(self, ffid, method, args, *, timeout=None, forceRefs=False):
        resp = self.pcall(ffid, "call", method, args, timeout=timeout, forceRefs=forceRefs)
        return resp

    def initProp(self, ffid, method, args):
        resp = self.pcall(ffid, "init", method, args)
        return resp

    def inspect(self, ffid, mode):
        resp = self.ipc("inspect", ffid, mode)
        return resp["val"]

    def keys(self, ffid):
        return self.ipc("keys", ffid, "")["keys"]

    def free(self, ffid):
        self.loop.freeable.append(ffid)

    def get(self, ffid):
        return self.bridge.m[ffid]


INTERNAL_VARS = ["ffid", "_ix", "_exe", "_pffid", "_pname", "_Is_class", "_Resolved", "_Keys"]

# "Proxy" classes get individually instanciated for every thread and JS object
# that exists. It interacts with an Executor to communicate.
class Proxy(object):
    def __init__(self, exe, ffid, prop_ffid=None, prop_name="", is_class=False):
        self.ffid = ffid
        self._exe = exe
        self._ix = 0
        #
        self._pffid = prop_ffid if (prop_ffid != None) else ffid
        self._pname = prop_name
        self._Is_class = is_class
        self._Resolved = {}
        self._Keys = None

    def _call(self, method, methodType, val):
        this = self

        debug("MT", method, methodType, val)
        if methodType == "fn":
            return Proxy(self._exe, val, self.ffid, method)
        if methodType == "class":
            return Proxy(self._exe, val, is_class=True)
        if methodType == "obj":
            return Proxy(self._exe, val)
        if methodType == "inst":
            return Proxy(self._exe, val)
        if methodType == "void":
            return None
        if methodType == "py":
            return self._exe.get(val)
        else:
            return val

    def __call__(self, *args, timeout=10, forceRefs=False):
        mT, v = (
            self._exe.initProp(self._pffid, self._pname, args)
            if self._Is_class
            else self._exe.callProp(
                self._pffid, self._pname, args, timeout=timeout, forceRefs=forceRefs
            )
        )
        if mT == "fn":
            return Proxy(self._exe, v)
        return self._call(self._pname, mT, v)

    def __getattr__(self, attr):
        # Special handling for new keyword for ES5 classes
        if attr == "new":
            return Proxy(self._exe, self.ffid, self._pffid, self._pname, True)
        methodType, val = self._exe.getProp(self._pffid, attr)
        return self._call(attr, methodType, val)

    def __getitem__(self, attr):
        methodType, val = self._exe.getProp(self.ffid, attr)
        return self._call(attr, methodType, val)

    def __iter__(self):
        self._ix = 0
        if self.length == None:
            self._Keys = self._exe.keys(self.ffid)
        return self

    def __next__(self):
        if self._Keys:
            if self._ix < len(self._Keys):
                result = self._Keys[self._ix]
                self._ix += 1
                return result
            else:
                raise StopIteration
        elif self._ix < self.length:
            result = self[self._ix]
            self._ix += 1
            return result
        else:
            raise StopIteration

    def __setattr__(self, name, value):
        if name in INTERNAL_VARS:
            object.__setattr__(self, name, value)
        else:
            return self._exe.setProp(self.ffid, name, value)

    def __setitem__(self, name, value):
        return self._exe.setProp(self.ffid, name, value)

    def __contains__(self, key):
        return True if self[key] is not None else False

    def valueOf(self):
        ser = self._exe.ipc("serialize", self.ffid, "")
        return ser["val"]
    
    def blobValueOf(self):
        blob = self._exe.ipc("blob", self.ffid, "")
        return blob["blob"]
    
    def __str__(self):
        return self._exe.inspect(self.ffid, "str")

    def __repr__(self):
        return self._exe.inspect(self.ffid, "repr")

    def __json__(self):
        return {"ffid": self.ffid}

    def __del__(self):
        self._exe.free(self.ffid)
