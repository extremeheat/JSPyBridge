/* eslint-env mocha */
const assert = require('assert')
const cp = require('child_process')
const fs = require('fs')
const d = __dirname

process.env.DEBUG = 'bridge'

it('runs test', function () {
  this.timeout(2000)
  const ret = cp.execSync(`python3 ${d}/../src/test.py`)
  console.warn(JSON.stringify(String(ret)), '\n')
  assert.strictEqual(String(ret), `Hello world!\n5 [ [], 5, 6, 7, 8, { a: 3 } ] []\ncallback from JS (Some Python object)\n{\"a\": {\"ffid\": 3}, \"b\": 3}\ni []\ni 5\ni 6\ni 7\ni 8\ni { a: 3 }\nCallback called with ('It works !',)\nOK, captured error\nIncrement 4 5\nHandler caled [Function (anonymous)] 4 {'a': {'y': 5}}\nIncrement 5 6\nHandler caled [Function (anonymous)] 5 {'a': {'y': 6}}\nIncrement 6 7\nHandler caled [Function (anonymous)] 6 {'a': {'y': 7}}\nIncrement 7 8\nHandler caled [Function (anonymous)] 7 {'a': {'y': 8}}\n`)
  assert(fs.existsSync('./HelloWorld.txt'))
  fs.unlinkSync('./HelloWorld.txt')
})
