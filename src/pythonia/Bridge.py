# from . 
import util
import inspect, importlib
import sys, json
import fileinput


def python(method):
    return importlib.import_module(method, package=None)

class DemoClass:
    """Some doc"""
    def __init__(self, var):
        self.var = var

    def get(self, update):
        return self.var + update

    def nested(self):
        def some():
            return 3
        return some

def add(demoClas1, demoClas2):
    # print("dc", demoClas1, demoClas2)
    return demoClas1.var + demoClas2.var

class Bridge:
    m = {
        0: {
            'python': python,
            'demo': DemoClass,
            'add': add
        }
    }
    cur_ffid = 0

    def __init__(self, ipc):
        self.ipc = ipc
        self.q = lambda r, key, val, sig=None: self.ipc.queue({ 'r': r, 'key': key, 'val': val, 'sig': sig })

    def assign_ffid(self, what):
        self.cur_ffid += 1
        self.m[self.cur_ffid] = what
        return self.cur_ffid

    def length(self, r, ffid, key, args):
        l = len(self.m[ffid])
        self.q(r, ffid, '', l)
        
    def init(self, r, ffid, key, args):
        v = self.m[ffid](*args)
        ffid = self.assign_ffid(v)
        self.q(r, 'inst', ffid)

    def call(self, r, ffid, keys, args, invoke=True):
        v = self.m[ffid]
        for key in keys:
            v = getattr(v, key, None) or v[key] # 🚨 If you get an error here, you called an undefined property
        # Classes when called will return void, but we need to return
        # object to JS.
        was_class = False
        if invoke:
            if inspect.isclass(v):
                was_class = True
            v = v(*args)
        typ = type(v)
        # print("typ", typ, inspect.isclass(v), inspect.ismodule(v))
        if typ is str:
            self.q(r, 'string', v)
            return
        if typ is int or typ is float or typ is complex:
            self.q(r, 'int', v)
            return
        if inspect.isclass(v):
            # We need to increment FFID 
            self.q(r, 'class', self.assign_ffid(v), util.make_signature(v))
            return
        if callable(v): # anything with __call__
            self.q(r, 'fn', self.assign_ffid(v), util.make_signature(v))
            return
        if (typ is dict) or (inspect.ismodule(v)) or was_class: # "object" in JS speak
            self.q(r, 'obj', self.assign_ffid(v), util.make_signature(v))
            return
        if typ is list:
            self.q(r, 'list', self.assign_ffid(v), util.make_signature(v))
            return
        self.q(r, 'void', self.cur_ffid)

    # Same as call just without invoking anything, and args
    # would be null
    def get(self, r, ffid, keys, args):
        return self.call(r, ffid, keys, [], invoke=False)

    def inspect(self, r, ffid, keys, args):
        v = self.m[ffid]
        for key in keys:
            print("ke, v", key, v)
            v = getattr(v, key, None) or v[key]
        s = util.make_signature(v)
        self.q(r, '', s)
    def free(self, r, ffid, key, args):
        print("Free", ffid, key, args)
        del self.m[ffid]
        self.q(r, '', True)

    def onMessage(self, r, action, ffid, key, args):
        nargs = []
        if args:
            for arg in args:
                print("-ARG", arg)
                if isinstance(arg, dict) and ('ffid' in arg):
                    nargs.append(self.m[arg['ffid']])
                else:
                    nargs.append(arg)
        print("Calling", action, nargs)
        return getattr(self, action)(r, ffid, key, nargs)

class Ipc:
    def queue(self, what):
        print("Sending", what['val'])
        sys.stderr.write(json.dumps(what) + '\n')

ipc = Ipc()
bridge = Bridge(ipc)
# # bridge.onMessage({ 'r': 1, 'action': 'call', 'ffid': 0, 'args': 'urllib2' })
# # bridge.onMessage(1, 'call', 0, ['python'], ['math'])
# # bridge.onMessage(2, 'call', 1, ['floor'], [3.13])
# # bridge.onMessage(1, 'call', 0, ['demo'], [3])
# # bridge.onMessage(2, 'call', 0, ['demo'], [2])
# # bridge.onMessage(3, 'call', 0, ['add'], [{'ffid':1},{'ffid':2}])
# # bridge.onMessage(2, 'get', 1, ['get'], [])
# print(bridge.m)
# # bridge.onMessage(2, 'free', 2, [], [])
# print(bridge.m)
# # bridge.onMessage(2, 'call', 2, [], [2])
# # bridge.onMessage(2, 'inspect', 0, ['demo'], [2])
# # bridge.onMessage(2, 'get', 1, ['get'], [3.13])
# # bridge.onMessage(2, 'call', 1, ['get'], [3.13])
# print("X")
for line in fileinput.input():
    try:
        j = json.loads(line)
    except Exception:
        continue
    print("Json", j, "l", line)
    bridge.onMessage(j['r'], j['action'], j['ffid'], j['key'], j['val'])
    pass