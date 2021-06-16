# Must run with "DEBUG=true python3 test.py"
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


def onIncrement(num, obj):
    print("Increment", num, obj.a.y)
    if num == 7:
        off(demo, "increment", onIncrement)


on(demo, "increment", onIncrement)
demo.increment()


# This should throw for now :
# demo.x = 3
# print(demo)
