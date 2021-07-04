// process.env.DEBUG = 1
import { py, python, PyClass }  from 'JSPyBridge'
import assert from 'assert'
const f = await python('../src/pythonia/test/pyImp.py')
const demo = await python('../src/pythonia/test/demo.py')

// async function it (what, fn) {
//   console.log('it', what)
//   await fn()
// }

await it('does function calls', async function () {
  console.log('ok', await f.add_inverse)
  assert.strictEqual(await f.add_inverse(3, 2), -5)
  const complex = await f.complex_num()
  console.log('complex', complex)
  console.log('real & complex', await complex.real, await complex.imag)
  console.log('FABC - this will fail', f.a.b.c)
})

await it('declares classes', async function () {
  class MyClas extends PyClass {
    constructor() {
      super(demo.DemoClass(4))
    }
    someMethod() {
      return 3
    }
  }
  
  await f.some_event(async (message, method) => {
    // Call a Python function passed as a paramater
    assert.strictEqual(message, 'from python')
    assert.strictEqual(await method(), 3)
    // console.log('Message', message, await method())
  }, new MyClas())
})

await it('consumes classes', async function () {
  const { DemoClass, add } = demo
  const demoInst = await DemoClass(3)
  assert.ok(demoInst)
  console.log(demoInst)
})

await it('catches errors', async function () {
  try {
    await demo.throw()
  } catch (e) {
    console.log('OK!')
  }
})

await it('calls functions with special args', async function () {
  await demo.special$(1, 2, { kwarg1: 3, extra: 77, xx: Math.random() })
})

await it('can add Python numbers', async function () {
  const num = py`3j`
  const num2 = py`2j`
  console.log('3 + 3', await py`3+3 + ${num} + ${num2}`)
})

await it('can set variables', async function () {
  f.x[2] = 4
  console.log(await f.x)
  f.y.b = 'meow'
  console.log(await f.y)
  f.a.prop = 44
  assert.strictEqual(await f.a.prop, 44)
  // console.log(await f.a.prop)
})

await it('can return primitive values', async function () {
  const arr = await f.x.valueOf()
  console.log(arr, typeof arr)
  assert.strictEqual(arr.toString(), '1,2,4')
})

// process.exit(0)

after(() => {
  python.exit()
})