if (typeof window !== 'undefined') {
  var { StdioCom } = require('./WebsocketCom')
} else {
  var { StdioCom } = process.platform === 'win32' ? require('./StdioCom') : require('./IpcPipeCom')
}

const { join, resolve } = require('path')
const { PyClass, Bridge } = require('./Bridge')
const getCaller = require('caller')

const com = new StdioCom()
const bridge = new Bridge(com)
globalThis.__pythonBridge = bridge
const root = bridge.makePyObject(0)

async function py (tokens, ...replacements) {
  const vars = {} // List of locals
  let nstr = ''
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    const repl = await replacements[i]
    if (repl != null) {
      const v = '__' + i
      vars[v] = (repl.ffid ? ({ ffid: repl.ffid }) : repl)
      nstr += token + v
    } else {
      nstr += token
    }
  }
  return root.eval(nstr, null, vars)
}

// same as above but with eval instead -- todo: auto fix indent
async function pyExec (tokens, ...replacements) {
  const vars = {} // List of locals
  let nstr = ''
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    const repl = await replacements[i]
    if (repl != null) {
      const v = '__' + i
      vars[v] = (repl.ffid ? ({ ffid: repl.ffid }) : repl)
      nstr += token + v
    } else {
      nstr += token
    }
  }
  return root.exec(nstr, null, vars)
}

py.enumerate = what => root.enumerate(what)
py.tuple = (...items) => root.tuple(items)
py.set = (...items) => root.set(items)
py.exec = pyExec

module.exports = {
  PyClass,
  builtins: root,
  py,
  python (file) {
    if (file.startsWith('/') || file.startsWith('./') || file.startsWith('../') || file.includes(':')) {
      if (file.startsWith('.')) {
        const caller = getCaller(1)
        const prefix = process.platform === 'win32' ? 'file:///' : 'file://'
        const callerDir = caller.replace(prefix, '').split('/').slice(0, -1).join('/')
        file = join(callerDir, file)
      }
      const importPath = resolve(file)
      const fname = file.split('/').pop() || file
      return root.fileImport(fname, importPath)
    }
    return root.python(file)
  },
  com
}
module.exports.python.exit = () => { 
  bridge.end()
  com.end()
} 

if (typeof window !== 'undefined') {
  window.Python = module.exports

  console._log = console.log
  console.log = (...args) => {
    const nargs = []
    for (const arg of args) {
      if (arg.ffid) nargs.push(arg.$$.inspect())
      else nargs.push(arg)
    }
    console._log(...nargs)
  }
}
