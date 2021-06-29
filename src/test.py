import os
if 'DEBUG' not in os.environ:
    os.environ["DEBUG"] = "1"
import time
from JSPyBridge import require, console, on, off, DemoClass

chalk, fs = require("chalk"), require("fs")

console.log("Hello", chalk.red("world!"))
fs.writeFileSync("HelloWorld.txt", "hi!")

demo = DemoClass("blue", {"a": 3})
demo2 = DemoClass("blue", {"a": 3})

console.log(demo.other(demo2), demo.array(), demo.array()["0"])

for i in demo.array():
    print("i", i)


def onIncrement(self, num, obj):
    print("Increment", num, obj.a.y)
    if num == 7:
        off(demo, "increment", onIncrement)


def some_method(*args):
    print("Callback called with", args)


on(demo, "increment", onIncrement)
demo.increment()

demo.callback(some_method)


def handler(this, fn, num, obj):
    print("Handler caled", fn, num, obj)
    if num == 7:
        this.off("increment", handler)


demo.on("increment", handler)

try:
    demo.error()
    print("Failed to error")
    exit(1)
except Exception as e:
    print("OK, captured error")

exit(0)
# This should throw for now :
# demo.x = 3
# print(demo)
