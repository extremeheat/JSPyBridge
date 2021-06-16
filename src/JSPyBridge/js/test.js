const { EventEmitter } = require('events')

class DemoClass extends EventEmitter {
  constructor (color, { a }) {
    super()
    this.color = color
    this.y = a
  }

  increment () {
    this.y++
    setInterval(() => {
      this.emit('increment', this.y++, { a: this })
    }, 150)
  }

  get () {
    return this.y
  }

  array () {
    return [[], 5, 6, 7, 8, { a: this.y }]
  }

  other (clas) {
    return clas.y + 2
  }

  moreComplex () {
    return () => 3
  }

  complex () {
    return {
      y: () => 2,
      x: 3
    }
  }
}

module.exports = { DemoClass }
