/* eslint-env mocha */
const assert = require('assert')
const cp = require('child_process')
const fs = require('fs')
const d = __dirname

process.env.DEBUG = 'bridge'

it('runs test', function () {
  const ret = cp.execSync(`python3 ${d}/../src/test.py`)
  assert.strictEqual(String(ret), 'Hello world!\n5\n')
  assert(fs.existsSync('./HelloWorld.txt'))
  fs.unlinkSync('./HelloWorld.txt')
})
