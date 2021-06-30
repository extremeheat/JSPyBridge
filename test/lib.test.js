/* eslint-env mocha */
const assert = require('assert')
const cp = require('child_process')
const fs = require('fs')
const d = __dirname

process.env.DEBUG = 'bridge'

it('runs test', function () {
  const ret = cp.execSync(`python3 ${d}/../src/test.py`)
  console.warn(JSON.stringify(String(ret)), '\n')
  assert.strictEqual(String(ret), `Hello world!\n5 [ [], 5, 6, 7, 8, { a: 3 } ] []\ncallback from JS (Some Python object)\ni []\r\ni 5\r\ni 6\r\ni 7\r\ni 8\r\ni { a: 3 }\r\nCallback called with ('It works !',)\r\nOK, captured error\r\nIncrement 4 5\r\nHandler caled [Function (anonymous)] 4 {'a': {'y': 5}}\r\nIncrement 5 6\r\nHandler caled [Function (anonymous)] 5 {'a': {'y': 6}}\r\nIncrement 6 7\r\nHandler caled [Function (anonymous)] 6 {'a': {'y': 7}}\r\nIncrement 7 8\r\nHandler caled [Function (anonymous)] 7 {'a': {'y': 8}}\r\n`)
  assert(fs.existsSync('./HelloWorld.txt'))
  fs.unlinkSync('./HelloWorld.txt')
})
