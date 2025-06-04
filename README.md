# JSPyBridge
[![NPM version](https://img.shields.io/npm/v/pythonia.svg)](http://npmjs.com/package/pythonia)
[![PyPI](https://img.shields.io/pypi/v/javascript)](https://pypi.org/project/javascript/)
[![Build Status](https://github.com/extremeheat/JSPyBridge/actions/workflows/node.yml/badge.svg)](https://github.com/extremeheat/JSPyBridge/actions/workflows/)
[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/extremeheat/jspybridge)


Interoperate Node.js and Python. You can run Python from Node.js, *or* run Node.js from Python. **Work in progress.** 

Requires Node.js 18 and Python 3.8 or newer.

## Key Features

* Ability to call async and sync functions and get object properties with a native feel
* Built-in garbage collection
* Bidirectional callbacks with arbitrary arguments
* Iteration and exception handling support
* Object inspection allows you to easily `console.log` or `print()` any foreign objects
* (Bridge to call Python from JS) Python class extension and inheritance. [See pytorch and tensorflow examples](https://github.com/extremeheat/JSPyBridge/blob/master/examples/javascript/pytorch-train.js).
* (Bridge to call JS from Python) Native decorator-based event emitter support
* (Bridge to call JS from Python) First-class Jupyter Notebook/Google Colab support. See some Google Colab uses below.


## Basic usage example

See some examples [here](https://github.com/extremeheat/JSPyBridge/tree/master/examples). See [documentation](https://github.com/extremeheat/JSPyBridge#documentation) below and in [here](https://github.com/extremeheat/JSPyBridge/tree/master/docs).

### Access JavaScript from Python


```sh
pip install javascript
```


```py
from javascript import require, globalThis

chalk, fs = require("chalk"), require("fs")

print("Hello", chalk.red("world!"), "it's", globalThis.Date().toLocaleString())
fs.writeFileSync("HelloWorld.txt", "hi!")
```

### Access Python from JavaScript

Make sure to have the dependencies installed before hand!

```sh
npm i pythonia
```

```js
import { python } from 'pythonia'
// Import tkinter
const tk = await python('tkinter')
// All Python API access must be prefixed with await
const root = await tk.Tk()
// A function call with a $ suffix will treat the last argument as a kwarg dict
const a = await tk.Label$(root, { text: 'Hello World' })
await a.pack()
await root.mainloop()
python.exit() // Make sure to exit Python in the end to allow node to exit. You can also use process.exit.
```

### Examples
[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/extremeheat/jspybridge)

Check out some cool examples below! Try them on Gitpod! Click the Open in Gitpod link above, and then open the examples folder.


[![PyTorch](https://www.vectorlogo.zone/logos/pytorch/pytorch-ar21.svg)](https://github.com/extremeheat/JSPyBridge/blob/master/examples/javascript/pytorch-train.js)
[![numpy](https://www.vectorlogo.zone/logos/numpy/numpy-ar21.svg)](https://github.com/extremeheat/JSPyBridge/blob/master/examples/javascript/matplotlib.js)
[![tensorflow](https://www.vectorlogo.zone/logos/tensorflow/tensorflow-ar21.svg)](https://github.com/extremeheat/JSPyBridge/blob/master/examples/javascript/tensorflow.js)
[![mineflayer](https://www.vectorlogo.zone/logos/minecraft/minecraft-ar21.svg)](https://github.com/extremeheat/JSPyBridge/blob/master/examples/python/mineflayer.py)
<!-- <img src="https://matplotlib.org/stable/_static/logo2_compressed.svg" alt="matplotlib" width="120" height="70">
 -->


### Bridge feature comparison

Unlike other bridges, you may notice you're not just writing Python code in JavaScript, or vice-versa. You can operate on objects
on the other side of the bridge as if the objects existed on your side. This is achieved through real interop support: you can call
callbacks, and do loss-less function calls with any arguments you like (with the exception of floating points percision of course).

|  | python(ia) bridge | javascript bridge | [npm:python-bridge](https://www.npmjs.com/package/python-bridge) |
|---|---|---|---|
| Garbage collection | ✔ | ✔ | ❌ |
| Class extension support | ✔ | Not built-in (rare use case), can be manually done with custom proxy | ❌ |
| Passthrough stdin | ❌ (Standard input is not piped to bridge processes. Instead, listen to standard input then expose an API on the other side of the bridge recieve the data.) | ❌ | ✔ |
| Passthrough stdout, stderr | ✔ | ✔ | ✔ |
| Long-running sync calls | ✔ | ✔ | ✔ |
| Long-running async calls | ❌ (need to manually create new thread) | ✔ (AsyncTask) | ❌ (need to manually create new thread) |
| Callbacks | ✔ | ✔ | ❌ |
| Call classes | ✔ | ✔ |  |
| Iterators | ✔ | ✔ | ❌ |
| Inline eval | ✔ | ✔ |  |
| Dependency Management | ❌ | ✔ | ❌ |
| Local File Imports | ✔ | ✔ | ❌ |
| Error Management | ✔ | ✔ | ✔ |
| Object inspection | ✔ | ✔ | ❌ |

## Who's using it
* [PrismarineJS/mineflayer](https://github.com/PrismarineJS/mineflayer) -- [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/PrismarineJS/mineflayer/blob/master/docs/mineflayer.ipynb)

# Documentation

## From Python

You can import the bridge module with 
```py
from javascript import require
```

This will import the require function which you can use just like in Node.js. This is a slightly
modified require function which does dependency management for you. The first paramater is the name
or location of the file to import. Internally, this calls the ES6 dynamic `import()` function. Which
supports both CommonJS and ES6 modules.

If you are passing a module name (does not start with / or include a .) such as 'chalk', it will search 
for the dependency in the internal node_module folder and if not found, install it automatically. 
This install will only happen once, it won't impact startup afterwards.

The second paramater to the built-in require function is the version of the package you want, for
example `require('chalk', '^3')` to get a version greater than major version 3. Just like you would
if you were using `npm install`. It's reccomended to only use the major version as the name and version
will be internally treated as a unique package, for example 'chalk--^3'. If you leave this empty, 
we will install `latest` version instead, or use the version that may already be installed globally.

### Usage

* All function calls to JavaScript are thread synchronous
* ES6 classes can be constructed without new
* ES5 classes can be constructed with the .new psuedo method
* Use `@On` decorator when binding event listeners. Use `off()` to disable it.
* All callbacks run on a dedicated callback thread. DO NOT BLOCK in a callback or all other events will be blocked. Instead:
* Use the @AsyncTask decorator when you need to spawn a new thread for an async JS task.

For more, see [docs/python.md](https://github.com/extremeheat/JSPyBridge/blob/master/docs/python.md).

### Usage

<details>
  <summary>👉 Click here to see some code usage examples 👈</summary>

### Basic import

Let's say we have a file in JS like this called `time.js` ...
```js
function whatTimeIsIt() {
    return (new Date()).toLocaleString()
}
module.exports = { whatTimeIsIt }
```

Then we can call it from Python !
```py
from javascript import require
time = require('./time.js')
print(time.whatTimeIsIt())
```

### Event emitter

*You must use the provided On, Once, decorator and off function over the normal dot methods.*

emitter.js
```js
const { EventEmitter } = require('events')
class MyEmitter extends EventEmitter {
    counter = 0
    inc() {
        this.emit('increment', ++this.counter)
    }
}
module.exports = { MyEmitter }
```

listener.py
```py
from javascript import require, On, off
MyEmitter = require('./emitter.js')
# New class instance
myEmitter = MyEmitter()
# Decorator usage
@On(myEmitter, 'increment')
def handleIncrement(this, counter):
    print("Incremented", counter)
    # Stop listening. `this` is the this variable in JS.
    off(myEmitter, 'increment', handleIncrement)
# Trigger the event handler
myEmitter.inc()
```

### ES5 class

es5.js
```js
function MyClass(num) {
    this.getNum = () => num
}
module.exports = { MyClass }
```


es5.py
```py
MyEmitter = require('./es5.js')
myClass = MyClass.new(3)
print(myClass.getNum())
```

### Iteration
items.js
```js
module.exports = { items: [5, 6, 7, 8] }
```

items.py
```py
items = require('./items.js')
for item in items:
    print(item)
```

### Callback

callback.js
```js
export function method(cb, salt) {
    cb(42 + salt)
}
```
callback.py
```py
method = require('./callback').method
# Example with a lambda, but you can also pass a function ref
method(lambda v: print(v), 2) # Prints 44
```

</details>

## From JavaScript

* All the Python APIs are async. You must await them all. 
* Use `python.exit()` or `process.exit()` at the end to quit the Python process.
* This library doesn't manage the packaging. 
  * Right now you need to install all the deps from pip globally, but later on we may allow loading from pip-envs.
* When you do a normal Python function call, you can supply "positional" arguments, which must 
  be in the correct order to what the Python function expects.
* Some Python objects accept arbitrary keyword arguments. You can call these functions by using
  the special `$` function syntax. 
  * When you do a function call with a `$` before the parenthesis, such as `await some.pythonCall$()`, 
    the final argument is evaluated as a kwarg dictionary. You can supply named arguments this way.
* Property access with a $ at the end acts as a error suppression operator. 
  * Any errors will be ignored and instead undefined will be returned
* See [docs/javascript.md](docs/javascript.md) for more docs, and the examples for more info

### Usage

<details>
  <summary>👉 Click here to see some code usage examples 👈</summary>

### Basic import

Let's say we have a file in Python like this called `time.py` ...
```py
import datetime
def what_time_is_it():
  return str(datetime.datetime.now())
```

Then we can call it from JavaScript !
```js
import { python } from 'pythonia'
const time = await python('./time.py')
console.log("It's", await time.what_time_is_it())
python.exit()
```

### Iterating

* When iterating a Python object, you *must* use a `for await` loop instead of a normal `for-of` loop.

iter.py
```py
import os
def get_files():
  for f in os.listdir():
    yield f
```

iter.js
```js
const iter = await python('./iter.py')
const files = await iter.get_files()
for await (const file of files) {
  console.log(file)
}
```
</details>

## Extra details

* When doing a function call, any returned foreign objects will be sent to you as a reference. For example, if you're in JavaScript and do a function call to Python that returns an array, you won't get a JS array back, but you will get a reference to the Python array. You can still access the array normally with the [] notation, as long as you use await.

* This behavior makes it very fast to pass objects directly between same-language functions, avoiding costly cross-language data transfers.

* However, this does not apply with callbacks or non-native function input parameters. The bridge will try to serialize what it can, and will give you a foreign reference if it's unable to serialize something. So if you pass a JS object, you'll get a Python dict, but if the dict contains something like a class, you'll get a reference in its place.

* (On the bridge to call JavaScript from Python) If you would like the bridge to turn a foreign reference to something native, you can use `.valueOf()` to transfer an object via JSON serialization, or `.blobValueOf()` to write an object into the communication pipe directly.
  - `.valueOf()` can be used on any JSON-serializable object, but may be very slow for big data.
  - `.blobValueOf()` can be used on any pipe-writeable object implementing the `length` property (e.g. `Buffer`). It can be massively faster by circumventing the JSON+UTF8 encode/decode layer, which is inept for large byte arrays.

* You can use custom Node.js/Python binary paths by setting the `NODE_BIN` or `PYTHON_BIN` enviornment variables before importing the library. Otherwise, the `node` and `python3` or `python` binaries will be called relative to your PATH enviornment variable. 

* The inter-process communication can be inspected by setting the `DEBUG` env var to `jspybridge`.

#### Limitations

* The `ffid` keyword is reserved. You cannot use it in variable names, object keys or values as this is used to internlly track objects.

* On the bridge to call JavaScript from Python, due to the limiatations of Python and cross-platform IPC, we currently communicate over standard error which means that specific output in JS standard error can interfere with the bridge (as of this writing, the prefices `{"r"` and `blob!` are reserved). A similar issue exists on Windows with Python. You are however very unlikely to have issues with this.

* Function calls will timeout after 100000 ms and throw a `BridgeException` error. That default value can be overridden by defining the new value of `REQ_TIMEOUT` in an environment variable, and setting it to 0 will disable timeout checks.
