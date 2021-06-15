## JSPyBridge

Call Node.js APIs from Python. Work in progress.

### Features

* Async and sync function support
* Native garbage collection

Not Supported:
* Callbacks. 
* Events (work in progress)
<!-- The future is async! Use async when possible or EventEmitter. To call callback functions, 
use Node.js's `util.promisify` or the one built-in to this lib, `JSPyBridge.promisify`.  -->
The promisify function built into this lib supports callbacks in any location, not just the last paramater.
* Object mutation from JavaScript. You cannot update properties right now, so add setter methods in JS instead. This may be fixed later on.

### Basic usage example

```py
from JSPyBridge import require, console

chalk, fs = require("chalk"), require("fs")

console.log("Hello", chalk.red("world!"))
fs.writeFileSync("HelloWorld.txt", "hi!")
```