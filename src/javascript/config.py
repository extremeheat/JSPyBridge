import os

event_loop = None
event_thread = None
executor = None
# The "root" interface to JavaScript with FFID 0
global_jsi = None
# Currently this breaks GC
fast_mode = False
# Whether we need patches for legacy node versions
node_emitter_patches = False


if ("DEBUG" in os.environ) and ("jspybridge" in os.getenv("DEBUG")):
    debug = print
else:
    debug = lambda *a: a


def is_main_loop_active():
    if not event_thread or event_loop:
        return False
    return event_thread.is_alive() and event_loop.active


dead = "\n** The Node process has crashed. Please restart the runtime to use JS APIs. **\n"
