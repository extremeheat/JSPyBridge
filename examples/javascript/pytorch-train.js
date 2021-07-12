/**
 * A PyTorch NN training example with the MNIST digit dataset using torchvision
 * Ported from https://github.com/pytorch/examples/tree/master/mnist
 */
import { py, PyClass, python } from 'pythonia'
python.setFastMode(true) // bridge skips string serialization; need to use .toString() when console.logging now
const torch = await python('torch')
const nn = await python('torch.nn')
const F = await python('torch.nn.functional')
const optim = await python('torch.optim')
const { datasets, transforms } = await python('torchvision')
const lrs = await python('torch.optim.lr_scheduler')

class Net extends PyClass {
  constructor () {
    super(nn.Module)
  }

  async init () {
    this.conv1 = await nn.Conv2d(1, 32, 3, 1)
    this.conv2 = await nn.Conv2d(32, 64, 3, 1)
    this.dropout1 = await nn.Dropout(0.25)
    this.dropout2 = await nn.Dropout(0.5)
    this.fc1 = await nn.Linear(9216, 128)
    this.fc2 = await nn.Linear(128, 10)
  }

  async forward (x) {
    x = await this.conv1(x)
    x = await F.relu(x)
    x = await this.conv2(x)
    x = await F.relu(x)
    x = await F.max_pool2d(x, 2)
    x = await this.dropout1(x)
    x = await torch.flatten(x, 1)
    x = await this.fc1(x)
    x = await F.relu(x)
    x = await this.dropout2(x)
    x = await this.fc2(x)
    const output = await F.log_softmax$(x, { dim: 1 })
    return output
  }
}

async function train (log_interval, dry_run, model, device, trainLoader, optimizer, epoch) {
  await model.train()
  for await (let [_batchIx, [data, target]] of await py.enumerate(trainLoader)) {
    data = await data.to(device)
    target = await target.to(device)
    await optimizer.zero_grad()
    const output = await model(await data)
    const loss = await F.nll_loss(output, await target)
    await loss.backward()
    await optimizer.step()
    const batchIx = await _batchIx
    if ((batchIx % log_interval) === 0) {
      console.log(`Train epoch: ${epoch} [${batchIx * await data.length}/${await trainLoader.dataset.length} (${100 * batchIx / await trainLoader.length}%)]\tLoss: ${await loss.item()}`)
    }
    if (dry_run) break
  }
}

async function test (model, device, testLoader) {
  await model.eval()
  let testLoss = 0
  let correct = 0

  await py.with(torch.no_grad(), async () => {
    for await (let [data, target] of testLoader) {
      data = await data.to(device)
      target = await target.to(device)
      const output = await model(data)
      const loss = await F.nll_loss$(output, await target, { reduction: 'sum' })
      testLoss += await loss.item()
      const pred = await output.argmax$({ dim: 1, keepdim: true })
      correct += await pred.eq(await target.view_as(pred)).then(k => k.sum()).then(k => k.item())
    }
  })

  testLoss /= await testLoader.dataset.length
  console.log(`\nTest set: Average loss: ${testLoss}, Accuracy: ${correct}/${await testLoader.dataset.length} (${(100 * correct) / await testLoader.dataset.length}%)\n`)
}

const batch_size = 100
const test_batch_size = 1000
const epochs = 1
const lr = 1
const gamma = 0.7
const no_cuda = true
const dry_run = true
const seed = 1
const log_interval = 10
const save_model = true

const use_cuda = !no_cuda && await torch.cuda.is_available()
await torch.manual_seed(seed)

const device = use_cuda ? 'cuda' : 'cpu'

const transform = await transforms.Compose([
  await transforms.ToTensor(),
  await transforms.Normalize([0.1306], [0.3081])
])

const dataset1 = await datasets.MNIST$('./torch_data', { train: true, download: true, transform })
const dataset2 = await datasets.MNIST$('./torch_data', { train: false, download: true, transform })

const trainLoader = await torch.utils.data.DataLoader$(dataset1, { batch_size })
const testLoader = await torch.utils.data.DataLoader$(dataset2, { batch_size: test_batch_size })

const net = await Net.init()
const model = await net.to(device)
const optimizer = await optim.Adadelta$(await model.parameters(), { lr })

const scheduler = await lrs.StepLR$(optimizer, { step_size: 1, gamma })

for (let epoch = 0; epoch < epochs + 1; epoch++) {
  await train(log_interval, dry_run, model, device, trainLoader, optimizer, epoch)
  await test(model, device, testLoader)
  await scheduler.step()
}

if (save_model) {
  await torch.save(await model.state_dict(), 'mnist_cnn.pt')
}

python.exit()
