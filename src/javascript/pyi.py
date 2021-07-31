# THe Python Interface for JavaScript

import inspect, importlib, traceback
import os, sys, json, types
import socket
from .proxy import Proxy
from .errors import JavaScriptError, getErrorMessage
from weakref import WeakValueDictionary


def python(method):
    return importlib.import_module(method, package=None)


def fileImport(moduleName, absolutePath, folderPath):
    if folderPath not in sys.path:
        sys.path.append(folderPath)
    spec = importlib.util.spec_from_file_location(moduleName, absolutePath)
    foo = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(foo)
    return foo


class Iterate:
    def __init__(self, v):
        self.what = v

        # If we have a normal iterator, we need to make it a generator
        if inspect.isgeneratorfunction(v):
            it = self.next_gen()
        elif hasattr(v, "__iter__"):
            it = self.next_iter()

        def next_iter():
            try:
                return next(it)
            except Exception:
                return "$$STOPITER"

        self.Next = next_iter

    def next_iter(self):
        for entry in self.what:
            yield entry
        return

    def next_gen(self):
        yield self.what()


fix_key = lambda key: key.replace("~~", "") if type(key) is str else key


class PyInterface:
    m = {0: {"python": python, "fileImport": fileImport, "Iterate": Iterate}}
    # Things added to this dict are auto GC'ed
    weakmap = WeakValueDictionary()
    cur_ffid = 10000

    def __init__(self, ipc, exe):
        self.ipc = ipc
        # This toggles if we want to send inspect data for console logging. It's auto
        # disabled when a for loop is active; use `repr` to request logging instead.
        self.m[0]["sendInspect"] = lambda x: setattr(self, "send_inspect", x)
        self.send_inspect = True
        self.q = lambda r, key, val, sig="": self.ipc.queue_payload(
            {"c": "pyi", "r": r, "key": key, "val": val, "sig": sig}
        )
        self.executor = exe

    def assign_ffid(self, what):
        self.cur_ffid += 1
        self.m[self.cur_ffid] = what
        return self.cur_ffid

    def length(self, r, ffid, keys, args):
        v = self.m[ffid]
        for key in keys:
            if type(v) in (dict, tuple, list):
                v = v[key]
            elif hasattr(v, str(key)):
                v = getattr(v, str(key))
            elif hasattr(v, "__getitem__"):
                try:
                    v = v[key]
                except:
                    raise LookupError(f"Property '{fix_key(key)}' does not exist on {repr(v)}")
            else:
                raise LookupError(f"Property '{fix_key(key)}' does not exist on {repr(v)}")
        l = len(v)
        self.q(r, "num", l)

    def init(self, r, ffid, key, args):
        v = self.m[ffid](*args)
        ffid = self.assign_ffid(v)
        self.q(r, "inst", ffid)

    def call(self, r, ffid, keys, args, kwargs, invoke=True):
        v = self.m[ffid]
        # Subtle differences here depending on if we want to call or get a property.
        # Since in Python, items ([]) and attributes (.) function differently,
        # when calling first we want to try . then []
        # For example with the .append function we don't want ['append'] taking
        # precedence in a dict. However if we're only getting objects, we can
        # first try bracket for dicts, then attributes.
        if invoke:
            for key in keys:
                t = getattr(v, str(key), None)
                if t:
                    v = t
                elif hasattr(v, "__getitem__"):
                    try:
                        v = v[key]
                    except:
                        raise LookupError(f"Property '{fix_key(key)}' does not exist on {repr(v)}")
                else:
                    raise LookupError(f"Property '{fix_key(key)}' does not exist on {repr(v)}")
        else:
            for key in keys:
                if type(v) in (dict, tuple, list):
                    v = v[key]
                elif hasattr(v, str(key)):
                    v = getattr(v, str(key))
                elif hasattr(v, "__getitem__"):
                    try:
                        v = v[key]
                    except:
                        raise LookupError(f"Property '{fix_key(key)}' does not exist on {repr(v)}")
                else:
                    raise LookupError(f"Property '{fix_key(key)}' does not exist on {repr(v)}")

        # Classes when called will return void, but we need to return
        # object to JS.
        was_class = False
        if invoke:
            if inspect.isclass(v):
                was_class = True
            v = v(*args, **kwargs)
        typ = type(v)
        if typ is str:
            self.q(r, "string", v)
            return
        if typ is int or typ is float or (v is None) or (v is True) or (v is False):
            self.q(r, "int", v)
            return
        if inspect.isclass(v) or isinstance(v, type):
            # We need to increment FFID
            self.q(r, "class", self.assign_ffid(v), self.make_signature(v))
            return
        if callable(v):  # anything with __call__
            self.q(r, "fn", self.assign_ffid(v), self.make_signature(v))
            return
        if (typ is dict) or (inspect.ismodule(v)) or was_class:  # "object" in JS speak
            self.q(r, "obj", self.assign_ffid(v), self.make_signature(v))
            return
        if typ is list:
            self.q(r, "list", self.assign_ffid(v), self.make_signature(v))
            return
        if hasattr(v, "__class__"):  # numpy generator can't be picked up without this
            self.q(r, "class", self.assign_ffid(v), self.make_signature(v))
            return
        self.q(r, "void", self.cur_ffid)

    # Same as call just without invoking anything, and args
    # would be null
    def get(self, r, ffid, keys, args):
        o = self.call(r, ffid, keys, [], {}, invoke=False)
        return o

    def Set(self, r, ffid, keys, args):
        v = self.m[ffid]
        on, val = args
        for key in keys:
            if type(v) in (dict, tuple, list):
                v = v[key]
            elif hasattr(v, str(key)):
                v = getattr(v, str(key))
            else:
                try:
                    v = v[key]
                except:
                    raise LookupError(f"Property '{fix_key(key)}' does not exist on {repr(v)}")
        if type(v) in (dict, tuple, list, set):
            v[on] = val
        else:
            setattr(v, on, val)
        self.q(r, "void", self.cur_ffid)

    def inspect(self, r, ffid, keys, args):
        v = self.m[ffid]
        for key in keys:
            v = getattr(v, key, None) or v[key]
        s = repr(v)
        self.q(r, "", s)

    # no ACK needed
    def free(self, r, ffid, key, args):
        for i in args:
            if i not in self.m:
                continue
            del self.m[i]

    def make_signature(self, what):
        if self.send_inspect:
            return repr(what)
        return ""

    def read(self):
        data = apiin.readline()
        if not data:
            exit()
        j = json.loads(data)
        return j

    def pcall(self, r, ffid, key, args, set_attr=False):
        # Convert special JSON objects to Python methods
        def process(json_input, lookup_key):
            if isinstance(json_input, dict):
                for k, v in json_input.items():
                    if isinstance(v, dict) and (lookup_key in v):
                        ffid = v[lookup_key]
                        json_input[k] = Proxy(self.executor, ffid)
                    else:
                        process(v, lookup_key)
            elif isinstance(json_input, list):
                for k, v in enumerate(json_input):
                    if isinstance(v, dict) and (lookup_key in v):
                        ffid = v[lookup_key]
                        json_input[k] = Proxy(self.executor, ffid)
                    else:
                        process(v, lookup_key)

        process(args, "ffid")
        pargs, kwargs = args
        if set_attr:
            self.Set(r, ffid, key, pargs)
        else:
            self.call(r, ffid, key, pargs, kwargs or {})

    def setval(self, r, ffid, key, args):
        return self.pcall(r, ffid, key, args, set_attr=True)

    # This returns a primitive version (JSON-serialized) of the object
    # including arrays and dictionary/object maps, unlike what the .get
    # and .call methods do where they only return numeric/strings as
    # primitive values and everything else is an object refrence.
    def value(self, r, ffid, keys, args):
        v = self.m[ffid]

        for key in keys:
            t = getattr(v, str(key), None)
            if t is None:
                v = v[key]  # 🚨 If you get an error here, you called an undefined property
            else:
                v = t

        # TODO: do we realy want to worry about functions/classes here?
        # we're only supposed to send primitives, probably best to ignore
        # everything else.
        # payload = json.dumps(v, default=lambda arg: None)
        self.q(r, "ser", v)

    def onMessage(self, r, action, ffid, key, args):
        try:
            return getattr(self, action)(r, ffid, key, args)
        except Exception:
            self.q(r, "error", "", traceback.format_exc())
            pass

    def inbound(self, j):
        return self.onMessage(j["r"], j["action"], j["ffid"], j["key"], j["val"])
