## Iterating

* When you iterate on a Python object, always use `for await` instead of a normal `for-of` loop.
* You can use `py.enumerate` in JS, which works the same as `enumerate()` in Python

## Evaluating Python in JS

Sometimes you need to evalutate Python code in JS, for example when dealing with operator overloading.
This is made simple by the bridge through the `py` template function. Just wrap a Python or JS reference
with a ${} and await the value.

Let's add some matrices ...

```js
const np = await python('numpy')
const x = np.

const A = await np.array(([1,2],[3,4]))
const B = await np.array(([2,2],[2,2]))
const r = await py`${A} + ${B} + ${np.array(([10,10],[10,10]))}`
```

Notice we don't need to await when concatenating here, it's done internally.

## PyClass


You can create a Python class in JavaScript by extending PyClass.

Class variables can exist on both the Python and JavaScript side, however since both sides can access 
variables with the `this` or `self` variable, it doesn't matter where the variable resides. 
However, this can be an performance issue: if you access a variable alot on one side of the bridge,
it's better to have the variable on the same side to avoid briding overhead.


#### constructor(superclass: PythonRef = null, superArguments = [], superKwargs = {})

* The constructor should initialize all the JS properties.
* The constructor is where you specify the Python superclass (if any). You can leave the super() empty or not specify a constructor at all if you don't intend to override anything in Python.
* Any variables you define here will be defined on the JS side, and exposed to Python.
* Your constructor is called *before* the Python class is `__init__`'ed.

#### init()

* The init() method in your class is called after the Python superclass (if any) has been init'ed
* Any variables you define here will exist on the Python side, but you can still access them from JS

#### this

* `this.parent` works like `super.` in normal JS. You can use it to force call a parent to avoid recusion.

calc.py
```py
import math
class Calc:
  def __init__(self, degrees, integers=False):
    self.degrees = degrees
    self.integers = integers

  def add(self, a, b):
    return a + b

  def div(self, a, b):
    if self.integers:
      return round(a / b)
    else:
      return a / b
    
  def tan(self, val):
    if self.degrees:
      # We need to round here because floating points are imprecise
      return round(math.tan(math.radians(val)))
    return math.tan(val)
```

calc.js
```js
import { python, PyClass } from 'pythonia'
const calc = await python('./calc.py')

class MyCalculator extends PyClass {
  constructor() {
    // The second is an array of positional ... `true` maps to degrees. A third arg allows us to specify named arguments.
    // we could also do `super(calc.Calc, null, { degrees: true, integers: false })`
    super(calc.Calc, [true], { integers: false })
  }

  async mul (a, b) { // Multiply the cool way
    let res = a
    for (let i = 1; i < b; i++) {
      res = await this.add(res, b)
    }
    return res
  }

  async div(a, b) {
    // Call the superclass's div()
    const superExample = this.parent.div(a, b)
    return superExample
  }
}


const calculator = await MyCalculator.init()

console.log('3 * 3 = ', await calculator.mul(3, 3)) // 9 !
console.log('tan(360deg) = ', await calculator.tan(360)) // 0 !
console.log('6 / 3 = ', await calculator.div(6, 3)) // 2 !

python.exit()
```



## ✔

For more info, see the README.md and the examples !