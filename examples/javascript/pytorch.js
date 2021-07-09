import { py, python, PyClass } from 'JSPyBridge'
import fs from 'fs'
const torch = await python('torch')
const nn = await python('torch.nn')
const autograd = await python('torch.autograd')
const dset = await python('torchvision.datasets')
const transforms = await python('torchvision.transforms')
const F = await python('torch.nn.functional')
const optim = await python('torch.optim')

const useCuda = await torch.cuda.is_available()

console.log('Can we use CUDA?', useCuda)

const root = './torch_data'
if (!fs.existsSync(root)) {
  fs.mkdirSync(root)
}

const trans = await transforms.Compose([
  await transforms.ToTensor(),
  await transforms.Normalize([0.5], [1.0])
])

const trainSet = await dset.MNIST$({ root, train: true, transform: trans, download: true })
const testSet = await dset.MNIST$({ root, train: false, transform: trans, download: true })

const batch_size = 100

const trainLoader = await torch.utils.data.DataLoader$({
  dataset: trainSet,
  batch_size,
  shuffle: true
})

const testLoader = await torch.utils.data.DataLoader$({
  dataset: testSet,
  batch_size,
  shuffle: false
})

console.log(`-> total training batch #: ${await trainLoader.length}`)
console.log(`-> total testing batch #: ${await testLoader.length}`)

class MLPNet extends PyClass {
  // The JS constructor here should be used to set the superclass and also JS-specifc
  // logic you need to initialize for this class. You can't make super calls to Python here.
  constructor() {
    super(nn.Module)
  }

  // This is called once the Python class has been initialized, and 
  // this.parent is now accessable.
  async init() {
    this.fc1 = await nn.Linear(28 * 28 * 500)
    this.fc2 = await nn.Linear(500, 256)
    this.fc2 = await nn.Linear(500, 256)
  }

  async forward(x) {
    x = await x.view(-1, 28 * 28)
    x = await x.relu(await super.parent.fc1(x))
    x = await x.relu(await super.parent.fc2(x))
    x = await super.parent.fc3(x)
    return x
  }

  name() {
    return 'MLP'
  }
}

class LeNet extends PyClass {
  // The JS constructor here should be used to set the superclass and also JS-specifc
  // logic you need to initialize for this class. You can't make super calls to Python here.
  constructor() {
    super(nn.Module)
  }

  // This is called once the Python class has been initialized, and 
  // this.parent is now accessable.
  async init() {
    this.conv1 = await nn.Conv2d(1, 20, 5, 1)
    this.conv2 = await nn.Conv2d(20, 50, 5, 1)
    this.fc1 = await nn.Linear(4 * 4 * 50, 500)
    this.fc2 = await nn.Linear(500, 10)
    return 69
  }

  async forward(x) {
    x = await F.relu(await this.conv1(x))
    x = await F.max_pool2d(x, 2, 2)
    x = await F.relu(await this.conv2(x))
    x = await F.max_pool2d(x, 2, 2)
    x = await x.view(-1, 4 * 4 * 50)
    x = await F.relu(await this.fc1(x))
    x = await this.fc2(x)
    return x
  }

  name() {
    return 'LeNet'
  }
}

// Tip: `model` is actually a Proxy
let model = await LeNet.init()


// if (useCuda) {
//   model = await model.cuda()
// }


// console.log('PARAMS', await py`list(${model.parameters()})`)
// process.exit()
const optimizer = await optim.SGD$(await model.parameters(), { lr: 0.1, momentum: 0.9 })

const criterion = await nn.CrossEntropyLoss()

for (let epoch = 0; epoch < 1; epoch++) {
  // training

  var averageLoss = 0


  for await (let [batchIndex, [x, target]] of await py.enumerate(trainLoader)) {
    if (!x) {
      console.log([await batchIndex, [await x, await target]])
      throw Error()
    }
    await optimizer.zero_grad()

    if (useCuda) {
      x = await x.cuda()
      target = await target.cuda()
    }

    x = await autograd.Variable$(await x, {})
    target = await autograd.Variable$(await target, {})

    const out = await model(await x)
    // console.log('Out', out, x)
    const loss = await criterion(out, await target)
    // console.log("Avg loss", averageLoss)
    // if (typeof averageLoss != 'number')
    // process.exit(1)
    

    averageLoss = await py`${averageLoss} * 0.9 + ${loss.data} * 0.1`
    await loss.backward()
    await optimizer.step()


    const batchNum = await batchIndex + 1
    if ((batchNum % 100 == 0) || (batchNum == await testLoader.length)) {
      console.log(`=> epoch: ${epoch}, batch index: ${batchNum}, test loss: ${averageLoss}, acc ${correctCount * 1.0 / totalCount}`)
    }
  }

  var correctCount = 0
  var averageLoss = 0
  var totalCount = 0

  for await (let [batchIndex, [x, target]] of await py.enumerate(testLoader)) {

    if (useCuda) {
      x = await x.cuda()
      target = await target.cuda()
    }

    x = await autograd.Variable$(x, { volatile: true })
    target = await autograd.Variable$(await target, { volatile: true })

    const out = await model(x)
    const loss = await criterion(out, target)
    const [, predLabel] = await torch.max(await out.delta, 1)
    const dataSize = await x.data.size()
    totalCount += await dataSize[0]
    // wtf ??
    correctCount += await (await predLabel == await target.data).sum()
    print("Avg loss", averageLoss)
    averageLoss = py`${averageLoss} * 0.9 + ${loss.data} * 0.1`

    const batchNum = await batch_idx + 1
    if ((batchNum % 100 == 0) || (batchNum == await testLoader.length)) {
      console.log(`=> epoch: ${epoch}, batch index: ${batchNum}, test loss: ${avgLoss}, acc ${correctCount * 1.0 / totalCount}`)
    }
  }
}

await torch.save(await model.save_dict(), await model.name())
python.exit()