# This file contains all the exposed modules
from . import config, proxy, events
import threading, time

# __builtins__.JsBridgeConfig = { 'modules': { 'mineflayer': 'latest' } }
# print("Hello world!")

# require('mineflayer@^3')

# "npm i -g jspybridge"


def init():
    config.event_loop = events.EventLoop()
    config.event_thread = threading.Thread(
        target=config.event_loop.loop, args=(), daemon=True
    )
    config.event_thread.start()
    # print("Event loop started", config.event_loop, config.event_thread)

    exe = proxy.Executor(config.event_loop)
    config.global_jsi = proxy.Proxy(exe, 0)


init()


def require(name):
    return config.global_jsi.require(name)


console = config.global_jsi.console
MyDemoClass = config.global_jsi.MyDemoClass
