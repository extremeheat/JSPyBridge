# Must run with "DEBUG=true python3 test.py"
from JSPyBridge import require, console, DemoClass

chalk, fs = require("chalk"), require("fs")

console.log("Hello", chalk.red("world!"))
fs.writeFileSync("HelloWorld.txt", "hi!")

demo = DemoClass("blue", {"a": 3})
demo2 = DemoClass("blue", {"a": 3})

console.log(demo.other(demo2), demo.array(), demo.array()['0'])

for i in demo.array():
    print("i",i)

# This should throw for now :
# demo.x = 3
# print(demo)
