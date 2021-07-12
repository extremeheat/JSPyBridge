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
    this.proc = cp.spawn(this.python, [join(__dirname, 'interface.py')], { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] })
    // BAD HACK: since the channel is not exposed, and we need to send JSON with a
    // custom serializer, we basically have two choices:
    // 1) either JSON.stringify it with a custom encoder in our lib, then have it JSON.stringified
    //    *again* in the Node.js standard lib, then unwrapped twice in Python, or
    // 2) use a hack to get the low level IPC API and write raw strings to it.
    // There is no 'string' serialization option for IPC. It's either JSON or 'Advanced' which uses
    // internal V8 serialization APIs; fast but unusable in Python.
    const symbols = Object.getOwnPropertySymbols(this.proc)
    const symbol = symbols.find(sym => sym.toString() === 'Symbol(kChannelHandle)')
    const channel = this.proc[symbol]
    channel._writeUtf8String = channel.writeUtf8String
    let ww
    channel.writeUtf8String = (...a) => {
      ww = a[0].constructor
      channel.writeUtf8String = channel._writeUtf8String
      return channel._writeUtf8String.apply(channel, a)
    }
    this.proc.send('')
    this._writeRaw = data => channel.writeUtf8String(new ww(), data)
    this.proc.on('message', data => {
      this.recieve(data)
    })
    this.proc.on('error', console.warn)
  }

  end () {
    this.proc.kill('SIGKILL')
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
    this.proc.send(what)
    if (cb) this.register(what.r, cb)
  }

  writeRaw (what, r, cb) {
    log('[js -> py]', what)
    this._writeRaw(what + '\n')
    this.register(r, cb)
  }
}

module.exports = { StdioCom }
