/**
 * The JavaScript Interface for Python
 */
const util = require('util')

const debug = process.env.DEBUG?.includes('jspybridge') ? console.debug : () => { }
const colors = process.env.FORCE_COLOR !== '0'

function getType (obj) {
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
  if (typeof obj === 'bigint') return 'big'
  if (typeof obj === 'object') return 'obj'
  if (!isNaN(obj)) return 'num'
  if (typeof obj === 'string') return 'string'
}

class JSBridge {
  constructor (ipc, pyi) {
    // This is an ID that increments each time a new object is returned
    // to Python.
    this.ffid = 0
    this.pyi = pyi
    // This contains a refrence map of FFIDs to JS objects.
    // TODO: figure out gc, maybe weakmaps
    this.m = {
      0: {
        console,
        require
      }
    }
    this.ipc = ipc
    this.eventMap = {}

    // ipc.on('message', this.onMessage)
  }

  async get (r, ffid, attr) {
    try {
      var v = await this.m[ffid][attr]
      var type = v.ffid ? 'py' : getType(v)
    } catch (e) {
      return this.ipc.send({ r, key: 'void', val: this.ffid })
    }

    switch (type) {
      case 'string': return this.ipc.send({ r, key: 'string', val: v })
      case 'big': return this.ipc.send({ r, key: 'big', val: Number(v) })
      case 'num': return this.ipc.send({ r, key: 'num', val: v })
      case 'py': return this.ipc.send({ r, key: 'py', val: v.ffid })
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

  set (r, ffid, attr, [val]) {
    try {
      this.m[ffid][attr] = val
    } catch (e) {
      return this.ipc.send({ r, key: 'error', error: e.stack })
    }
    this.ipc.send({ r, key: '', val: true })
  }

  // Call property with new keyword to construct classes
  init (r, ffid, attr, args) {
    // console.log('init', r, ffid, attr, args)
    this.m[++this.ffid] = attr ? new this.m[ffid][attr](...args) : new this.m[ffid](...args)
    this.ipc.send({ r, key: 'inst', val: this.ffid })
  }

  // Call function with async keyword (also works with sync funcs)
  async call (r, ffid, attr, args) {
    try {
      if (attr) {
         var v = await this.m[ffid][attr].apply(this.m[ffid], args) // eslint-disable-line
      } else {
         var v = await this.m[ffid](...args) // eslint-disable-line
      }
    } catch (e) {
      return this.ipc.send({ r, key: 'error', error: e.stack })
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
    const s = util.inspect(await this.m[ffid], { colors })
    this.ipc.send({ r, val: s })
  }

  // for __dict__ in python (used in json.dumps)
  async serialize (r, ffid) {
    const v = await this.m[ffid]
    this.ipc.send({ r, val: v.valueOf() })
  }

  free (r, ffid) {
    delete this.m[ffid]
    this.ipc.send({ r, val: true })
  }

  make (r, ffid) {
    const proxy = this.pyi.makePyObject(ffid)
    this.m[ffid] = new WeakRef(proxy)
    this.pyi.queueForCollection(ffid, proxy)
    this.ipc.send({ r, val: ffid })
  }

  process (r, args) {
    const parse = input => {
      if (typeof input !== 'object') return
      for (const k in input) {
        const v = input[k]
        if (v && typeof v === 'object') {
          if (v.ffid) {
            const proxy = this.pyi.makePyObject(v.ffid)
            this.m[v.ffid] = proxy
            input[k] = proxy
          }
        } else {
          parse(v)
        }
      }
    }
    parse(args)
  }

  async onMessage ({ r, action, p, ffid, key, args }) {
    // console.debug('onMessage!', arguments, r, action)
    try {
      if (p) {
        this.process(r, args)
      }
      await this[action](r, ffid, key, args)
    } catch (e) {
      return this.ipc.send({ r, key: 'error', error: e.stack })
    }
  }
}

module.exports = { JSBridge }
