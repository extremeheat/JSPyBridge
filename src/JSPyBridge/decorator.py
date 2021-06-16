import time
from . import config


def AsyncTask(fn):
    fn.is_async_task = True
    return config.event_loop.startThread(fn)
