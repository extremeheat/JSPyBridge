import { py, python, PyClass }  from '../index.js'
const f = await python('./pyImp.py')
const demo = await python('./demo.py')

async function it (what, fn) {
  console.log('it', what)
  await fn()
}

await it('does function calls', async function () {
  console.log('add inverse', await f.add_inverse(3, 2))
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
    console.log('Message', message, await method())
  }, new MyClas())
})

await it('consumes classes', async function () {
  const { DemoClass, add } = demo
  const demoInst = await DemoClass(3)
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
  console.log(await f.a.prop)
})

// process.exit(0)

python.exit()