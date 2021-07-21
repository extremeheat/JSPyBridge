/* eslint-env mocha */
const assert = require('assert')
const cp = require('child_process')
const fs = require('fs')
const d = __dirname

it('runs test', function () {
  this.timeout(5000)
  const ret = cp.execSync(`python3 ${d}/../src/test.py`)
  console.warn(JSON.stringify(String(ret)), '\n')
  const actual = String(ret).replace(/\r/g, '')
  const expect = "Hello world!\n5 [ [], 5, 6, 7, 8, { a: 3 } ] []\ncallback from JS (Some Python object)\nwrapped fn 3\n6\r\nwow\r\n123!\r\nHello  world\r\ni []\r\ni 5\r\ni 6\r\ni 7\r\ni 8\r\ni { a: 3 }\r\nCallback called with ('It works !',)\r\nDemo array and object [ 1, 5, 3 ] { '1': 5, '2': (Some Python object), a: 'ay', b: 'be', c: 'ce' }\r\nOK, captured error\r\nArray [1, 5, 3]\r\nHandler caled [Function (anonymous)] 4 {'a': {'y': 5}}\r\nHey, I'm only called once !\r\nHandler caled [Function (anonymous)] 5 {'a': {'y': 6}}\r\nHandler caled [Function (anonymous)] 6 {'a': {'y': 7}}\r\nHandler caled [Function (anonymous)] 7 {'a': {'y': 8}}\r\n2\r\nMy var {'var': 5, 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9}\r\nOK, we can now exit\r\n".replace(/\r/g, '')
  assert.strictEqual(actual, expect)
  assert(fs.existsSync('./HelloWorld.txt'))
  fs.unlinkSync('./HelloWorld.txt')
})
