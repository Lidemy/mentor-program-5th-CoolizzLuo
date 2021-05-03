const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => lines.push(line))

rl.on('close', () => solve(lines))

function solve(lines) {
  const temp = lines[0].split(' ')
  const minNum = Number(temp[0])
  const maxNum = Number(temp[1])
  for (let i = minNum; i <= maxNum; i++) {
    if (isDaffodil(i)) {
      console.log(i)
    }
  }
}

function isDaffodil(n) {
  const ns = String(n)
  const pow = ns.length
  let result = 0
  for (let i = 0; i < pow; i++) {
    result += Number(ns[i]) ** pow
  }
  return n === result
}
