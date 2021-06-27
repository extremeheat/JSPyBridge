const util = require('util')
const { PyBridge } = require('./pybridge')

const debug = process.env.DEBUG?.includes('jspybridge') ? console.debug : () => { }

function getType (obj) {
  debug('type', typeof obj)
  if (typeof obj === 'bigint') return 'big'
  if (!isNaN(obj)) return 'num'
  if (typeof obj === 'object') return 'obj'
  if (typeof obj === 'string') return 'string'
  if (typeof obj === 'function') {
    // Some tricks to check if we have a function, class or object
    if (obj.prototype) {
      // SO ... we COULD automatically call new for ES5 functions, but this gets complicated.
      // Since old ES5 classes can be called both with and without new, but with different
      // behavior. By forcing the new operator, we can no longer access ES5 classes variables
      // because of lack of support in proxy.py for functions with variables inside.. So instead
      // just don't call `new` for non-ES6 classes and let the user use the .new() psuedomethod.
      // The below could would check if the prototype has functions in it and assume class if so.
      // const props = Object.getOwnPropertyNames(obj.prototype)
      // if (props.length > 1) return 'class'
      // The below code just checks to see if we have an ES6 class (non-writable)
      const desc = Object.getOwnPropertyDescriptor(obj, 'prototype')
      if (!desc.writable) return 'class'
    }

    return 'fn'
  }
}

class Bridge {
  constructor (ipc) {
    // This is an ID that increments each time a new object is returned
    // to Python.
    this.ffid = 0
    // This contains a refrence map of FFIDs to JS objects.
    // TODO: figure out gc, maybe weakmaps
    this.m = {
      0: {
        console,
        require,

        // Event Polling until we support callbacks
        startEventPolling: this.startEventPolling.bind(this),
        stopEventPolling: this.stopEventPolling.bind(this)
      }
    }
    this.ipc = ipc
    this.pyi = new PyBridge(this.ipc, this)
    this.eventMap = {}

    if (process.env.DEBUG) {
      Object.assign(this.m[0], require('./test'))
    }

    // ipc.on('message', this.onMessage)
  }

  async get (r, ffid, attr) {
    const v = await this.m[ffid][attr]
    const type = getType(v)
    // debug('TYP', this.m, ffid, attr, await this.m[ffid][attr], type)
    switch (type) {
      case 'string': return this.ipc.send({ r, key: 'string', val: v })
      case 'big': return this.ipc.send({ r, key: 'big', val: Number(v) })
      case 'num': return this.ipc.send({ r, key: 'num', val: v })
      case 'class':
        // We do not need to increment FFID here because Python will return
        // an instanciable function. The FFID can be ignored.
        // Example: some.method() -> some['method'] is GET'ed, then Python realizes
        // it's a class so returns a callable function that does a INIT operation.
        // this.m[++this.ffid] = v
        return this.ipc.send({ r, key: 'class', val: ffid })
      case 'fn':
        this.m[++this.ffid] = v
        return this.ipc.send({ r, key: 'fn', val: this.ffid })
      case 'obj':
        this.m[++this.ffid] = v
        return this.ipc.send({ r, key: 'obj', val: this.ffid })
      default: return this.ipc.send({ r, key: 'void', val: this.ffid })
    }
  }

  // Call property with new keyword to construct classes
  init (r, ffid, attr, args) {
    // console.log('init', r, ffid, attr, args)
    this.m[++this.ffid] = attr ? new this.m[ffid][attr](...args) : new this.m[ffid](...args)
    this.ipc.send({ r, key: 'inst', val: this.ffid })
  }

