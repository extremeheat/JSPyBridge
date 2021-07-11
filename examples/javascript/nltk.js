import { python } from 'JSPyBridge'
import fs from 'fs'
const nltk = await python('nltk')

// ** You can comment this if you already have it.
await nltk.download('book')

const monologue = fs.readFileSync('./shakesphere.txt', 'utf-8')

// First we use NLTK to tokenize, tag and "chunk" the words into a tree
const sentences = await nltk.sent_tokenize(monologue).then(v => v.valueOf())
const tokenized = await Promise.all(sentences.map(sentence => nltk.word_tokenize(sentence)))
const tagged = await Promise.all(tokenized.map(tok => nltk.pos_tag(tok)))
const chunked = await nltk.ne_chunk_sents$(tagged, { binary: true })

// Some tree traversal logic to extract all the Named Entities (NE)
async function extractEntityNames (t) {
  const entityNames = []
  if (await t.label$) {
    const label = await t.label()
    if (label === 'NE') {
      for (const child of await t.valueOf()) {
        entityNames.push(child[0])
      }
    } else {
      for await (const child of t) {
        entityNames.push(...await extractEntityNames(child))
      }
    }
  }
  return entityNames
}

const entityNames = []

// Run the function above on each of the chunked trees
for await (const tree of chunked) {
  entityNames.push(...await extractEntityNames(tree))
}

// Compile the frequencies of each word
const frequencies = entityNames.reduce((acc, curr) => (acc[curr] ??= 0, acc[curr]++, acc), {})
// Turn it to an array and list by most common
const result = Object.entries(frequencies).map(([k, v]) => [k, v]).sort((a, b) => b[1] - a[1])
// Log it out, you should get [ [ 'Romeo', 5 ], [ 'Juliet', 2 ], [ 'Deny', 1 ], [ 'Montague', 1 ], ... ]
console.log(result)
// Exit python
python.exit()
