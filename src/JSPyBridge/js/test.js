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
    }, 150)
  }

  get () {
    return this.y
  }

  array () {
    return [[], 5, 6, 7, 8, { a: this.y }]
  }

  async other (clas) {
    return (await clas.y) + 2
  }

  moreComplex () {
    return () => 3
  }

  async callback (cb) {
    console.log('callback from JS', cb)
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
}

module.exports = { DemoClass }
