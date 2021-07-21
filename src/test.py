import os
import time
from javascript import require, console, On, Once, off, once, eval_js

DemoClass = require("./javascript/js/test.js").DemoClass

chalk, fs = require("chalk"), require("fs")

console.log("Hello", chalk.red("world!"))
fs.writeFileSync("HelloWorld.txt", "hi!")

demo = DemoClass("blue", {"a": 3}, lambda v: print("Should be 3", v))
demo2 = DemoClass.new("blue", {"a": 3}, lambda v: print("Should be 3", v))

print(demo.ok()(1, 2, 3))
print(demo.ok().x)
print(demo.toString())
print("Hello ", DemoClass.hello())

console.log(demo.other(demo2), demo.array(), demo.array()["0"])


for i in demo.array():
    print("i", i)


def some_method(*args):
    print("Callback called with", args)


demo.callback(some_method)


@On(demo, "increment")
def handler(this, fn, num, obj):
    print("Handler caled", fn, num, obj)
    if num == 7:
        off(demo, "increment", handler)


@Once(demo, "increment")
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

print("Array", demo.arr.valueOf())

demo.wait()
once(demo, "done")

demo.x = 3

pythonArray = []
pythonObject = {"var": 3}

# fmt: off
print(eval_js('''
    for (let i = 0; i < 10; i++) {
        await pythonArray.append(i);
        pythonObject[i] = i;
    }
    console.log('Demo', demo)
    const fn = await demo.moreComplex()
    console.log('wrapped fn', await fn()); // Should be 3
    pythonObject.var = 5;
    return 2
'''))
# fmt: on

print("My var", pythonObject)

print("OK, we can now exit")
