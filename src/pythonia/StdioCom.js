const cp = require('child_process')
const { join } = require('path')

const log = process.env.DEBUG ? console.log : () => {}

class StdioCom {
  constructor () {
    this.start()
  }

  start () {
    this.handlers = {}
    const args = [join(__dirname, 'interface.py')]
    const stdio = process.versions.electron ? 'pipe' : ['pipe', 'inherit', 'pipe']
    try {
      this.proc = cp.spawn(process.env.PYTHON_BIN || 'python3', args, { stdio })
    } catch (e) {
      if (e.code === 'ENOENT' && !process.env.PYTHON_BIN) this.proc = cp.spawn('python', args, { stdio })
      else throw e
    }
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
    if (process.versions.electron) this.proc.stdout.pipe(process.stdout)
  }

  end () {
    this.proc.kill()
    this.proc = null
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
    if (cb) this.register(what.r, cb)
  }

  writeRaw (what, r, cb) {
    log('[js -> py]', what)
    this.proc.stdin.write(what + '\n')
    this.register(r, cb)
  }
}

module.exports = { StdioCom }
