/**
 * The Python Interface for JavaScript
 */

const util = require('util')
const REQ_TIMEOUT = 10000
const log = () => {}

class BridgeException extends Error {
  constructor (...a) {
    super(...a)
    this.message += ` Python didn't respond in time (${REQ_TIMEOUT}ms), look above for any Python errors. If no errors, the API call hung.`
    // We'll fix the stack trace once this is shipped.
  }
}

class PythonException extends Error {
  constructor(stack, error) {
    super(`Call to '${stack.join('.')}' failed: \n\n${error}`)
  }
}

async function waitFor (cb, withTimeout, onTimeout) {
  let t
  if (withTimeout === Infinity) return new Promise(resolve => cb(resolve))
  const ret = await Promise.race([
    new Promise(resolve => cb(resolve)),
    new Promise(resolve => { t = setTimeout(() => resolve('timeout'), withTimeout) })
  ])
  clearTimeout(t)
  if (ret === 'timeout') onTimeout()
  return ret
}

const nextReq = () => (performance.now() * 10) | 0

class PyBridge {
  constructor (com, jsi) {
    this.com = com
    // This is a ref map used so Python can call back JS APIs
    this.jrefs = {}
    this.jsi = jsi

    // This is called on GC
    this.finalizer = new FinalizationRegistry(ffid => {
      this.free(ffid)
      // Once the Proxy is freed, we also want to release the pyClass ref
      delete this.jsi.m[ffid]
    })
  }

  request (req, cb) {
    // When we call Python functions with Proxy paramaters, we need to just send the FFID
    // so it can be mapped on the python side.
    req.c = 'pyi'
    this.com.write(req, cb)
  }

  async len (ffid, stack) {
    const req = { r: nextReq(), action: 'length', ffid: ffid, key: stack, val: '' }
    const resp = await waitFor(cb => this.request(req, cb), REQ_TIMEOUT, () => {
      throw new BridgeException(`Attempt to access '${stack.join('.')}' failed.`)
    })
    return resp.val
  }

  async get (ffid, stack, args) {
    const req = { r: nextReq(), action: 'get', ffid: ffid, key: stack, val: args }

    const resp = await waitFor(cb => this.request(req, cb), REQ_TIMEOUT, () => {
      throw new BridgeException(`Attempt to access '${stack.join('.')}' failed.`)
    })
    switch (resp.key) {
      case 'string':
      case 'int':
        return resp.val // Primitives don't need wrapping
      default: {
        const py = this.makePyObject(resp.val, resp.sig)
        this.queueForCollection(resp.val, py)
        return py
      }
    }
  }

  // icall paramater means the first argument holds a `this` refrence
  async call(ffid, stack, args, kwargs, icall, timeout) {
    let nargs = []
    for (const arg of args) {
      if (icall && !arg.ffid) {
        icall = false
        const jfid = await this.pyFn(arg)
        nargs.push({ ffid: jfid })
        // arg.ffid = jfid
      } else if (arg.ffid) {
        nargs.push({ ffid: arg.ffid })
      } else if (typeof arg === 'function') {
        const jfid = await this.pyFn(arg)
        nargs.push({ ffid: jfid })
        // arg.ffid = jfid
      } else {
        nargs.push(arg)
      }
    }
    if (kwargs) {
      for (const kwarg in kwargs) {
        const arg = kwargs[kwarg]
        if (icall && !arg.ffid) {
          icall = false
          const jfid = await this.pyFn(arg)
          kwargs[kwarg] = { ffid: jfid }
          // arg.ffid = jfid
        } else if (arg.ffid) {
          kwargs[kwarg] = { ffid: arg.ffid }
        } else if (typeof arg === 'function') {
          const jfid = await this.pyFn(arg)
          kwargs[kwarg] = { ffid: jfid }
          // arg.ffid = jfid
        }
      }
    }
    
    // console.log('nargs', nargs)
    if (kwargs) {
      var req = { r: nextReq(), action: 'acall', ffid: ffid, key: stack, val: [nargs, kwargs] }
    } else {
      var req = { r: nextReq(), action: 'call', ffid: ffid, key: stack, val: nargs }
    }

    const resp = await waitFor(cb => this.request(req, cb), timeout || REQ_TIMEOUT, () => {
      throw new BridgeException(`Attempt to access '${stack.join('.')}' failed.`)
    })
    log('call', ffid, stack, args, resp)
    switch (resp.key) {
      case 'string':
      case 'int':
        return resp.val // Primitives don't need wrapping
        case 'error':
          throw new PythonException(stack, resp.sig)
      default: {
        const py = this.makePyObject(resp.val, resp.sig)
        this.queueForCollection(resp.val, py)
        return py
      }
    }
  }

