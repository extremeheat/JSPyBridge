/* eslint-env mocha */
const assert = require('assert')
const cp = require('child_process')
const fs = require('fs')
const d = __dirname

it('runs test', function () {
  const ret = cp.execSync(`python3 ${d}/../src/test.py`)
  console.warn(JSON.stringify(String(ret)), '\n')
  const actual = String(ret).replace(/\r/g, '')
  const expect = "Hello world!\n5 [ [], 5, 6, 7, 8, { a: 3 } ] []\ncallback from JS (Some Python object)\n6\nwow\n123!\nHello  world\ni []\ni 5\ni 6\ni 7\ni 8\ni { a: 3 }\nCallback called with ('It works !',)\nDemo array and object [ 1, 5, 3 ] { '1': 5, '2': (Some Python object), a: 'ay', b: 'be', c: 'ce' }\nOK, captured error\nArray [1, 5, 3]\nHandler caled [Function (anonymous)] 4 {'a': {'y': 5}}\nHey, I'm only called once !\nHandler caled [Function (anonymous)] 5 {'a': {'y': 6}}\nHandler caled [Function (anonymous)] 6 {'a': {'y': 7}}\nHandler caled [Function (anonymous)] 7 {'a': {'y': 8}}\nOK, we can now exit\n".replace(/\r/g, '')
  assert.strictEqual(actual, expect)
  assert(fs.existsSync('./HelloWorld.txt'))
  fs.unlinkSync('./HelloWorld.txt')
})
