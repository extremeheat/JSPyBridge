/* eslint-env mocha */
const assert = require('assert')
const cp = require('child_process')
const fs = require('fs')
const d = __dirname

process.env.DEBUG = 'bridge'

it('runs test', function () {
  const ret = cp.execSync(`python3 ${d}/../src/test.py`)
  console.warn(JSON.stringify(String(ret)), '\n')
  assert.strictEqual(String(ret), 'Hello \u001b[31mworld!\u001b[39m\n5 [ [], 5, 6, 7, 8, { a: 3 } ] []\ni []\r\ni 5\r\ni 6\r\ni 7\r\ni 8\r\ni { \u001b[94ma\u001b[39m: \u001b[33m3\u001b[39m }\r\nIncrement 4 5\r\nIncrement 5 6\r\nIncrement 6 7\r\nIncrement 7 8\r\n')
  assert(fs.existsSync('./HelloWorld.txt'))
  fs.unlinkSync('./HelloWorld.txt')
})
