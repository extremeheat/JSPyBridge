import { py, python } from 'pythonia'
const np = await python('numpy')
const plot = await python('matplotlib.pyplot')

// Fixing random state for reproducibility
await np.random.seed(19680801)
const [mu, sigma] = [100, 15]
const x = await py`${mu} + ${sigma} * ${np.random.randn(10000)}`

// the histogram of the data
const [n, bins, patches] = await plot.hist$(x, 50, { density: true, facecolor: 'g', alpha: 0.75 })

await plot.xlabel('Smarts')
await plot.ylabel('Probability')
await plot.title('Histogram of IQ')
await plot.text(60, 0.025, '$\\mu=100,\ \\sigma=15$')
await plot.xlim(40, 160)
await plot.ylim(0, 0.03)
await plot.grid(true)
await plot.show()
python.exit()
