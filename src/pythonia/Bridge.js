if (typeof process !== 'undefined' && parseInt(process.versions.node.split('.')[0]) < 16) {
  console.error('Your node version is currently', process.versions.node)
  console.error('Please update it to a version >= 16.x.x from https://nodejs.org/')
  process.exit(1)
}

const util = require('util')
const { JSBridge } = require('./jsi')
const errors = require('./errors')
const log = process.env.DEBUG ? console.debug : () => {}
// const log = console.log
const REQ_TIMEOUT = 100000

class BridgeException extends Error {
  constructor (...a) {
    super(...a)
    this.message += ` Python didn't respond in time (${REQ_TIMEOUT}ms), look above for any Python errors. If no errors, the API call hung.`
    // We'll fix the stack trace once this is shipped.
  }
}

class PythonException extends Error {
  constructor (stack, error) {
    super()
    const trace = this.stack.split('\n').slice(1).join('\n')
    this.stack = errors.getErrorMessage(stack.join('.'), trace, error)
  }
}

class PyClass {
  // Hard privates to avoid tripping over our internal things
  #current = {}
  #userInit
  #superclass
  #superargs
  #superkwargs
  #trap
  constructor (superclass, superArgs = [], superKwargs = {}) {
    if (this.init) this.#userInit = this.init
    this.init = this.#init
    this.#superclass = superclass
    this.#superargs = superArgs
    this.#superkwargs = superKwargs
    if (!Array.isArray(superArgs)) {
      throw new SyntaxError('Second parameter to PyClass super must be the positional arguments to pass to the Python superclass')
    }
    if (typeof superKwargs !== 'object') {
      throw new SyntaxError('Third parameter to PyClass super must be an object which holds keyword arguments to pass to the Python superclass')
    }
  }

  static init (...args) {
    const clas = new this(...args)
    return clas.init()
  }

