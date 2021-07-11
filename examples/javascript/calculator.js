import { python } from 'JSPyBridge'
const tk = await python('tkinter')

let expression = ''
let equation

async function press (num) {
  if (num === '=') {
    try {
      console.info('Evaluating:', expression)
      const total = eval(expression)
      await equation.set(total)
    } catch (e) {
      await equation.set(' error ')
      expression = ''
    }
  } else if (num === 'Clear') {
    expression = ''
    await equation.set('')
  } else {
    expression += num
    await equation.set(expression)
  }
}

async function main () {
  const gui = await tk.Tk()
  await gui.configure({ background: 'light green' })
  await gui.title('Simple Calculator')
  await gui.geometry('270x150')
  equation = await tk.StringVar()
  const expression_field = await tk.Entry$(gui, { textvariable: equation })
  await expression_field.grid$({ columnspan: 4, ipadx: 70 })

  const buttons = [1, 2, 3, null, 4, 5, 6, null, 7, 8, 9, null, 0, '+', '-', null, '*', '/', '=']
  let row = 1
  let col = 0
  for (const button of buttons) {
    if (button == null) { row += 2; col = 0; continue }
    const button1 = await tk.Button$(gui, {
      text: ` ${button} `,
      fg: 'black',
      bg: 'red',
      command: () => press(button),
      height: 1,
      width: 7
    })
    await button1.grid({ row, column: col++ })
  }

  await gui.mainloop$({ $timeout: Infinity })
}
await main()
python.exit()
