import threading, subprocess, json, time, signal
import atexit, os, sys
from . import config
from .config import debug


def supports_color():
    """
    Returns True if the running system's terminal supports color, and False
    otherwise.
    """
    plat = sys.platform
    supported_platform = plat != "Pocket PC" and (plat == "win32" or "ANSICON" in os.environ)
    # isatty is not always implemented, #6223.
    is_a_tty = hasattr(sys.stdout, "isatty") and sys.stdout.isatty()
    return supported_platform and is_a_tty


if supports_color():
    os.environ["FORCE_COLOR"] = "1"
else:
    os.environ["FORCE_COLOR"] = "0"

# Currently this uses process standard input & standard error pipes
# to communicate with JS, but this can be turned to a socket later on
# ^^ Looks like custom FDs don't work on Windows, so let's keep using STDIO.

dn = os.path.dirname(__file__)

proc = None


def read_stderr(stderrs):
    ret = []
    for stderr in stderrs:
        inp = stderr.decode("utf-8")
        for line in inp.split("\n"):
            if not len(line):
                continue
            if not line.startswith("{"):
                print("[JSE]", line)
                continue
            try:
                d = json.loads(line)
                debug("[js -> py]", int(time.time() * 1000), line)
                ret.append(d)
            except ValueError as e:
                print("[JSE]", line)
    return ret


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
            kill_proc()
            break


stderr_lines = []

# Reads from the socket, in this case it's standard error. Returns an array
# of responses from the server.
def readAll():
    ret = read_stderr(stderr_lines)
    stderr_lines.clear()
    return ret


def com_io():
    global proc
    try:
        proc = subprocess.Popen(
            ["node", dn + "/js/bridge.js"],
            stdin=subprocess.PIPE,
            stdout=sys.stdout,
            stderr=subprocess.PIPE,
        )
    except Exception as e:
        print(
            "--====--\t--====--\n\nBridge failed to spawn JS process!\n\nDo you have Node.js 15 or newer installed? Get it at https://nodejs.org/\n\n--====--\t--====--"
        )
        raise e

    for send in sendQ:
        proc.stdin.write(send)
    proc.stdin.flush()

    while proc.poll() == None:
        stderr_lines.append(proc.stderr.readline())
        config.event_loop.queue.put("stdin")


com_thread = threading.Thread(target=com_io, args=(), daemon=True)
com_thread.start()


def kill_proc():
    if proc:
        try:
            proc.terminate()
        except Exception:
            pass


def is_alive():
    return proc.poll() is None


# Make sure out child process is killed if the parent one is exiting
atexit.register(kill_proc)
