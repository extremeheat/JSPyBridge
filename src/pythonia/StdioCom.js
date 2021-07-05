const cp = require('child_process')
const { join } = require('path')

const log = process.env.DEBUG ? console.log : () => {}

class StdioCom {
  constructor (ver = 3) {
    this.python = ver === 3 ? 'python3' : 'python2'
    this.handlers = {}
    this.start()
  }

  start () {
    this.proc = cp.spawn(this.python, [join(__dirname, 'interface.py')], { stdio: ['pipe', 'inherit', 'pipe'] })
    this.proc.stderr.on('data', buf => {
      const data = String(buf)
      for (const line of data.split('\n')) {
        let recv = line
        try {
          if (line.startsWith('{"r"')) {
            recv = JSON.parse(line)
            this.recieve(recv)
          } else if (line) {
            console.warn('[PyE]', line)
          }
        } catch {
          console.warn('[PyE]', line)
        }
      }
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
    this.proc.stdin.write(fb + '\n')
    this.register(what.r, cb)
  }

  writeRaw (what, r, cb) {
    log('[js -> py]', what)
    this.proc.stdin.write(what + '\n')
    this.register(r, cb)
  }
}

module.exports = { StdioCom }
