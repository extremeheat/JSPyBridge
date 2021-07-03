import util
import inspect, importlib
import json, types, traceback
from proxy import Executor, Proxy
from weakref import WeakValueDictionary

def python(method):
    return importlib.import_module(method, package=None)


def fileImport(moduleName, absolutePath):
    spec = importlib.util.spec_from_file_location(moduleName, absolutePath)
    foo = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(foo)
    return foo

class Bridge:
    m = {
        0: {"python": python, "open": open, "fileImport": fileImport, "eval": eval, "setattr": setattr, "getattr": getattr}
    }
    # Things added to this dict are auto GC'ed
    weakmap = WeakValueDictionary()
    cur_ffid = 0

    def __init__(self, ipc):
        self.ipc = ipc
        self.q = lambda r, key, val, sig="": self.ipc.queue(
            {"r": r, "key": key, "val": val, "sig": sig}
        )
        self.executor = Executor(self)

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

    def call(self, r, ffid, keys, args, kwargs, invoke=True):
        v = self.m[ffid]
        if invoke:
            for key in keys:
                t = getattr(v, str(key), None)
                if t is None:
                    v = v[key]  # 🚨 If you get an error here, you called an undefined property
                else:
                    v = t
        else:
            for key in keys:
                if (type(v) in (dict, tuple, list)):
                    v = v[key]
                elif hasattr(v, str(key)):
                    v = getattr(v, str(key))
                else:
                    v = v[key] # 🚨 If you get an error here, you called an undefined property

        # Classes when called will return void, but we need to return
        # object to JS.
        was_class = False
        if invoke:
            if inspect.isclass(v):
                was_class = True
            v = v(*args, **kwargs)
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
        o = self.call(r, ffid, keys, [], {}, invoke=False)
        return o

    def Set(self, r, ffid, keys, args):
        v = self.m[ffid]
        on, val = args
        for key in keys:
            if (type(v) in (dict, tuple, list)):
                v = v[key]
            elif hasattr(v, str(key)):
                v = getattr(v, str(key))
            else:
                v = v[key] # 🚨 If you get an error here, you called an undefined property
        if (type(v) in (dict, tuple, list, set)):
            v[on] = val
        else:
            setattr(v, on, val)
        self.q(r, "void", self.cur_ffid)

    def inspect(self, r, ffid, keys, args):
        v = self.m[ffid]
        for key in keys:
            # print("ke, v", key, v)
            v = getattr(v, key, None) or v[key]
        s = util.make_signature(v)
        self.q(r, "", s)

    def free(self, r, ffid, key, args):
        # print("Free", ffid, key, args)
        if ffid not in self.m:
            # OK, we already GC'ed
            self.q(r, "", True)
            return
        del self.m[ffid]
        self.q(r, "", True)

    def make(self, r, ffid, key, args):
        self.cur_ffid += 1
        p = Proxy(self.executor, self.cur_ffid)
        # We need to put into both WeakMap and map to prevent immedate GC
        self.weakmap[self.cur_ffid] = p
        self.m[self.cur_ffid] = p
        self.ipc.queue({"r": r, "val": self.cur_ffid})

    def queue_request(self, request_id, payload, timeout=None):
        payload["c"] = "jsi"
        self.ipc.queue(payload)

    def queue_request_raw(self, request_id, payload, timeout=None):
        self.ipc.queue(payload)

    def read(self):
        data = self.ipc.readline()
        if not data:
            exit()
        j = json.loads(data)
        return j

    def pcall(self, r, ffid, key, args, set_attr=False):
        created = {}
        # Convert special JSON objects to Python methods
        def process(json_input, lookup_key):
            if isinstance(json_input, dict):
                for k, v in json_input.items():
                    if isinstance(v, dict) and (lookup_key in v):
                        lookup = v[lookup_key]
                        if lookup == '':
                            self.cur_ffid += 1
                            self.m[self.cur_ffid] = Proxy(self.executor, self.cur_ffid)
                            json_input[k] = self.m[self.cur_ffid]
                            created[v['r']] = self.cur_ffid
                        else:
                            json_input[k] = self.m[lookup]
                    else:
                        process(v, lookup_key)
            elif isinstance(json_input, list):
                for k, v in enumerate(json_input):
                    if isinstance(v, dict) and (lookup_key in v):
                        lookup = v[lookup_key]
                        if lookup == '':
                            self.cur_ffid += 1
                            p = Proxy(self.executor, self.cur_ffid)
                            self.m[self.cur_ffid] = p
                            json_input[k] = self.m[self.cur_ffid]
                            created[v['r']] = self.cur_ffid
                        else:
                            json_input[k] = self.m[lookup]
                    else:
                        process(v, lookup_key)
        process(args, 'ffid')
        pargs, kwargs = args
        self.q(r, "pre", created)
        if set_attr:
            self.Set(r, ffid, key, pargs)
        else:
            self.call(r, ffid, key, pargs, kwargs or {})

    def setval(self, r, ffid, key, args):
        return self.pcall(r, ffid, key, args, set_attr=True)

    def onMessage(self, r, action, ffid, key, args):
        # print("Calling....", action,ffid, key, nargs, kwargs)
        try:
            return getattr(self, action)(r, ffid, key, args)
        except Exception:
            self.q(r, "error", '', traceback.format_exc())
            pass




# com_io()
# ws_io()
# com_thread = threading.Thread(target=ws_io, args=(), daemon=False)



# com_thread.start()