  async #init (bridge = globalThis.__pythonBridge) {
    if (this.#trap) throw 'cannot re-init'
    const name = this.constructor.name
    const variables = Object.getOwnPropertyNames(this)
    // Set.has() is faster than Array.includes which is O(n)
    const members = new Set(Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(k => k !== 'constructor'))
    // This would be a proxy to Python ... it creates the class & calls __init__ in one pass
    const sup = await this.#superclass
    const [ffid, pyClass] = await bridge.makePyClass(this, name, {
      name,
      overriden: [...variables, ...members],
      bases: this.#superclass ? [[sup.ffid, this.#superargs, this.#superkwargs]] : []
    })
    this.pyffid = ffid

    const makeProxy = (target, forceParent) => {
      return new Proxy(target, {
        get: (target, prop) => {
          const pname = prop !== 'then' ? '~~' + prop : prop
          if (forceParent) return pyClass[pname]
          if (prop === 'ffid') return this.pyffid
          if (prop === 'toJSON') return () => ({ ffid })
          if (prop === 'parent') return target.parent
          if (members.has(prop)) return this[prop]
          else return pyClass[pname]
        },
        set: (target, prop, val) => {
          const pname = prop
          if (prop === 'parent') throw RangeError('illegal reserved property change')
          if (forceParent) return pyClass[pname] = val
          if (members.has(prop)) return this[prop] = val
          else return pyClass[pname] = val
        },
        apply: (target, self, args) => {
          const prop = '__call__'
          if (this[prop]) {
            return this[prop](...args)
          } else {
            return pyClass[prop](...args)
          }
        }
      })
    }
    class Trap extends Function {
      constructor () {
        super()
        this.base = makeProxy(this, false)
        this.parent = makeProxy(this, true)
      }
    }
    this.#trap = new Trap()

    for (const member of members) {
      const fn = this[member]
      this.#current[member] = fn
      // Overwrite the `this` statement in each of the class members to use our router
      this[member] = fn.bind(this.#trap.base)
    }

    await this.#userInit?.call(this.#trap.base)
    return this.#trap.base
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

let nextReqId = 10000
const nextReq = () => nextReqId++

class Bridge {
  constructor (com) {
    this.com = com
    // This is a ref map used so Python can call back JS APIs
    this.jrefs = {}

    // We don't want to GC things individually, so batch all the GCs at once
    // to Python
    this.freeable = []
    this.loop = setInterval(this.runTasks, 1000)

    // This is called on GC
    this.finalizer = new FinalizationRegistry(ffid => {
      this.freeable.push(ffid)
      // Once the Proxy is freed, we also want to release the pyClass ref
      try { delete this.jsi.m[ffid] } catch {}
    })

    this.jsi = new JSBridge(null, this)
    this.jsi.ipc = {
      send: async req => {
        this.com.write(req)
      },
      makePyObject: ffid => this.makePyObject(ffid)
    }
    this.com.register('jsi', this.jsi.onMessage.bind(this.jsi))
  }

  runTasks = () => {
    if (this.freeable.length) this.free(this.freeable)
    this.freeable = []
  }

  end () {
    clearInterval(this.loop)
  }

  request (req, cb) {
    // When we call Python functions with Proxy paramaters, we need to just send the FFID
    // so it can be mapped on the python side.
    this.com.write(req, cb)
  }

  async len (ffid, stack) {
    const req = { r: nextReq(), action: 'length', ffid: ffid, key: stack, val: '' }
    const resp = await waitFor(cb => this.request(req, cb), REQ_TIMEOUT, () => {
      throw new BridgeException(`Attempt to access '${stack.join('.')}' failed.`)
    })
    if (resp.key === 'error') throw new PythonException(stack, resp.sig)
    return resp.val
  }

  async get (ffid, stack, args, suppressErrors) {
    const req = { r: nextReq(), action: 'get', ffid: ffid, key: stack, val: args }

    const resp = await waitFor(cb => this.request(req, cb), REQ_TIMEOUT, () => {
      throw new BridgeException(`Attempt to access '${stack.join('.')}' failed.`)
    })
    if (resp.key === 'error') {
      if (suppressErrors) return undefined
      throw new PythonException(stack, resp.sig)
    }
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

  async call (ffid, stack, args, kwargs, set, timeout) {
    const made = {}
    const r = nextReq()
    const req = { r, action: set ? 'setval' : 'pcall', ffid: ffid, key: stack, val: [args, kwargs] }
    // The following serializes our arguments and sends them to Python.
    // When we provide FFID as '', we ask Python to assign a new FFID on
    // its side for the purpose of this function call, then to return
    // the number back to us
    const payload = JSON.stringify(req, (k, v) => {
      if (!k) return v
      if (v && !v.r) {
        if (v instanceof PyClass) {
          const r = nextReq()
          made[r] = v
          return { r, ffid: '', extend: v.pyffid }
        }
        if (v.ffid) return { ffid: v.ffid }
        if (
          typeof v === 'function' ||
          (typeof v === 'object' && (v.constructor.name !== 'Object' && v.constructor.name !== 'Array'))
        ) {
          const r = nextReq()
          made[r] = v
          return { r, ffid: '' }
        }
      }
      return v
    })

    const resp = await waitFor(resolve => this.com.writeRaw(payload, r, pre => {
      if (pre.key === 'pre') {
        for (const r in pre.val) {
          const ffid = pre.val[r]
          // Python is the owner of the memory, we borrow a ref to it and once
          // we're done with it (GC'd), we can ask python to free it
          if (made[r] instanceof Promise) throw Error('You did not await a paramater when calling ' + stack.join('.'))
          this.jsi.m[ffid] = made[r]
          this.queueForCollection(ffid, made[r])
        }
        return true
      } else {
        resolve(pre)
      }
    }), timeout || REQ_TIMEOUT, () => {
      throw new BridgeException(`Attempt to access '${stack.join('.')}' failed.`)
    })
    if (resp.key === 'error') throw new PythonException(stack, resp.sig)

    if (set) {
      return true // Do not allocate new FFID if setting
    }

    log('call', ffid, stack, args, resp)
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

  async value (ffid, stack) {
    const req = { r: nextReq(), action: 'value', ffid: ffid, key: stack, val: '' }
    const resp = await waitFor(cb => this.request(req, cb), REQ_TIMEOUT, () => {
      throw new BridgeException(`Attempt to access '${stack.join('.')}' failed.`)
    })
    if (resp.key === 'error') throw new PythonException(stack, resp.sig)
    return resp.val
  }

  async inspect (ffid, stack) {
    const req = { r: nextReq(), action: 'inspect', ffid: ffid, key: stack, val: '' }
    const resp = await waitFor(cb => this.request(req, cb), REQ_TIMEOUT, () => {
      throw new BridgeException(`Attempt to access '${stack.join('.')}' failed.`)
    })
    if (resp.key === 'error') throw new PythonException(stack, resp.sig)
    return resp.val
  }

  async free (ffids) {
    const req = { r: nextReq(), action: 'free', ffid: '', key: '', val: ffids }
    this.request(req)
    return true
  }

  queueForCollection (ffid, val) {
    this.finalizer.register(val, ffid)
  }

  /**
   * This method creates a Python class which proxies overriden entries on the
   * on the JS side over to JS. Conversely, in JS when a property access
   * is performed on an object that doesn't exist, it's sent to Python.
   */
  async makePyClass (inst, name, props) {
    const req = { r: nextReq(), action: 'makeclass', ffid: '', key: name, val: props }
    const resp = await waitFor(cb => this.request(req, cb), 500, () => {
      throw new BridgeException(`Attempt to create '${name}' failed.`)
    })
    if (resp.key === 'error') throw new PythonException([name], resp.sig)
    // Python puts a new proxy into its Ref map, we get a ref ID to its one.
    // We don't put ours into our map; allow normal GC on our side and once
    // it is, it'll be free'd in the Python side.
    this.jsi.addWeakRef(inst, resp.val[0])
    // Track when our class gets GC'ed so we can erase it on the Python side
    this.queueForCollection(resp.val[0], inst)
    // Return the Python instance - when it gets freed, the
    // other ref on the python side is also free'd.
    return [resp.val[1], this.makePyObject(resp.val[1], resp.sig)]
  }

  makePyObject (ffid, inspectString) {
    const self = this
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
        if (prop === 'toJSON') return () => ({ ffid })
        if (prop === 'toString' && inspectString) return target[prop]
        if (prop === 'then') {
          // Avoid .then loops
          if (!next.callstack.length) {
            return undefined
          }
          return (resolve, reject) => {
            const suppressErrors = next.callstack[next.callstack.length - 1].endsWith?.('$')
            if (suppressErrors) {
              next.callstack.push(next.callstack.pop().replace('$', ''))
            }
            this.get(ffid, next.callstack, [], suppressErrors).then(resolve).catch(reject)
            next.callstack = [] // Empty the callstack afer running fn
          }
        }
        if (prop === 'length') return this.len(ffid, next.callstack, [])
        if (typeof prop === 'symbol') {
          if (prop === Symbol.iterator) {
            // This is just for destructuring arrays
            return function *iter () {
              for (let i = 0; i < 100; i++) {
                const next = new Intermediate([...target.callstack, i])
                yield new Proxy(next, handler)
              }
              throw SyntaxError('You must use `for await` when iterating over a Python object in a for-of loop')
            }
          }
          if (prop === Symbol.asyncIterator) {
            return async function *iter () {
              const it = await self.call(0, ['Iterate'], [{ ffid }])
              while (true) {
                const val = await it.Next()
                if (val === '$$STOPITER') {
                  return
                } else {
                  yield val
                }
              }
            }
          }
          log('Get symbol', next.callstack, prop)
          return
        }
        if (Number.isInteger(parseInt(prop))) prop = parseInt(prop)
        next.callstack.push(prop)
        return new Proxy(next, handler) // no $ and not fn call, continue chaining
      },
      apply: (target, self, args) => { // Called for function call
        const final = target.callstack[target.callstack.length - 1]
        let kwargs, timeout
        if (final === 'apply') {
          target.callstack.pop()
          args = [args[0], ...args[1]]
        } else if (final === 'call') {
          target.callstack.pop()
        } else if (final?.endsWith('$')) {
          kwargs = args.pop()
          timeout = kwargs.$timeout
          delete kwargs.$timeout
          target.callstack[target.callstack.length - 1] = final.slice(0, -1)
        } else if (final === 'valueOf') {
          target.callstack.pop()
          const ret = this.value(ffid, [...target.callstack])
          return ret
        } else if (final === 'toString') {
          target.callstack.pop()
          const ret = this.inspect(ffid, [...target.callstack])
          return ret
        }
        const ret = this.call(ffid, target.callstack, args, kwargs, false, timeout)
        target.callstack = [] // Flush callstack to py
        return ret
      },
      set: (target, prop, val) => {
        if (Number.isInteger(parseInt(prop))) prop = parseInt(prop)
        const ret = this.call(ffid, [...target.callstack], [prop, val], {}, true)
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
        return inspectString || "(Some Python object) Use `await object.toString()` to get this object's repr()."
      }

      toString () {
        return inspectString || '(Some Python object)'
      }
    }
    return new Proxy(new CustomLogger(), handler)
  }
}

module.exports = { PyClass, Bridge }
