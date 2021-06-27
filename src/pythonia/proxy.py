import time, threading
import json_patch
debug = lambda *a: a
# debug = print

# This is the Executor, something that sits in the middle of the Bridge and is the interface for
# Python to JavaScript. This is also used by the bridge to call Python from Node.js.
class Executor:
    def __init__(self, loop):
        self.loop = loop
        self.queue = loop.queue_request
        self.i = 0

    def ipc(self, action, ffid, attr, args=None):
        # if action == "free":  # GC
        #     # print('ML',config,is_main_loop_active)
        #     if not is_main_loop_active or not is_main_loop_active():
        #         return {"val": True}  # Event loop is dead, no need for GC
        self.i += 1
        r = self.i  # unique request ts, acts as ID for response
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
        if action == "make":
            l = self.queue(r, {"r": r, "action": "make", "ffid": ffid})
        if action == "free":  # return JSON.stringify(obj[prop])
            try: # Event loop is dead, no need for GC
                l = self.queue(r, {"r": r, "action": "free", "ffid": ffid})
            except ValueError:
                return {"val": True}

        # Listen for a response
        while True:
            # print("READDDDIN")
            j = self.loop.read()
            # print(j)
            if j['r'] == r: # if this is a message for us, OK, return to Python calle
                break
            else: # The JS API we called wants to call a Python API... so let the loop handle it.
                self.loop.onMessage(j['r'], j['action'], j['ffid'], j['key'], j['val'])
        return j

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

    def on(self, object, event, handler):
        this = self
        self.i += 1
        pollingId = self.i
        # print("Event Listener", what, event, handler)

        def handleCallback(data):
            ffid = data["val"]
            if not ffid:
                # no paramater shortcut
                handler()
            else:
                args = Proxy(this, ffid)
                e = []
                for arg in args:
                    e.append(arg)
                handler(*e)
            return False

        self.loop.add_listener(pollingId, handleCallback, object, event, handler)
        # print("Added Listener", pollingId)
        return pollingId

    def off(self, what, event, handler=None):
        return self.loop.remove_listener(what, event, handler)

    def new_ffid(self, for_object):
        self.loop.cur_ffid += 1
        self.loop.m[self.loop.cur_ffid] = for_object
        resp = self.ipc("make", self.loop.cur_ffid, "")
        return self.loop.cur_ffid

INTERNAL_VARS = ["ffid", "_ix", "_exe", "_pffid", "_pname"]

# "Proxy" classes get individually instanciated for every thread and JS object
# that exists. It interacts with an Executor to communicate.
class Proxy(object):
    def __init__(self, exe, ffid, prop_ffid=None, prop_name=''):
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
            # print("ret fn", method)
            return Proxy(self._exe, val, self.ffid, method)
        if methodType == "class":
            # print("ret cls", method)
            return instantiatable
        if methodType == "obj":
            return Proxy(self._exe, val)
        if methodType == "inst":
            return Proxy(self._exe, val)
        if methodType == "void":
            return None
        else:
            return val

    def __call__(self, *args):
        # print("Call", args)
        nargs = []
        for arg in args:
            if (not hasattr(arg, 'ffid')) and callable(arg):
                ffid = self._exe.new_ffid(arg)
                setattr(arg, 'ffid', ffid)
                nargs.append({ 'ffid': ffid })
            elif hasattr(arg, 'ffid'):
                nargs.append({ 'ffid': arg.ffid })
            else:
                # print('nc', arg)
                nargs.append(arg)
        mT, v = self._exe.callProp(self._pffid, self._pname, nargs)
        if mT == "fn":
            return Proxy(self._exe, v)
        # print('Callres', self.ffid, args, mT, v)
        return self._call(self._pname, mT, v)

    def __getattr__(self, attr):
        # Special handling for new keyword for ES5 classes
        if attr == "new":
            return self._call(attr if self._pffid == self.ffid else '', "class", self._pffid)
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
            raise Exception("Sorry, all JS objects are immutable right now")

    def __str__(self):
        return self._exe.inspect(self.ffid)

    def __repr__(self):
        return self._exe.inspect(self.ffid)

    def __json__(self):
        # important ref
        return {"ffid": self.ffid}

    def __del__(self):
        self._exe.free(self.ffid)
