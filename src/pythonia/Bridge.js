const { StdioCom } = require('./StdioCom')
const util = require('util')

const REQ_TIMEOUT = 10000

class BridgeException extends Error {
  constructor (...a) {
    super(...a)
    this.message += ` Python didn't respond in time (${REQ_TIMEOUT}ms), look above for any Python errors. If no errors, the API call hung.`
    // We'll fix the stack trace once this is shipped.
  }
}

async function waitFor (cb, withTimeout, onTimeout) {
  let t
  const ret = await Promise.race([
    new Promise(resolve => cb(resolve)),
    new Promise(resolve => { t = setTimeout(() => resolve('timeout'), withTimeout) })
  ])
  clearTimeout(t)
  if (ret === 'timeout') onTimeout()
  return ret
}

class Bridge {
  constructor (com) {
    this.com = com
    // This is called on GC
    this.finalizer = new FinalizationRegistry(ffid => {
      this.free(ffid)
    })
  }

  request (req, cb) {
    // When we call Python functions with Proxy paramaters, we need to just send the FFID
    // so it can be mapped on the python side.
    const nval = []
    for (const val of req.val) {
      if (val.ffid) {
        nval.push({ ffid: val.ffid })
      } else {
        nval.push(val)
      }
    }
    req.val = nval
    this.com.write(req, cb)
  }

  async len (ffid, stack) {
    const req = { r: Date.now(), action: 'len', ffid: ffid, key: stack, val: '' }
    const resp = await waitFor(cb => this.request(req, cb), REQ_TIMEOUT, () => {
      throw new BridgeException(`Attempt to access ${stack.join('.')}, failed.`)
    })
    return resp.val
  }

  async get (ffid, stack, args) {
    const req = { r: Date.now(), action: 'get', ffid: ffid, key: stack, val: args }

    const resp = await waitFor(cb => this.request(req, cb), REQ_TIMEOUT, () => {
      throw new BridgeException(`Attempt to access ${stack.join('.')}, failed.`)
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

  async call (ffid, stack, args) {
    const req = { r: Date.now(), action: 'call', ffid: ffid, key: stack, val: args }
    const resp = await waitFor(cb => this.request(req, cb), REQ_TIMEOUT, () => {
      throw new BridgeException(`Attempt to access ${stack.join('.')}, failed.`)
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

  async inspect (ffid, stack) {
    const req = { r: Date.now(), action: 'inspect', ffid: ffid, key: stack, val: '' }
    const resp = await waitFor(cb => this.request(req, cb), REQ_TIMEOUT, () => {
      throw new BridgeException(`Attempt to access ${stack.join('.')}, failed.`)
    })
    return resp.val
  }

  async free (ffid) {
    const req = { r: Date.now(), action: 'free', ffid: ffid, key: '', val: '' }
    const resp = await waitFor(cb => this.request(req, cb), REQ_TIMEOUT, () => {
      throw new BridgeException('Attempt to GC failed.')
    })
    return resp.val
  }

  queueForCollection (ffid, val) {
    this.finalizer.register(val, ffid)
  }

  makePyObject (ffid, inspectString) {
    let callstack = []
    function You_must_use_await_when_calling_python_APIs () {} // eslint-disable-line
    const handler = {
      get: (target, prop, reciever) => {
        if (prop === 'ffid') return ffid
        if (prop === 'then') {
          // Avoid .then loops
          if (!callstack.length) {
            return undefined
          }
          return (resolve, reject) => {
            this.get(ffid, callstack, []).then(resolve).catch(reject)
            callstack = [] // Empty the callstack afer running fn
          }
        }
        if (prop === 'length') {
          return this.len(ffid)
        } else if (prop.endsWith('$')) { // stop returning Proxy chain, call python
          callstack.push(prop.slice(0, -1))
          console.log('Getting method attr', callstack.join('.'))
          return this.get(ffid, callstack, [])
        }
        callstack.push(prop)
        return new Proxy(You_must_use_await_when_calling_python_APIs, handler) // no $ and not fn call, continue chaining
      },
      apply: (target, self, args) => { // Called for function call
        const ret = this.call(ffid, callstack, args)
        callstack = [] // Flush callstack to py
        return ret
      }
    }
    class CustomLogger extends Function {
      [util.inspect.custom] () {
        return inspectString || '(Some Python object)'
      }
    }
    return new Proxy(new CustomLogger(), handler)
  }
}

async function work () {
  const com = new StdioCom()
  const bridge = new Bridge(com)
  const root = bridge.makePyObject(0)

  const demoClass = await root.demo(2)
  const demoClass2 = await root.demo(3)

  const added = await root.add(demoClass, demoClass2)

  const proxy = await root.add
  console.log('Added', added)

  console.log('add', proxy)

  // console.log('Numpy:\n', await root.python('numpy'))

  // const n = await demoClass.nested()
  // console.log('Numpy====:\n')
  console.log(await demoClass.nested)

  // console.log('Demo', demoClass)
  // const py = await root.python('math')
  // console.log('RES', await py.ceil(3.1415))
  // console.log('yello')
  com.proc.kill()
}

work().then(() => {
  setTimeout(() => {
    console.log('DOne!')
  }, 9000)
})
