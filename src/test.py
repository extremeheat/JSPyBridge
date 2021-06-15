from JSPyBridge import require, console, MyDemoClass

chalk, fs = require('chalk'), require('fs')

console.log('Hello', chalk.red('world!'))
fs.writeFileSync('HelloWorld.txt', 'hi!')

demo = MyDemoClass('blue', { 'a': 3 })
demo2 = MyDemoClass('blue', { 'a': 3 })

console.log(demo.other(demo2))

# This should throw for now :
# demo.x = 3
# print(demo)