// TODO: we can add more thorough tests here
class DemoClass {
  constructor (color, { a }) {
    this.color = color
    this.y = a
  }

  increment () {
    this.y++
  }

  get () {
    return this.y
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
