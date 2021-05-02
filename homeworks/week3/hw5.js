const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => lines.push(line))

rl.on('close', () => solve(lines))

function solve(lines) {
  for (let i = 1; i < lines.length; i++) {
    const temp = lines[i].split(' ')
    console.log(compare(...temp))
  }
}

function compare(a, b, p) {
  if (a === b) return 'DRAW'
  if (p === '-1') {
    const temp = a
    a = b
    b = temp
  }

  const lengthA = a.length
  const lengthB = b.length

  if (lengthA !== lengthB) {
    return lengthA > lengthB ? 'A' : 'B'
  }
  return a > b ? 'A' : 'B'
}
