if (typeof process !== 'undefined' && parseInt(process.versions.node.split('.')[0]) < 14) {
  console.error('Your node version is currently', process.versions.node)
  console.error('Please update it to a version >= 14.x.x from https://nodejs.org/')
  process.exit(1)
}
/**
 * The JavaScript Interface for Python
 */
const util = require('util')
const { PyBridge } = require('./pyi')
const { $require } = require('./deps')
const { once } = require('events')

const debug = process.env.DEBUG?.includes('jspybridge') ? console.debug : () => { }
const supportsColors = process.env.FORCE_COLOR !== '0'

function getType (obj) {
  if (obj?.ffid) return 'py'
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
  if (obj === null) return 'void'
  if (typeof obj === 'object') return 'obj'
  if (!isNaN(obj)) return 'num'
  if (typeof obj === 'string') return 'string'
}

class Bridge {
  constructor (ipc) {
    // This is an ID that increments each time a new object is returned
    // to Python.
    this.ffid = 0
    // This contains a refrence map of FFIDs to JS objects.
    this.m = {
      0: {
        console,
        require: $require,
        _require: require,
        globalThis,
        RegExp,
        once,
        needsNodePatches: () => {
          const [major, minor] = process.versions.node.split('.')
          if ((major == 14 && minor < 17) || (major == 15)) { // eslint-disable-line
            return true
          }
          return false
        },
        async evaluateWithContext ($block, $locals) {
          const $variables = Object.keys($locals)
          const $inputs = $variables.map(v => `$locals["${v}"]`)
          const $code = ($block.split('\n').length === 1 && !$block.includes('return ')) ? 'return ' + $block : $block
          const $finalCode = `(async (${$variables.join(', ')}) => { ${$code} })(${$inputs.join(', ')})`
          return await eval($finalCode)
        }
      }
    }
    this.ipc = ipc
    this.pyi = new PyBridge(this.ipc, this)
    this.eventMap = {}

    // ipc.on('message', this.onMessage)
  }

  addWeakRef (object, ffid) {
    const weak = new WeakRef(object)
    Object.defineProperty(this.m, ffid, {
      get () {
        return weak.deref()
      }
    })
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
        this.m[++this.ffid] = v
        return this.ipc.send({ r, key: 'class', val: this.ffid })
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
      case 'py': return this.ipc.send({ r, key: 'py', val: v.ffid })
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
  async inspect (r, ffid, mode) {
    const colors = supportsColors && (mode === 'str')
    const s = util.inspect(await this.m[ffid], { colors })
    this.ipc.send({ r, val: s })
  }

  // for __dict__ in python (used in json.dumps)
  async serialize (r, ffid) {
    const v = await this.m[ffid]
    this.ipc.send({ r, val: v.valueOf() })
  }

  async blob (r, ffid) {
    const v = await this.m[ffid]
    this.ipc.sendBlob(v, r)
  }

  async keys (r, ffid) {
    const v = await this.m[ffid]
    const keys = Object.getOwnPropertyNames(v)
    this.ipc.send({ r, keys })
  }

  free (r, ffid, attr, args) {
    for (const id of args) {
      delete this.m[id]
    }
  }

  process (r, args) {
    const made = {}
    let madeCount = 0
    const parse = input => {
      if (typeof input !== 'object') return
      for (const k in input) {
        const v = input[k]
        if (v && typeof v === 'object') {
          if (v.r && v.ffid === '') {
            ++this.ffid
            const proxy = this.pyi.makePyObject(this.ffid)
            this.m[this.ffid] = proxy
            made[input[k].r] = this.ffid
            input[k] = proxy
            madeCount++
          } else if (v.ffid) {
            input[k] = this.m[v.ffid]
          } else {
            parse(v)
          }
        } else {
          parse(v)
        }
      }
    }
    parse(args)
    // We only need to reply if we made some Proxies
    if (madeCount) this.ipc.send({ r, key: 'pre', val: made })
  }

  async onMessage ({ r, action, p, ffid, key, args }) {
    // console.debug('onMessage!', arguments, r, action)
    try {
      if (p) {
        this.process(r + 1, args)
      }
      await this[action](r, ffid, key, args)
    } catch (e) {
      return this.ipc.send({ r, key: 'error', error: e.stack })
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
    process.stderr.write(JSON.stringify(data) + '\n')
  },
  sendBlob: (data, r) => {
    process.stderr.write('blob!{"r":' + r + ',"len":' + data.length + '}!')
    process.stderr.write(data)
    process.stderr.write('\n')
  },
  writeRaw: (data, r, cb) => {
    debug('js -> py', data)
    handlers[r] = cb
    process.stderr.write(data + '\n')
  },
  write (data, cb) {
    handlers[data.r] = cb
    this.send(data)
  }
}

const bridge = new Bridge(ipc)
let message = ''
process.stdin.on('data', data => {
  const d = String(data)
  for (let i = 0; i < d.length; i++) {
    if (d[i] === '\n') {
      debug('py -> js', message)
      for (const line of message.split('\n')) {
        try { var j = JSON.parse(line) } catch (e) { continue } // eslint-disable-line
        if (j.c === 'pyi') {
          const handler = handlers[j.r]
          if (handler) {
            handler(j)
            delete handlers[j.r]
          }
        } else {
          bridge.onMessage(j)
        }
      }
      message = ''
    } else {
      message += d[i]
    }
  }
})

// flush last line
process.stdin.on('end', () => {
  if (message.length > 0) {
    debug('py -> js', message)
    for (const line of message.split('\n')) {
        try { var j = JSON.parse(line) } catch (e) { continue } // eslint-disable-line
      if (j.c === 'pyi') {
        const handler = handlers[j.r]
        if (handler) {
          handler(j)
          delete handlers[j.r]
        }
      } else {
        bridge.onMessage(j)
      }
    }
  }
})

process.on('exit', () => {
  debug('** Node exiting')
})
// console.log('JS Started!')
