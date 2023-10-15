import threading, subprocess, json, time, signal
import atexit, os, sys
from . import config
from .config import debug

# Special handling for IPython jupyter notebooks
stdout = sys.stdout
notebook = False
NODE_BIN = os.environ.get('NODE_BIN') or (getattr(os.environ, "NODE_BIN") if hasattr(os.environ, "NODE_BIN") else "node")


def is_notebook():
    try:
        from IPython import get_ipython
    except Exception:
        return False
    if "COLAB_GPU" in os.environ:
        return True

    shell = get_ipython().__class__.__name__
    if shell == "ZMQInteractiveShell":
        return True


# Modified stdout
modified_stdout = (sys.stdout != sys.__stdout__) or (getattr(sys, 'ps1', sys.flags.interactive) == '>>> ')

if is_notebook() or modified_stdout:
    notebook = True
    stdout = subprocess.PIPE


def supports_color():
    """
    Returns True if the running system's terminal supports color, and False
    otherwise.
    """
    plat = sys.platform
    supported_platform = plat != "Pocket PC" and (plat == "win32" or "ANSICON" in os.environ)
    # isatty is not always implemented, #6223.
    is_a_tty = hasattr(sys.stdout, "isatty") and sys.stdout.isatty()
    if 'idlelib.run' in sys.modules:
        return False
    if notebook and not modified_stdout:
        return True
    return supported_platform and is_a_tty


if supports_color():
    os.environ["FORCE_COLOR"] = "1"
else:
    os.environ["FORCE_COLOR"] = "0"

# Currently this uses process standard input & standard error pipes
# to communicate with JS, but this can be turned to a socket later on
# ^^ Looks like custom FDs don't work on Windows, so let's keep using STDIO.

dn = os.path.dirname(__file__)
proc = com_thread = stdout_thread = None


def readCommItem(comm):
    
    line = comm.readline()
    if not line:
        return
    
    # blobs may contain any value, including b"\n", so we track len and fetch possible remaining data
    if line.startswith(b"blob!"):
        _, d, blob = line.split(b"!", maxsplit=2)
        d = json.loads(d.decode("utf-8"))
        req_len = d.pop("len")
        fetch_len = req_len - len(blob) + 1
        if fetch_len > 0:
            blob += comm.read(fetch_len)
        d["blob"] = blob[:req_len]
        return d
    
    line = line.decode("utf-8")
    if not line.startswith('{"r"'):
        print("[JSE]", line)
        return
    try:
        d = json.loads(line)
        debug("[js -> py]", int(time.time() * 1000), line)
        return d
    except ValueError as e:
        print("[JSE]", line)


sendQ = []

# Write a message to a remote socket, in this case it's standard input
# but it could be a websocket (slower) or other generic pipe.
def writeAll(objs):
    for obj in objs:
        if type(obj) == str:
            j = obj + "\n"
        else:
            j = json.dumps(obj) + "\n"
        debug("[py -> js]", int(time.time() * 1000), j)
        if not proc:
            sendQ.append(j.encode())
            continue
        try:
            proc.stdin.write(j.encode())
            proc.stdin.flush()
        except Exception:
            stop()
            break


comm_items = []

# Reads from the socket, in this case it's standard error. Returns an array
# of parsed responses from the server.
def readAll():
    global comm_items
    capture = comm_items
    comm_items = []
    return capture


def com_io():
    global proc, stdout_thread
    try:
        if os.name == 'nt' and 'idlelib.run' in sys.modules:
            proc = subprocess.Popen(
                [NODE_BIN, dn + "/js/bridge.js"],
                stdin=subprocess.PIPE,
                stdout=stdout,
                stderr=subprocess.PIPE,
                creationflags = subprocess.CREATE_NO_WINDOW
            )
        else:
            proc = subprocess.Popen(
                [NODE_BIN, dn + "/js/bridge.js"],
                stdin=subprocess.PIPE,
                stdout=stdout,
                stderr=subprocess.PIPE
            )

    except Exception as e:
        print(
            "--====--\t--====--\n\nBridge failed to spawn JS process!\n\nDo you have Node.js 16 or newer installed? Get it at https://nodejs.org/\n\n--====--\t--====--"
        )
        stop()
        raise e

    for send in sendQ:
        proc.stdin.write(send)
    proc.stdin.flush()
    
    # FIXME untested
    if notebook:
        stdout_thread = threading.Thread(target=stdout_read, args=(), daemon=True)
        stdout_thread.start()

    while proc.poll() is None:
        item = readCommItem(proc.stderr)
        if item:
            comm_items.append(item)
            if config.event_loop != None:
                config.event_loop.queue.put("stdin")
    stop()


# FIXME untested
def stdout_read():
    while proc.poll() is None:
        os.write(sys.stdout.fileno(), proc.stdout.readline())


def start():
    global com_thread
    com_thread = threading.Thread(target=com_io, args=(), daemon=True)
    com_thread.start()


def stop():
    try:
        proc.terminate()
    except Exception:
        pass
    config.event_loop = None
    config.event_thread = None
    config.executor = None
    # The "root" interface to JavaScript with FFID 0
    class Null:
        def __getattr__(self, *args, **kwargs):
            raise Exception(
                "The JavaScript process has crashed. Please restart the runtime to access JS APIs."
            )

    config.global_jsi = Null()
    # Currently this breaks GC
    config.fast_mode = False


def is_alive():
    return proc.poll() is None


# Make sure our child process is killed if the parent one is exiting
atexit.register(stop)
