const { EventEmitter } = require('events')

class DemoClass extends EventEmitter {
  constructor (color, { a }) {
    super()
    this.color = color
    this.y = a
    this.arr = [1, 2, 3]
    this.obj = { a: 'ay', b: 'be', c: 'ce' }
  }

  increment () {
    this.y++
    setInterval(() => {
      this.emit('increment', () => 3, this.y++, { a: { y: this.y } })
    }, 20)
  }

  get () {
    return this.y
  }

  array () {
    return [[], 5, 6, 7, 8, { a: this.y }]
  }

  object () {
    return { x: 2, y: 3, z: 1 }
  }

  async other (clas) {
    return (await clas.y) + 2
  }

  moreComplex () {
    return () => 3
  }

  async callback (cb) {
    const { python } = globalThis.JSPyBridge
    const numpy = await python('math')
    console.log('callback from JS', cb, await numpy.sqrt(9))
    await cb('It works !')
  }

  complex () {
    return {
      y: () => 2,
      x: 3
    }
  }

  error () {
    throw Error('This should fail')
  }

  ok () {
    function someMethod (a, b, c) {
      return a + b + c
    }
    someMethod.x = 'wow'
    return someMethod
  }

  wait () {
    setTimeout(() => {
      this.emit('done')
    }, 400)
  }

  static hello () {
    return 'world'
  }

  returnNull () {
    return null
  }

  toString () {
    return '123!'
  }
}

module.exports = { DemoClass }
