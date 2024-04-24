from Bridge import Bridge
import sys, os, socket, json

apiin = apiout = None


class Ipc:
    def queue(self, what):
        global apiout
        try:
            if type(what) == str:
                apiout.write(what + "\n")
            else:
                apiout.write(json.dumps(what) + "\n")
            apiout.flush()
        except Exception:
            if not sys.is_finalizing():
                # Quit if we are unable to write (is the parent process dead?)
                try:
                    sys.exit(1)
                except Exception:
                    pass


ipc = Ipc()
bridge = Bridge(ipc)

# The communication stuffs
# This is the communication thread which allows us to send and
# recieve different messages at the same time.
def com_io():
    global apiin, apiout
    if sys.platform == "win32" or ("NODE_CHANNEL_FD" not in os.environ):
        apiin = sys.stdin
        apiout = sys.stderr
    else:
        fd = int(os.environ["NODE_CHANNEL_FD"])
        api = socket.fromfd(fd, socket.AF_UNIX, socket.SOCK_STREAM)
        apiin = api.makefile("r", encoding="utf-8")
        apiout = api.makefile("w", encoding="utf-8")
    ipc.readline = apiin.readline
    while True:
        data = apiin.readline()
        if not data:
            break
        if data[0] != "{":
            continue
        j = json.loads(data)
        bridge.onMessage(j["r"], j["action"], j["ffid"], j["key"], j["val"])


# import cProfile
# cProfile.run('com_io()', sort='time')
com_io()
