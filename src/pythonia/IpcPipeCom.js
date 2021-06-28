const cp = require('child_process')
const { join } = require('path')

const log = process.env.DEBUG ? console.log : () => {}

// TODO: are dangling handlers an issue?
class StdioCom {
  constructor (ver = 3) {
    this.python = ver === 3 ? 'python3' : 'python2'
    this.handlers = {}
    this.start()
  }

  start () {
    this.proc = cp.spawn(this.python, [join(__dirname, 'interface.py')], { stdio: ['ignore', 'pipe', 'inherit', 'ipc'] })
    this.proc.on('message', data => {
      log('py>js data', data)
      this.recieve(data)
    })
    this.proc.on('error', console.warn)
  }

  end () {
    this.proc.kill()
  }

  recieve (j) {
    log('[py -> js]', j)
    if (this.handlers[j.c]) {
      return this.handlers[j.c](j)
    }
    this.handlers[j.r]?.(j)
    // console.log(this.handlers)
    delete this.handlers[j.r]
  }

  register (eventId, cb) {
    this.handlers[eventId] = cb
  }

  write (what, cb) {
    log('[js -> py]', what)
    this.proc.send(what)
    this.register(what.r, cb)
  }
}

module.exports = { StdioCom }

// class Bridge {
//   outbound = []

//   constructor(com) {
//     this.com = com
//   }

//   request(req, cb) {
//     this.com.write(req, cb)
//   }
// }

// // Proxy is an "exotic object" that cannot be extended

// class ChainPromise extends Promise {

// }

// function PyObject() {
//   const handler = {
//     async get(target, key, reciever) {
//       const chain = new ChainPromise()
//       return new Proxy(chain, {
//         get(t, k) {

//         }
//       })
//     }
//   }
//   return new Proxy({}, handler)
// }

// const PyObject = {}