  // Call function with async keyword (also works with sync funcs)
  async call (r, ffid, attr, args) {
    // console.debug('call', r, ffid, attr, args)
    if (attr) {
      var v = await this.m[ffid][attr].apply(this.m[ffid], args) // eslint-disable-line
    } else {
      var v = await this.m[ffid](...args) // eslint-disable-line
    }
    const type = getType(v)
    // console.log('GetType', type, v)
    switch (type) {
      case 'string': return this.ipc.send({ r, key: 'string', val: v })
      case 'big': return this.ipc.send({ r, key: 'big', val: Number(v) })
      case 'num': return this.ipc.send({ r, key: 'num', val: v })
      case 'class':
        this.m[++this.ffid] = v
        return this.ipc.send({ r, key: 'class', val: this.ffid })
      case 'fn':
        // Fix for functions that return functions, use .call() wrapper
        // this.m[++this.ffid] = { call: v }
        this.m[++this.ffid] = v
        return this.ipc.send({ r, key: 'fn', val: this.ffid })
      case 'obj':
        this.m[++this.ffid] = v
        return this.ipc.send({ r, key: 'obj', val: this.ffid })
      default: return this.ipc.send({ r, key: 'void', val: this.ffid })
    }
  }

  // called for debug in JS, print() in python via __str__
  async inspect (r, ffid) {
    const s = util.inspect(await this.m[ffid], { colors: true })
    this.ipc.send({ r, val: s })
  }

  // for __dict__ in python (used in json.dumps)
  async serialize (r, ffid) {
    const s = JSON.stringify(await this.m[ffid])
    this.ipc.send({ r, val: s })
  }

  free (r, ffid) {
    // Make sure we don't keep any emitter refs around to avoid blocking GC
    if (this.m[ffid]._pollingId) delete this.eventMap[this.m[ffid]._pollingId]
    delete this.m[ffid]
    this.ipc.send({ r, val: true })
  }

  
  make (r, ffid) {
    ++this.ffid
    const proxy = this.pyi.makePyObject(this.ffid)
    this.m[this.ffid] = new WeakRef(proxy)
    this.pyi.queueForCollection(ffid, proxy)
    this.ipc.send({ r, val: this.ffid })
  }

  onMessage ({ r, action, ffid, key, args }) {
    // console.debug('onMessage!', arguments, r, action)
    const nargs = []
    if (args) {
      // Sometimes function arguments might contain classes,
      // or objects, which we need to convert.
      for (const arg of args) {
        if (arg.ffid) {
          const r = this.m[arg.ffid]
          nargs.push(r instanceof WeakRef ? r.deref() : r)
        } else {
          nargs.push(arg)
        }
      }
    }
    // console.log('ac', action)
    this[action](r, ffid, key, nargs)
  }

  // Accessory methods

  // Events accumulate here, then they have to be polled by the Python event loop
  async startEventPolling (ffid, eventName, pollingId) {
    const what = await this.m[ffid]

    const handler = (...args) => {
      // console.log('GOT event', ffid, pollingId, eventName, args)
      this.m[++this.ffid] = args
      this.ipc.send({ r: Date.now(), cb: pollingId, val: this.ffid })
    }
    // console.log('POLLING', what, pollingId, eventName)
    what.on(eventName, handler)
    what._pollingId = pollingId
    this.eventMap[pollingId] = { handler, what, eventName, id: this.ffid }
    return true
  }

  stopEventPolling (pollingId) {
    const e = this.eventMap[pollingId]
    if (e) {
      e.what.off(e.eventName, e.handler)
      delete this.eventMap[pollingId]
    }
  }
}

Object.assign(util.inspect.styles, {
  bigint: 'yellow',
  boolean: 'yellow',
  date: 'magenta',
  module: 'underline',
  name: 'blueBright',
  null: 'bold',
  number: 'yellow',
  regexp: 'red',
  special: 'magentaBright', // (e.g., Proxies)
  string: 'green',
  symbol: 'blue',
  undefined: 'grey'
})

const handlers = {}

const ipc = {
  send: data => {
    debug('js -> py', data)
    data.ts = Date.now()
    process.stderr.write(JSON.stringify(data) + '\n')
  },
  write(data, cb) {
    handlers[data.r] = cb
    this.send(data)
  }
}

const bridge = new Bridge(ipc)
process.stdin.on('data', data => {
  const d = String(data)
  debug('py -> js', d)
  for (const line of d.split('\n')) {
    try { var j = JSON.parse(line) } catch (e) { continue } // eslint-disable-line
    if (j.c === 'pyi') {
      handlers[j.r]?.(j)
    } else {
      bridge.onMessage(j)
    }
  }
})

process.on('exit', () => {
  debug('** Node exiting')
})
// console.log('JS Started!')
