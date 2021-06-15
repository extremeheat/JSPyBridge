// // console.log('Hello from node.js')
// // console.warn('Hello Error from node.js')

// function write(command) {
//   process.stderr.write(JSON.stringify(command))

// // }

// function handleMessage(msg) {
//   const j = JSON.parse(msg)
//   console.log('ms', j)
//   switch (j.command) {
//     case 'echo': write({ r: j.r, yes: 'yellow' })
//   }
// }

// process.stdin.on('data', handleMessage)

const util = require('util')

// console.log('JS Started')

// const debug = console.log
const debug = () => {}

class MyDemoClass {
  constructor(color, { a }) {
    this.color = color
    this.y = a
  }

  increment() {
    this.y++
  }

  get() {
    return this.y
  }

  other(clas) {
    return clas.y + 2
  }

  moreComplex = () => {
    return () => 3
  }

  complex() {
    return {
      y: () => 2,
      x: 3
    }
  }
}

function getType(obj) {
  debug('type', typeof obj)
  if (typeof obj === 'bigint') return 'big'
  if (!isNaN(obj)) return 'num'
  if (typeof obj === 'object') return 'obj'
  if (typeof obj === 'string') return 'string'
  if (typeof obj === 'function') {
    const props = Object.getOwnPropertyNames(obj)
    // Some tricks to check if we have a function, class or object
    if (!props.includes('arguments') && props.includes('prototype')) return 'class'
    return 'fn'
  }
}

class Bridge {
  constructor(ipc) {
    // This is an ID that increments each time a new object is returned
    // to Python.
    this.ffid = 0
    // This contains a refrence map of FFIDs to JS objects.
    // TODO: figure out gc, maybe weakmaps
    this.m = {
      0: {
        MyDemoClass,
        console,
        require,
        createTest: args => {
          debug('JS GOT', args)
        },
        createBot: args => {
          return mineflayer.createBot(...args)
        }
      }
    }
    this.ipc = ipc
    // ipc.on('message', this.onMessage)
  }

  

  async get(r, ffid, attr) {
    const v = await this.m[ffid][attr]
    const type = getType(v)
    debug('TYP', this.m, ffid, attr, await this.m[ffid][attr], type)
    switch (type) {
      case 'string': return this.ipc.send({ r, key: 'string', val: v })
      case 'big': return this.ipc.send({ r, key: 'big', val: Number(v) })
      case 'num': return this.ipc.send({ r, key: 'num', val: v })
      case 'class': return this.ipc.send({ r, key: 'class', val: this.ffid })
      case 'fn': return this.ipc.send({ r, key: 'fn', val: this.ffid })
      case 'obj':
        this.m[++this.ffid] = v
        return this.ipc.send({ r, key: 'obj', val: this.ffid })
      default: return this.ipc.send({ r, key: 'void', val: this.ffid })
    }
  }

  // Call property with new keyword to construct classes
  init(r, ffid, attr, args) {
    // debug('-- init', r, ffid, attr, args)
    // debug(...args)
    this.m[++this.ffid] = new this.m[ffid][attr](...args)
    // debug('*********V', this.m[this.ffid])
    this.ipc.send({ r, key: 'obj', val: this.ffid })
  }

  // Call function with async keyword (also works with sync funcs)
  async call(r, ffid, attr, args) {
    debug('call', r, args)
    const v = this.m[++this.ffid] = await this.m[ffid][attr](...args)
    const type = getType(this.m[this.ffid])
    // debug('type', r, attr, json.stringify(v), type)
    switch (type) {
      case 'string': return this.ipc.send({ r, key: 'string', val: v })
      case 'big': return this.ipc.send({ r, key: 'big', val: Number(v) })
      case 'num': return this.ipc.send({ r, key: 'num', val: v })
      case 'class': return this.ipc.send({ r, key: 'class', val: this.ffid })
      case 'fn':
        // Fix for functions that return functions, use .call() wrapper
        this.m[this.ffid] = { call: this.m[this.ffid] }
        return this.ipc.send({ r, key: 'obj', val: this.ffid })
      case 'obj': return this.ipc.send({ r, key: 'obj', val: this.ffid })
      default: return this.ipc.send({ r, key: 'void', val: this.ffid })
    }
  }

  // called for debug in JS, print() in python via __str__
  async inspect(r, ffid) {
    const s = util.inspect(await this.m[ffid])
    this.ipc.send({ r, val: s })
  }

  // for __dict__ in python (used in json.dumps)
  async serialize(r, ffid) {
    const s = JSON.stringify(await this.m[ffid])
    this.ipc.send({ r, val: s })
  }

  free(r, ffid) {
    delete this.m[ffid]
    this.ipc.send({ r, val: true })
  }

  onMessage({ r, action, ffid, key, args }) {
    // debug('onMessage!', arguments, r, action)
    const nargs = []
    if (args) {
      // Sometimes function arguments might contain classes,
      // or objects, which we need to convert.
      for (const arg of args) {
        if (arg.ffid) {
          nargs.push(this.m[arg.ffid])
        } else {
          nargs.push(arg)
        }
      }
    }
    this[action](r, ffid, key, nargs)
    // debug('processing', r, action)
  }
}

const ipc = {
  send: data => {
    debug('to PY', data)
    data.ts = Date.now()
    process.stderr.write(JSON.stringify(data) + '\n')
    // console.warn('T', Date.now())
    // process.stderr.write(JSON.stringify(data))
  }
}

const bridge = new Bridge(ipc)
process.stdin.on('data', data => {
  // console.log('IPC', data)
  const d = String(data)
  debug(d)
  for (const line of d.split('\n')) {
    // debug('line', line)
    try { var j = JSON.parse(line) } catch (e) { continue }
    bridge.onMessage(j)
  }
})

setTimeout(() => {
  // process.stderr.write(2)
  // process.exit(1)
}, 5000)

// process.stdin.on('data', debug)
process.on('exit', () => {
  console.log('** NODE EXITING')
})