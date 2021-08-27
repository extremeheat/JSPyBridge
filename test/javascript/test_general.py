from javascript import require, console, On, Once, off, once, eval_js

def assertEquals(cond, val): assert cond == val

def test_require():
    chalk = require("chalk")
    fs = require("fs")
    print("Hello", chalk.red("world!"))
    test = require("./test.js")


def test_classes():
    global demo
    DemoClass = require("./test.js").DemoClass
    demo = DemoClass("blue", {"a": 3}, lambda v: assertEquals(v, 3))
    # New psuedo operator
    demo2 = DemoClass.new("blue", {"a": 3}, lambda v: assertEquals(v, 3))

    assert demo.ok()(1, 2, 3) == 6
    assert demo.toString() == '123!'
    assert demo.ok().x == 'wow'
    assert DemoClass.hello() == 'world'

def test_iter():
    DemoClass = require("./test.js").DemoClass
    demo = DemoClass("blue", {"a": 3}, lambda v: print("Should be 3", v))

    f = None
    for i in demo.array():
        print("i", i)
        f = i
    assert f.a == 3

    expect = ['x', 'y', 'z']
    for key in demo.object():
        assert key == expect.pop(0)

def some_method(text):
    print("Callback called with", text)
    assert text == 'It works !'

def test_callback():
    demo.callback(some_method)

def test_events():
    @On(demo, "increment")
    def handler(this, fn, num, obj):
        print("Handler caled", fn, num, obj)
        if num == 7:
            off(demo, "increment", handler)

    @Once(demo, "increment")
    def onceIncrement(this, *args):
        print("Hey, I'm only called once !")


    demo.increment()

def test_arrays():
    demo.arr[1] = 5
    demo.obj[1] = 5
    demo.obj[2] = some_method
    print("Demo array and object", demo.arr, demo.obj)


def test_errors():
    try:
        demo.error()
        print("Failed to error")
        exit(1)
    except Exception as e:
        print("OK, captured error")

def test_valueOf():
    a = demo.arr.valueOf()
    print("A", a)
    assert a[0] == 1
    assert a[1] == 5
    assert a[2] == 3
    print("Array", demo.arr.valueOf())

def test_once():
    demo.wait()
    once(demo, "done")

def test_assignment():
    demo.x = 3

def test_eval():
    DemoClass = require("./test.js").DemoClass
    demo = DemoClass("blue", {"a": 3}, lambda v: print("Should be 3", v))
    pythonArray = []
    pythonObject = {"var": 3}

    # fmt: off
    print(eval_js('''
        for (let i = 0; i < 10; i++) {
            await pythonArray.append(i);
            pythonObject[i] = i;
        }
        pythonObject.var = 5;
        const fn = await demo.moreComplex()
        console.log('wrapped fn', await fn()); // Should be 3
        return 2
    '''))
    # fmt: on

    print("My var", pythonObject)

def test_bigint():
    bigInt = eval_js('100000n')
    print(bigInt)

test_require()
test_classes()
test_iter()
test_callback()
test_events()
test_arrays()
test_errors()
test_valueOf()
test_once()
test_assignment()
test_eval()
test_bigint()