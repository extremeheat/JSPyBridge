const cp = require('child_process')
const { join } = require('path')
const WS = typeof WebSocket === 'undefined' ? require('ws') : WebSocket

const log = process.env.DEBUG ? console.log : () => {}

class StdioCom {
  constructor (ver = 3) {
    this.python = ver === 3 ? 'python3' : 'python2'
    this.handlers = {}
    this.sendQ = []
    this.start()
  }

  async start () {
    this.proc = cp.spawn?.(this.python, [join(__dirname, 'ws.py')], { stdio: ['inherit', 'inherit', 'inherit'] })

    this.sock = new WS('ws://127.0.0.1:8768/')
    const onMessage = message => {
        const j = JSON.parse(message)
        if (j.c === 'stderr') {
            console.log('PyE', message.val)
        } else if (j.c == 'stdout') {
            console.log('PyO', message.val)
        } else {
            this.recieve(j)
        }
    }
    const onOpen = () => {
        for (const q of this.sendQ) {
            this.sock.send(q)
        }
    }
    this.sock.on?.('message', onMessage)
    this.sock.onmessage = message => onMessage(message.data)
    this.sock.on?.('open', onOpen)
    this.sock.onopen = onOpen

    this.proc?.on('error', console.warn)
  }

  end () {
    this.proc?.kill()
    this.sock.close()
  }

  recieve (j) {
    log('[py -> js]', j)
    if (this.handlers[j.c]) {
      return this.handlers[j.c](j)
    }
    if (this.handlers[j.r]) {
      if (this.handlers[j.r](j)) {
        return
      }
      delete this.handlers[j.r]
    }
  }

  register (eventId, cb) {
    this.handlers[eventId] = cb
  }

  write (what, cb) {
    log('[js -> py]', what)
    const fb = JSON.stringify(what)
    if (!this.sock) this.sendQ.push(fb)
    else this.sock.send(fb)
    this.register(what.r, cb)
  }

  writeRaw (what, r, cb) {
    log('[js -> py]', what)
    if (!this.sock) this.sendQ.push(what)
    else this.sock.send(what)
    this.register(r, cb)
  }
}

module.exports = { StdioCom }