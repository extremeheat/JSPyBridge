import time, threading, json
from .config import debug, is_main_loop_active
from . import config, json_patch

class JavaScriptError(Exception):
    pass

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
        if action == "free":  # GC
            # print('ML',config,is_main_loop_active)
            if not is_main_loop_active or not is_main_loop_active():
                return {"val": True}  # Event loop is dead, no need for GC
        self.i += 1
        r = self.i  # unique request ts, acts as ID for response
        l = None  # the lock
        if action == "get":  # return obj[prop]
            l = self.queue(r, {"r": r, "action": "get", "ffid": ffid, "key": attr})
        if action == "init":  # return new obj[prop]
            l = self.queue(r, {"r": r, "action": "init", "ffid": ffid, "key": attr, "args": args})
        if action == "inspect":  # return require('util').inspect(obj[prop])
            l = self.queue(r, {"r": r, "action": "inspect", "ffid": ffid})
        if action == "serialize":  # return JSON.stringify(obj[prop])
            l = self.queue(r, {"r": r, "action": "serialize", "ffid": ffid})
        if action == "free":  # return JSON.stringify(obj[prop])
            l = self.queue(r, {"r": r, "action": "free", "ffid": ffid})
        if action == "make":
            l = self.queue(r, {"r": r, "action": "make", "ffid": ffid})
        if action == 'set':
            l = self.queue(r, {"r": r, "action": "set", "ffid": ffid, "key": attr, "args": args})

        if not l.wait(10):
            print("Timed out", action, ffid, attr)
            raise Exception("Execution timed out")
        res = self.loop.responses[r]
        del self.loop.responses[r]
        if 'error' in res:
            raise JavaScriptError(f"Access to '{attr}' failed:\n{res['error']}\n")
        return res

    def pcall(self, ffid, action, attr, args, timeout=10):
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
        self.i += 1
        pi = self.i
        expectReply = 1 if len(args) else 0
        # p=1 means we expect a reply back, not used at the meoment, but
        # in the future as an optimization we could skip the wait if not needed
        packet = {"r": self.i, "p": 1, "action": action, "ffid": ffid, "key": attr, "args": args}
        
        def ser(arg):
            if hasattr(arg, "ffid"):
                return { "ffid": arg.ffid }
            else:
                # Anything we don't know how to serialize -- exotic or not -- treat it as an object
                self.ctr += 1
                wanted[self.ctr] = arg
                return {"r": self.ctr, "ffid": ""}

        payload = json.dumps(packet, default=ser)

        self.i += 1
        fi = self.i
        l2 = self.loop.await_response(fi)
        l = self.loop.queue_request(pi, payload)

        if not l.wait(timeout):
            raise Exception("Execution timed out")
        
        pre = self.loop.responses[pi]
        del self.loop.responses[pi]
    
        if 'error' in pre:
            raise JavaScriptError(f"Call to '{attr}' failed:\n{pre['error']}\n")

        for requestId in pre["val"]:
            ffid = pre["val"][requestId]
            self.bridge.m[ffid] = wanted[int(requestId)]
            setattr(self.bridge.m[ffid], 'iffid', ffid)

        if not l2.wait(timeout):
            raise Exception(f"Call to '{attr}' timed out")

        res = self.loop.responses[fi]
        del self.loop.responses[fi]
        if 'error' in res:
            raise JavaScriptError(f"Call to '{attr}' failed:\n{res['error']}\n")
        return res['key'], res['val']

    def getProp(self, ffid, method):
        resp = self.ipc("get", ffid, method)
        return resp["key"], resp["val"]

    def setProp(self, ffid, method, val):
        self.pcall(ffid, 'set', method, [val])
        return True

    def callProp(self, ffid, method, args, timeout=None):
        resp = self.pcall(ffid, "call", method, args, timeout)
        return resp

    def initProp(self, ffid, method, args):
        resp = self.pcall(ffid, "init", method, args)
        return resp

    def inspect(self, ffid):
        resp = self.ipc("inspect", ffid, "")
        return resp["val"]

    def free(self, ffid):
        resp = self.ipc("free", ffid, "")
        return resp["val"]

    def new_ffid(self, what):
        r = self.ipc("make", "", "")
        ffid = r["val"]
        self.bridge.m[ffid] = what
        return ffid

    def get(self, ffid):
        return self.bridge.m[ffid]


INTERNAL_VARS = ["ffid", "_ix", "_exe", "_pffid", "_pname"]

# "Proxy" classes get individually instanciated for every thread and JS object
# that exists. It interacts with an Executor to communicate.
class Proxy(object):
    def __init__(self, exe, ffid, prop_ffid=None, prop_name=""):
        self.ffid = ffid
        self._exe = exe
        self._ix = 0
        #
        self._pffid = prop_ffid if (prop_ffid != None) else ffid
        self._pname = prop_name

    def _call(self, method, methodType, val):
        this = self

        def instantiatable(*args):
            mT, v = self._exe.initProp(self.ffid, method, args)
            # when we call "new" keyword we always get object back
            return self._call(self.ffid, mT, v)

        debug("MT", method, methodType, val)
        if methodType == "fn":
            return Proxy(self._exe, val, self.ffid, method)
        if methodType == "class":
            return instantiatable
        if methodType == "obj":
            return Proxy(self._exe, val)
        if methodType == "inst":
            return Proxy(self._exe, val)
        if methodType == "void":
            return None
        if methodType == 'py':
            return self._exe.get(val)
        else:
            return val

    def __call__(self, *args, timeout=10):
        mT, v = self._exe.callProp(self._pffid, self._pname, args, timeout)
        if mT == "fn":
            return Proxy(self._exe, v)
        return self._call(self._pname, mT, v)

    def __getattr__(self, attr):
        # Special handling for new keyword for ES5 classes
        if attr == "new":
            return self._call(attr if self._pffid == self.ffid else "", "class", self._pffid)
        methodType, val = self._exe.getProp(self._pffid, attr)
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
            return self._exe.setProp(self.ffid, name, value)

    def __setitem__(self, name, value):
            return self._exe.setProp(self.ffid, name, value)

    def __str__(self):
        return self._exe.inspect(self.ffid)

    def __repr__(self):
        return self._exe.inspect(self.ffid)

    def __json__(self):
        return {"ffid": self.ffid}

    def __del__(self):
        self._exe.free(self.ffid)
