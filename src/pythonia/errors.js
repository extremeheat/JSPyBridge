const chalk = require('chalk')
const fs = require('fs')

function formatLine(line) {
  const statements = ['const ', 'await ', 'import ', 'let ', 'var ', 'async ', 'self ', 'def ', 'return ', 'from ', 'for ', ':', '\\(', '\\)', '\\+', '\\-', '\\*', '=']
  const secondary = ['{', '}', "'", ' true', ' false']
  for (const statement of statements) line = line.replace(new RegExp(statement, 'g'), chalk.red(statement.replace('\\', '')) + '')
  for (const second of secondary) line = line.replace(new RegExp(second, 'g'), chalk.blueBright(second) + '')
  return line
}

function printError(failedCall, jsErrorline, jsStacktrace, pyErrorline, pyStacktrace) {
  let lines = []
  const log = (...sections) => lines.push(sections.join(' '))
  log('🐍', chalk.white.bgRedBright.bold(' Python Error '), `Call to '${failedCall.replace('~~', '')}' failed:`)
  log(chalk.dim('>'), formatLine(jsErrorline))

  for (const traceline of jsStacktrace) {
    log(' ', chalk.dim(traceline))
  }

  log('\n... across the bridge ...\n')

  for (const [at, line] of pyStacktrace) {
    if (at.includes('pythonia')) continue
    if (!line) {
      log(' ',chalk.dim(at))
    } else {
      log(chalk.dim('>'), formatLine(line))
      log(' ', chalk.dim(at))
    }
  }
  log('🌉', chalk.bold(pyErrorline))
  return lines
}

function processPyStacktrace(pyTrace) {
  const pyTraceLines = []
  let pyErrorLine = ''
  for (const lin of pyTrace.split('\n')) {
    if (lin.startsWith('  File')) {
      const fname = lin.split('"')[1]
      const line = lin.match(/, line (\d+)/)[1]
      const at = lin.match(/, in (.*)/)?.[1] ?? '^'
      pyTraceLines.push([`at ${at} (${fname}:${line})`])
    } else if (lin.startsWith('    ')) {
      pyTraceLines[pyTraceLines.length - 1]?.push(lin.trim())
    } else if (lin.trim()) {
      pyErrorLine = lin
    }
  }
  return [pyErrorLine, pyTraceLines]
}

function processJSStacktrace(stack, allowInternal) {
  const jsTraceLines = []
  let jsErrorline
  let foundMainLine = false
  for (const line of stack.split('\n')) {
    if (!(line.includes('pythonia') && !allowInternal) && !foundMainLine) {
      const absPath = line.match(/\((.*):(\d+):(\d+)\)/)
      const filePath = line.match(/(file:\/\/.*):(\d+):(\d+)/)
      if (absPath || filePath) {
        const path = absPath || filePath
        let [ fpath, errline, char ] = path.slice(1)
        if (fpath.startsWith('node:')) continue
        const file = fs.readFileSync(fpath.startsWith('file:') ? new URL(fpath) : fpath, 'utf-8')
        const flines = file.split('\n')
        jsErrorline = flines[errline - 1]
        jsTraceLines.push(line.trim())
        foundMainLine = true
      }
    } else if (foundMainLine) {
      jsTraceLines.push(line.trim())
    }
  }
  return jsErrorline ? [jsErrorline, jsTraceLines] : null
}

function getErrorMessage(failedCall, jsStacktrace, pyStacktrace) {
  const [ jse, jss ] = processJSStacktrace(jsStacktrace) || processJSStacktrace(jsStacktrace, true)
  const [ pye, pys ] = processPyStacktrace(pyStacktrace)

  const lines = printError(failedCall, jse, jss, pye, pys)
  return lines.join('\n')
}

module.exports = { getErrorMessage }