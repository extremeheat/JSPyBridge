const assert = require('assert')
const cp = require('child_process')

it ('runs test', function () {
    const ret = cp.execSync(`python3 ${__dirname}/../src/test.py`)
    assert.strictEqual(String(ret), "Hello world!\n5\n")
})

it ('runs test', function () {
    const ret = cp.execSync(`python3 ${__dirname}/../src/test.py`)
    assert.strictEqual(String(ret), "Hello world!\n5\n")
})