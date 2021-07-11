/// <reference path="./py.stdlib.d.ts" />

export function python<T extends PyTypeName>(type: T) : Promise<PyObjectType<T>>
// Template function to evaulate Python code 
export function py(tokens, ...replacements)

interface py {
  // Template function to exec() Python code
  exec(tokens, ...replacements): Promise<any>

  /**
   * Creates a Python Set, `set(1, 2, 3)`. Most APIs accept normal arrays, but some require set/tuple types.
   * @param items Items to include in this set
   */
  set(...items): Promise<any>
  
  /**
   * Creates a Python tuple, `tuple(1, 2, 3)`. Most APIs accept normal arrays, but some require set/tuple types.
   * @param items Items to include in this tuple
   */
  tuple(...items): Promise<any>

  /**
   * Same as Python's enumerate(). Used for for loops. For example,
   * ```js
   * for await (const entry of await py.enumerate(some_iter)) {
   *    console.log(entry)
   * }
   * ```
   * @param item The Python object
   */
  enumerate(item): Promise<any>

  /**
   * The Python with statement, the first parameter is the Python object
   * and the second is the function, which takes a `handle` parameter. For example,
   * ```js
   * await py.with(open('someFile'), async (f) => {
   *    await f.write('Hello world!')
   * })
   * ```
   */
  with(statement: PyObjectType<any>, callback: (handle: any) => Promise<void>): Promise<void>
}

interface python {
  /**
   * This toggles "Fast Mode", where the bridge skips string serialization. With this enabled, when using console.log
   * you now need to await object.toString(). For example, 
   * ```js
   * const res = await somePythonApi(); 
   * console.log(await res.toString())
   * ```
   * @param value True or false
   */
  setFastMode(value: boolean): void
  /**
   * Quits the Python process. You can also do `process.exit()` if you want to kill the current process, including Python.
   */
  exit(): void
}

export class PyClass {
  /**
   * Creates a Python class. **You must use** `await MyClass.init()` when initializing, don't just do `new MyClass()`.
   * The JS  constructor is called *before* the Python class has been `__init__`'ed. Your `init()` method is called
   * after the Python class has been constructed. 
   * @param superclass The Python superclass you want to extend, optional. 
   * @param superArguments The positional arguments you want to pass to the super `__init__`
   * @param superKeywordArguments The keyword arguments you want to pass to the super `__init__`
   */
  constructor(superclass: PyObjectType<any>, superArguments: [], superKeywordArguments: {})

  /**
   * This class is called after the Python class has been created.
   */
  init()
}