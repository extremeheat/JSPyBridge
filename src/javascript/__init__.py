# This file contains all the exposed modules
from . import config, proxy, events
import threading, inspect, time, atexit, os, sys


def init():
    global console, globalThis, RegExp, start, stop, abort
    if config.event_loop:
        return  # Do not start event loop again
    config.event_loop = events.EventLoop()
    start = config.event_loop.startThread
    stop = config.event_loop.stopThread
    abort = config.event_loop.abortThread
    config.event_thread = threading.Thread(target=config.event_loop.loop, args=(), daemon=True)
    config.event_thread.start()
    config.executor = proxy.Executor(config.event_loop)
    config.global_jsi = proxy.Proxy(config.executor, 0)
    console = config.global_jsi.console  # TODO: Remove this in 1.0
    globalThis = config.global_jsi.globalThis
    RegExp = config.global_jsi.RegExp
    atexit.register(config.event_loop.on_exit)

    if config.global_jsi.needsNodePatches():
        config.node_emitter_patches = True


init()


def terminate():
    if config.event_loop:
        config.event_loop.stop()


def require(name, version=None):
    calling_dir = None
    if name.startswith("."):
        # Some code to extract the caller's file path, needed for relative imports
        try:
            namespace = sys._getframe(1).f_globals
            cwd = os.getcwd()
            rel_path = namespace["__file__"]
            abs_path = os.path.join(cwd, rel_path)
            calling_dir = os.path.dirname(abs_path)
        except Exception:
            # On Notebooks, the frame info above does not exist, so assume the CWD as caller
            calling_dir = os.getcwd()

    return config.global_jsi.require(name, version, calling_dir, timeout=900)


def eval_js(js):
    frame = inspect.currentframe()
    rv = None
    try:
        local_vars = {}
        for local in frame.f_back.f_locals:
            if not local.startswith("__"):
                local_vars[local] = frame.f_back.f_locals[local]
        rv = config.global_jsi.evaluateWithContext(js, local_vars, forceRefs=True)
    finally:
        del frame
    return rv


def AsyncTask(start=False):
    def decor(fn):
        fn.is_async_task = True
        t = config.event_loop.newTaskThread(fn)
        if start:
            t.start()

    return decor


# You must use this Once decorator for an EventEmitter in Node.js, otherwise
# you will not be able to off an emitter.
def On(emitter, event):
    # print("On", emitter, event,onEvent)
    def decor(_fn):
        # Once Colab updates to Node 16, we can remove this.
        # Here we need to manually add in the `this` argument for consistency in Node versions.
        # In JS we could normally just bind `this` but there is no bind in Python.
        if config.node_emitter_patches:

            def handler(*args, **kwargs):
                _fn(emitter, *args, **kwargs)

            fn = handler
        else:
            fn = _fn

        emitter.on(event, fn)
        # We need to do some special things here. Because each Python object
        # on the JS side is unique, EventEmitter is unable to equality check
        # when using .off. So instead we need to avoid the creation of a new
        # PyObject on the JS side. To do that, we need to persist the FFID for
        # this object. Since JS is the autoritative side, this FFID going out
        # of refrence on the JS side will cause it to be destoryed on the Python
        # side. Normally this would be an issue, however it's fine here.
        ffid = getattr(fn, "iffid")
        setattr(fn, "ffid", ffid)
        config.event_loop.callbacks[ffid] = fn
        return fn

    return decor


# The extra logic for this once function is basically just to prevent the program
# from exiting until the event is triggered at least once.
def Once(emitter, event):
    def decor(fn):
        i = hash(fn)

        def handler(*args, **kwargs):
            if config.node_emitter_patches:
                fn(emitter, *args, **kwargs)
            else:
                fn(*args, **kwargs)
            del config.event_loop.callbacks[i]

        emitter.once(event, handler)
        config.event_loop.callbacks[i] = handler

    return decor


def off(emitter, event, handler):
    emitter.off(event, handler)
    del config.event_loop.callbacks[getattr(handler, "ffid")]


def once(emitter, event):
    val = config.global_jsi.once(emitter, event, timeout=1000)
    return val
