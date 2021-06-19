const cp = require('child_process')

// function serialize(key, val) {
//   console.log('ser',key,val)
//   if (val?.ffid) {
//     return { ffid: val.ffid }
//   }
//   return val
// }

class StdioCom {
  constructor (ver = 3) {
    this.python = ver === 3 ? 'python3' : 'python2'
    this.handlers = {}
    this.start()
  }

  start () {
    this.proc = cp.spawn(this.python, ['Bridge.py'])
    this.proc.stderr.on('data', buf => {
      const data = String(buf)
      console.log('py>js data', data)
      // returnx
      for (const line of data.split('\n')) {
        let recv = line
        try {
          if (line.startsWith('{')) {
            recv = JSON.parse(line)
          }
        } catch {}
        this.recieve(recv)
      }
    })
    this.proc.stdout.pipe(process.stdout)
  }

  recieve (j) {
    if (typeof (j) === 'object') {
      console.log('[py -> js]', j)
      this.handlers[j.r]?.(j)
      delete this.handlers[j.r]
    } else {
      console.warn('[PyE]', j)
    }
  }

  register (eventId, cb) {
    this.handlers[eventId] = cb
  }

  write (what, cb) {
    console.log('[js -> py]', what)
    const fb = JSON.stringify(what)
    console.log('fb', fb)
    this.proc.stdin.write(fb + '\n')
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
