/* eslint-env mocha */
const assert = require('assert')
const cp = require('child_process')
const fs = require('fs')
const d = __dirname

process.env.DEBUG = 'bridge'

it('runs test', function () {
  const ret = cp.execSync(`python3 ${d}/../src/test.py`)
  // console.warn(JSON.stringify(String(ret)))
  assert.strictEqual(String(ret), 'Hello world!\n5 [ [], 5, 6, 7, 8, { a: 3 } ] []\ni []\ni 5\ni 6\ni 7\ni 8\ni { a: 3 }\n')
  assert(fs.existsSync('./HelloWorld.txt'))
  fs.unlinkSync('./HelloWorld.txt')
})
