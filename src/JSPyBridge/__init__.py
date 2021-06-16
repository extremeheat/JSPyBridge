# This file contains all the exposed modules
from . import config, proxy, events, decorator
import threading, time, atexit


def init():
    config.event_loop = events.EventLoop()
    config.event_thread = threading.Thread(target=config.event_loop.loop, args=(), daemon=True)
    config.event_thread.start()
    config.executor = proxy.Executor(config.event_loop)
    config.global_jsi = proxy.Proxy(config.executor, 0)
    atexit.register(config.event_loop.on_exit)


init()


def require(name):
    return config.global_jsi.require(name)


console = config.global_jsi.console
DemoClass = config.global_jsi.DemoClass
on = config.executor.on
off = config.executor.off
AsyncTask = decorator.AsyncTask
