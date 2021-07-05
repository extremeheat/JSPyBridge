# JSPyBridge

Interoperate Node.js with Python. **Work in progress.**

Requires Node.js 16 and Python 3.8 or newer.

## Key Features

* Async and sync function support
* Native garbage collection
* Callbacks
* 🚦  Events
* Exception handling
* Iterator support

### Work in progress
* Better Python class support and interop from JavaScript (allow for PyTorch)

## Basic usage example

### Access JavaScript from Python

(Although the examples below use `javascript` import, please use `JSPyBridge` instead.)

```sh
pip3 install git+https://github.com/extremeheat/jspybridge.git
```


```py
from JSPyBridge import require, console

chalk, fs = require("chalk"), require("fs")

console.log("Hello", chalk.red("world!"))
fs.writeFileSync("HelloWorld.txt", "hi!")
```

### Access Python from JavaScript

Make sure to have the dependencies installed before hand!

```sh
npm i extremeheat/JSPyBridge
```

```js
import { python } from 'JSPyBridge'
// Import tkinter
const tk = await python('tkinter')
// All Python API access must be prefixed with await
const root = await tk.Tk()
// A function call with a $ suffix will treat the last argument as a kwarg dict
const a = await tk.Label$(root, { text: 'Hello World' })
await a.pack()
// The special $timeout argument tells the bridge to adjust the function call timeout
// Set Infinity for no timeout.
await root.mainloop$({ $timeout: Infinity })
```

### Run an example
[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/extremeheat/jspybridge)

Open in Gitpod link above, and run :
```
nvm install 16 # Install Node.js 16
nvm use 16 # Use node.js 16
npm install # this installs test deps
cd src
DEBUG=true python3 test.py
```

# Documentation

This bridge works through standard input/output pipes, there are no native modules and the 
communication can happen through anywhere--either pipes or network sockets.

You can import and call any JS or Python class you want, with few exceptions.

**How it works.** For every property access, there is a 
communication protocol where one side may access properties on the other, and also complete
function calls. Non-primitive values are sent as foreign object reference IDs (FFID). These FFIDs
exist in a map on both sides of the bridge, and map numeric IDs with a object reference. 

On the opposite side to the one which holds a reference, this FFID is assigned to a Proxy object.
In JS, a ES6 proxy is used, and in Python, the proxy is a normal class with custom `__getattr__` 
and other magic methods. Each proxy property access is mirrored on the other side of the bridge. 

Proxy objects on both sides of the bridge are GC tracked. In JavaScript, all python Proxy objects
are registered to a FinalizationRegistry. In Python, `__del__` is used to track the Proxy object's
destruction. When the proxy object is destoryed on one side of the bridge, its refrence is removed
from the other side of the bridge. This means you don't have to deal with memory management.

## Python

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

<!-- If you prefer to use the native node.js require function, you can instead import it from the global namespace, for example :
```js
from javascript import globalThis.require as require
``` 
then use it normally. However, note you will be responsibe for installing the dependencies. -->

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

For more, see docs/python.md.

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

callback.py
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



## JavaScript

The magic behind this is the usage of Proxy chains which permits call stack build up, until
a .then call for property access or a function call is done. Afterwards, the callstack is sent
and executed in Python.

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
* See docs/javascript.md for more docs.

###  Usage

### Basic import

Let's say we have a file in Python like this called `time.py` ...
```js
import datetime
def what_time_is_it():
  return str(datetime.datetime.now())
```

Then we can call it from JavaScript !
```py
import { python } from 'JSPyBridge'
const time = await python('./time.py')
console.log("It's", await time.what_time_is_it())
python.exit()
```