  async inspect (ffid, stack) {
    const req = { r: nextReq(), action: 'inspect', ffid: ffid, key: stack, val: '' }
    const resp = await waitFor(cb => this.request(req, cb), REQ_TIMEOUT, () => {
      throw new BridgeException(`Attempt to access '${stack.join('.')}' failed.`)
    })
    return resp.val
  }

  async free (ffid) {
    const req = { r: nextReq(), action: 'free', ffid: ffid, key: '', val: '' }
    const resp = await waitFor(cb => this.request(req, cb), 500, () => {
      // Allow a GC time out, it's probably because the Python process died
      // throw new BridgeException('Attempt to GC failed.')
    })
    return resp.val
  }

  async pyFn (fn) {
    const req = { r: nextReq(), action: 'make', ffid: '', key: fn.name ?? fn.constructor.name, val: '' }
    const resp = await waitFor(cb => this.request(req, cb), REQ_TIMEOUT, () => {
      throw new BridgeException(`Attempt create function '${fn.name}' failed.`)
    })
    const ffid = resp.val
    this.jsi.m[ffid] = fn
    this.queueForCollection(ffid, fn)
    return ffid
  }

  queueForCollection (ffid, val) {
    this.finalizer.register(val, ffid)
  }

  makePyObject (ffid, inspectString) {
    // "Intermediate" objects are returned while chaining. If the user tries to log
    // an Intermediate then we know they forgot to use await, as if they were to use
    // await, then() would be implicitly called where we wouldn't return a Proxy, but
    // a Promise. Must extend Function to be a "callable" object in JS for the Proxy.
    class Intermediate extends Function {
      constructor (callstack) {
        super()
        this.callstack = [...callstack]
      }

      [util.inspect.custom] () {
        return '\n[You must use await when calling a Python API]\n'
      }
    }
    const handler = {
      get: (target, prop, reciever) => {
        const next = new Intermediate(target.callstack)
        // log('```prop', next.callstack, prop)
        if (prop === '$$') return target
        if (prop === 'ffid') return ffid
        if (prop === 'then') {
          // Avoid .then loops
          if (!next.callstack.length) {
            return undefined
          }
          return (resolve, reject) => {
            this.get(ffid, next.callstack, []).then(resolve).catch(reject)
            next.callstack = [] // Empty the callstack afer running fn
          }
        }
        if (prop === 'length') {
          return this.len(ffid, next.callstack, [])
        }
        if (typeof prop === 'symbol') {
          console.log('Get symbol', next.callstack, prop)
          if (prop === Symbol.asyncIterator) {
            // todo
          }
          return
        }
        if (Number.isInteger(parseInt(prop))) prop = parseInt(prop)
        next.callstack.push(prop)
        return new Proxy(next, handler) // no $ and not fn call, continue chaining
      },
      apply: (target, self, args) => { // Called for function call
        const final = target.callstack[target.callstack.length - 1]
        let icall, kwargs, timeout
        if (final === 'apply') {
          target.callstack.pop()
          icall = true
          args = [args[0], ...args[1]]
        } else if (final === 'call') {
          target.callstack.pop()
          icall = true
        } else if (final?.endsWith('$')) {
          kwargs = args.pop()
          timeout = kwargs.$timeout
          delete kwargs.$timeout
          target.callstack[target.callstack.length - 1] = final.slice(0, -1)
        }
        const ret = this.call(ffid, target.callstack, args, kwargs, icall, timeout)
        target.callstack = [] // Flush callstack to py
        return ret
      }
    }
    // A CustomLogger is just here to allow the user to console.log Python objects
    // since this must be sync, we need to call inspect in Python along with every CALL or GET
    // operation, which does bring some small overhead.
    class CustomLogger extends Function {
      constructor () {
        super()
        this.callstack = []
      }

      [util.inspect.custom] () {
        return inspectString || '(Some Python object)'
      }
    }
    return new Proxy(new CustomLogger(), handler)
  }
}

module.exports = { PyBridge }
