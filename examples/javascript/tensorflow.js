import { py, python, PyClass } from "JSPyBridge"
const tf = await python('tensorflow')

class KerasCallback extends PyClass {
  constructor() {
    super(tf.keras.callbacks.Callback())
  }

  on_epoch_end(epoch, logs) {
    if (logs.loss < 0.4) {
      console.log('\nReached 60% accuracy so cancelling training!')
      this.superclass().model.stop_training = true
    }
  }
}

const mnist = await tf.keras.datasets.fashion_mnist
const [[training_images, training_labels], [test_images, test_labels]] = await mnist.load_data()
const trainingImages = await py`${training_images} / 255.0`
const testImages = await py`${test_images} / 255.0`

console.log('traiing', await trainingImages.shape, await training_labels.shape)
console.log('test', await testImages.shape, await test_labels.shape)

const model = await tf.keras.models.Sequential([
  await tf.keras.layers.Flatten(),
  await tf.keras.layers.Dense$(512, { activation: await tf.nn.relu }),
  await tf.keras.layers.Dense$(10, { activation: await tf.nn.softmax })
])

await model.compile$({ optimizer: 'adam', loss: 'sparse_categorical_crossentropy' })
await model.fit$(trainingImages, await training_labels, { epochs: 5, callbacks: [new KerasCallback()], $timeout: Infinity })
python.exit()
