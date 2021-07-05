# WebSocket Interface for Python access
from Bridge import Bridge
from queue import Queue
import threading, json
import asyncio
import websockets

loop = asyncio.get_event_loop()
sendQ = asyncio.Queue()


class WsCom:
    recvQ = Queue()
    sendQ = Queue()
    socket = None

    def readline(self):
        return self.recvQ.get()

    # Submit a job to asyncio to send since we're in another thread
    def queue(self, what):
        # print("SENDING", what)
        if type(what) == str:
            w = what
        else:
            w = json.dumps(what)
        asyncio.run_coroutine_threadsafe(sendQ.put(w), loop)

    # asyncio wants to put a message into our read queue
    def put(self, what):
        # print("PUT INTO Q", what)
        self.recvQ.put(what)


ipc = WsCom()
bridge = Bridge(ipc)


def ws_io():
    global ipc

    async def consumer_handler(websocket, path):
        async for message in websocket:
            print("<-", message)
            ipc.recvQ.put(message)

    async def producer_handler(websocket, path):
        return True
        while True:
            message = await ipc.sendQ.get()
            # print("SENDING", message)
            await websocket.send(message)
            await asyncio.sleep(1)

    async def handler(ws, path):
        print("new conn!")
        while True:
            listener_task = asyncio.ensure_future(ws.recv())
            producer_task = asyncio.ensure_future(sendQ.get())

            done, pending = await asyncio.wait(
                [listener_task, producer_task], return_when=asyncio.FIRST_COMPLETED
            )
            for task in pending:
                task.cancel()

            if listener_task in done:
                message = listener_task.result()
                ipc.put(message)

            if producer_task in done:
                message = producer_task.result()
                await ws.send(message)

    start_server = websockets.serve(handler, "localhost", 8768)
    loop.run_until_complete(start_server)
    loop.run_forever()


def com_io():
    while True:
        data = ipc.readline()
        if not data:
            break
        j = json.loads(data)
        bridge.onMessage(j["r"], j["action"], j["ffid"], j["key"], j["val"])


com_thread = threading.Thread(target=com_io, args=(), daemon=True)
com_thread.start()
ws_io()
