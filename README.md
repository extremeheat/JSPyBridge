# JSPyBridge

Interoperate Node.js with Python. Work in progress.

## Features

* Async and sync function support
* Native garbage collection
* Callbacks
* Events
* Exception handling

### Work in progress
* Object mutation from JavaScript. You cannot update properties right now, so add setter methods in JS instead. This may be fixed later on.

## Basic usage example

### Access JavaScript from Python

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
const a.pack()
// The special $timeout argument tells the bridge to adjust the function call timeout
// Set Infinity for no timeout.
await root.mainloop$({ $timeout: Infinity })
```

### Run an example
[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/extremeheat/jspybridge)

Open in Gitpod link above, and run :
```
npm install # this installs test deps
cd src
DEBUG=true python3 test.py
```
