const util = require('util')

const debug = process.env.DEBUG?.includes('jspybridge') ? console.debug : () => {}

function getType (obj) {
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
  constructor (ipc) {
    // This is an ID that increments each time a new object is returned
    // to Python.
    this.ffid = 0
    // This contains a refrence map of FFIDs to JS objects.
    // TODO: figure out gc, maybe weakmaps
    this.m = {
      0: {
        console,
        require
      }
    }
    this.ipc = ipc

    if (process.env.DEBUG) {
      Object.assign(this.m[0], require('./test'))
    }

    // ipc.on('message', this.onMessage)
  }

  async get (r, ffid, attr) {
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
  init (r, ffid, attr, args) {
    this.m[++this.ffid] = new this.m[ffid][attr](...args)
    this.ipc.send({ r, key: 'obj', val: this.ffid })
  }

  // Call function with async keyword (also works with sync funcs)
  async call (r, ffid, attr, args) {
    debug('call', r, args)
    const v = this.m[++this.ffid] = await this.m[ffid][attr](...args)
    const type = getType(this.m[this.ffid])
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
  async inspect (r, ffid) {
    const s = util.inspect(await this.m[ffid])
    this.ipc.send({ r, val: s })
  }

  // for __dict__ in python (used in json.dumps)
  async serialize (r, ffid) {
    const s = JSON.stringify(await this.m[ffid])
    this.ipc.send({ r, val: s })
  }

  free (r, ffid) {
    delete this.m[ffid]
    this.ipc.send({ r, val: true })
  }

  onMessage ({ r, action, ffid, key, args }) {
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
  }
}

const ipc = {
  send: data => {
    debug('js -> py', data)
    data.ts = Date.now()
    process.stderr.write(JSON.stringify(data) + '\n')
  }
}

const bridge = new Bridge(ipc)
process.stdin.on('data', data => {
  const d = String(data)
  debug('py -> js', d)
  for (const line of d.split('\n')) {
    try { var j = JSON.parse(line) } catch (e) { continue } // eslint-disable-line
    bridge.onMessage(j)
  }
})

process.on('exit', () => {
  debug('** Node exiting')
})
