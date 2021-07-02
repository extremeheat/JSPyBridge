import os
if 'DEBUG' not in os.environ:
    os.environ["DEBUG"] = "1"
import time
from JSPyBridge import require, console, On, Once, off, DemoClass

chalk, fs = require("chalk"), require("fs")

console.log("Hello", chalk.red("world!"))
fs.writeFileSync("HelloWorld.txt", "hi!")

demo = DemoClass("blue", {"a": 3})
demo2 = DemoClass("blue", {"a": 3})

console.log(demo.other(demo2), demo.array(), demo.array()["0"])

for i in demo.array():
    print("i", i)


def some_method(*args):
    print("Callback called with", args)

demo.callback(some_method)

@On(demo, 'increment')
def handler(this, fn, num, obj):
    print("Handler caled", fn, num, obj)
    if num == 7:
        off(demo, "increment", handler)

@Once(demo, 'increment')
def onceIncrement(this, *args):
    print("Hey, I'm only called once !")

demo.increment()

demo.arr[1] = 5
demo.obj[1] = 5
demo.obj[2] = some_method
print("Demo array and object", demo.arr, demo.obj)

try:
    demo.error()
    print("Failed to error")
    exit(1)
except Exception as e:
    print("OK, captured error")

time.sleep(0.1)
# This should throw for now :
# demo.x = 3
# print(demo)
