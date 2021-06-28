# THe Python Interface for JavaScript

from . import util
import inspect, importlib
import os, sys, json, types
import socket
from .proxy import Proxy
from weakref import WeakValueDictionary


class PyInterface:
    m = {0: {}}
    # Things added to this dict are auto GC'ed
    weakmap = WeakValueDictionary()
    cur_ffid = 0

    def __init__(self, ipc, exe):
        self.ipc = ipc
        self.q = lambda r, key, val, sig="": self.ipc.queue_payload(
            {"c": "pyi", "r": r, "key": key, "val": val, "sig": sig}
        )
        self.executor = exe

    def assign_ffid(self, what):
        self.cur_ffid += 1
        self.m[self.cur_ffid] = what
        return self.cur_ffid

    def length(self, r, ffid, key, args):
        l = len(self.m[ffid])
        self.q(r, "num", l)

    def init(self, r, ffid, key, args):
        v = self.m[ffid](*args)
        ffid = self.assign_ffid(v)
        self.q(r, "inst", ffid)

    def call(self, r, ffid, keys, args, invoke=True):
        v = self.m[ffid]
        # print("r=>", v, ffid, keys, args)
        for key in keys:
            # print("V", type(v), key)
            t = getattr(v, str(key), None)
            # print('v',v)
            if t is None:
                v = v[key]  # 🚨 If you get an error here, you called an undefined property
            else:
                v = t
        # Classes when called will return void, but we need to return
        # object to JS.
        was_class = False
        if invoke:
            if inspect.isclass(v):
                was_class = True
            v = v(*args)
        typ = type(v)
        # print("typ", v, typ, inspect.isclass(v), inspect.ismodule(v))
        if typ is str:
            self.q(r, "string", v)
            return
        if typ is int or typ is float or (v is None):
            self.q(r, "int", v)
            return
        if inspect.isclass(v) or isinstance(v, type):
            # We need to increment FFID
            self.q(r, "class", self.assign_ffid(v), util.make_signature(v))
            return
        if callable(v):  # anything with __call__
            self.q(r, "fn", self.assign_ffid(v), util.make_signature(v))
            return
        if (typ is dict) or (inspect.ismodule(v)) or was_class:  # "object" in JS speak
            self.q(r, "obj", self.assign_ffid(v), util.make_signature(v))
            return
        if typ is list:
            self.q(r, "list", self.assign_ffid(v), util.make_signature(v))
            return
        if hasattr(v, '__class__'):  # numpy generator for some reason can't be picked up...
            self.q(r, "class", self.assign_ffid(v), util.make_signature(v))
            return
        # print("VOID", v, '\n', type(v), isinstance(v, (type)), inspect.isgenerator(v), inspect.isgeneratorfunction(v), inspect.isclass(v),inspect.ismethod(v), inspect.isfunction(v))
        self.q(r, "void", self.cur_ffid)

    # Same as call just without invoking anything, and args
    # would be null
    def get(self, r, ffid, keys, args):
        o = self.call(r, ffid, keys, [], invoke=False)
        # print("Got", self, r, ffid, keys, args, o)
        return o

    def inspect(self, r, ffid, keys, args):
        v = self.m[ffid]
        for key in keys:
            # print("ke, v", key, v)
            v = getattr(v, key, None) or v[key]
        s = util.make_signature(v)
        self.q(r, "", s)

    def free(self, r, ffid, key, args):
        # print("Free", ffid, key, args)
        del self.m[ffid]
        self.q(r, "", True)

    def make(self, r, ffid, key, args):
        self.cur_ffid += 1
        p = Proxy(self.executor, self.cur_ffid)
        # We need to put into both WeakMap and map to prevent immedate GC
        self.weakmap[self.cur_ffid] = p
        self.m[self.cur_ffid] = p
        print("FFID ADDED", self.cur_ffid)
        self.ipc.queue_payload({"c": "pyi", "r": r, "val": self.cur_ffid})

    def read(self):
        data = apiin.readline()
        if not data:
            exit()
        j = json.loads(data)
        return j

    def onMessage(self, r, action, ffid, key, args):
        nargs = []
        if args:
            for arg in args:
                # print("-ARG", arg)
                if isinstance(arg, dict) and ("ffid" in arg):
                    f = arg["ffid"]
                    if f in self.weakmap:
                        nargs.append(self.weakmap[f])
                        del self.m[f]
                    else:
                        nargs.append(self.m[f])
                else:
                    nargs.append(arg)
                # print("\nj", args)
        # print("Calling....", action, r, ffid, key, nargs)
        return getattr(self, action)(r, ffid, key, nargs)

    def inbound(self, j):
        return self.onMessage(j["r"], j["action"], j["ffid"], j["key"], j["val"])
