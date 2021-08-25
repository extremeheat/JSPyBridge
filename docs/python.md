# Docs for bridge to call JavaSript from Python

(See README.md for some additional details)

* All function calls to JavaScript are thread synchronous
* ES6 classes can be constructed without new
* ES5 classes can be constructed with the .new psuedo method
* Use `@On` decorator when binding event listeners. Use `off` to disable it.
* All callbacks run on a dedicated callback thread. DO NOT BLOCK in a callback or all other events will be blocked. Instead:
* Use the @AsyncTask decorator when you need to spawn a new thread for an async JS task.


## Built-ins

Dependencies are automatically maanged through the library through the `require` function. If
you run into issues with dependencies, you can clear the internal `node_modules` folder cache
by using `python3 -m javascript --clean` in a command line.

You can update the internal packages with `python3 -m javascript --update <npm package>`. 

You can install a package internally by using `python3 -m javascript --install <npm package>`. Internally, whatever you place after --update will be passed to `npm install <...>`. For example, use `python3 -m javascript --install PrismarineJS/vec3` to install the `vec3` package from git.

### imports

```py
def require ( package_name: str, package_version: Optional[str] = None ) -> Void
```

* `package_name` : The name of the npm package you want to import. If you use a relative import
  (starting with . or /) then it will load the file relative to where your calling script is.
* `package_version` : The version of the npm package you want to install. If blank, first try to
  require from the local or global npm registry. If not found, install the specified package name
  and version. These two combine to create a unique ID, for example `chalk--1.0`. This ensures two
  different versiond don't collide. This parameter is ignored for relative imports.

### threads

This library provides some wrappers around threads. You aren't forced to use them, but they
help you avoid boilerplate and are simple to use.

```py
from javascript import AsyncTask, start, stop, abort
@AsyncTask(start=True)
def routine(task: TaskState):
  ...

# The signatures for the above functions :
def start(fn: Function): ...
def stop(fn: Function): ...
def abort(fn: Function, killAfterSeconds: Optional[Int]): ...
class TaskState:
  sleeping: bool
  def wait(seconds: Int): ...
  sleep = wait # Sleep is an alias to wait.
```

The AsyncTask decorator is a wrapper for creating threads. Any function you wrap with it will
result in the creation of a thread, bound to the specified function. It will *not* automatically
start the thread, unless `start` parameter is set to True. 

The `start()`, `stop()` and `abort()` functions all relate to AsyncTask threads. If you didn't
already start a AsyncTask, you can programmatically start it later with `start(routine)`. If you
want a thread to stop, you can send a `stopping` signal to it. The first parameter to all AsyncTasks
is a `TaskState` object. That object has a `stopping` variable, and a `wait` function. The stopping
variable indicates that the thread should exit immediately, and it's your responsibility to make
sure it does. The `wait` function that exists in TaskState will sleep, but also automatically exit 
the process once the `stopping` flag is True. 

```py
import time
from javascript import AsyncTask, start, stop, abort
@AsyncTask(start=False)
def routine(task: TaskState):
  while not task.stopping: # You can also just do `while True` as long as you use task.sleep and not time.sleep
    ... do some repeated task ...
    task.sleep(1) # Sleep for a bit to not block everything else

start(routine)
time.sleep(1)
stop(routine)
```

If you need to be 100% sure the thread has stopped, you can use `abort(fn, seconds)` function instead. This
will kill the thread if it doesn't kill in n seconds. It's not good pratice to kill Python threads, so
avoid this when possible. To avoid trouble, `stop()` does not force the thread to exit, it just asks.

### events

This library provides some wrappers around EventEmitters. You must use them over the built-in
`.on`, `.off` and `.once` methods of normal EventEmitters. You can still use `.emit` normally.

These wrappers are avaliable as `@On(emitter, eventName)`, `@Once(emitter, eventName)` and
the top-level `off(emitter, eventName, handlerFn)` function.

Note that you are still able to use the `once` static function from Node.js's `emitter` library.
This library provides a default export for this, used as in the example below.

```py
from javascript import require, On, Once, off, once
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

### expression evaluation

You can use the exported `eval_js` function to evaluate JavaScript code within the current Python context. The parameter to this function is a JS string to evaluate, with access to all the Python variables in scope. Make sure to use `await` anywhere you do a function call or a property access on a Python object. You can set variables without await.

```julia
import javascript

countUntil = 9
myArray = [1]
myObject = { 'hello': '' }

# Make sure you await everywhere you expect a JS call !
output = javascript.eval_js('''
    myObject['world'] = 'hello'    
    for (let x = 0; x < countUntil; x++) {
        await myArray.append(2)
    }
    return 'it worked'
''')

# If we look at myArray and myObject, we should see it updated
print(output, myArray, myObject)
```

You can also use it inline.
```swift
x_or_z = eval_js(''' obj.x ?? obj.z ''')
```