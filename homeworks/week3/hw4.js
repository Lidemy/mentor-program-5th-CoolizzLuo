const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => lines.push(line))

rl.on('close', () => solve(lines))

function solve(lines) {
  console.log(isPalindrome(lines[0]) ? 'True' : 'False')
}

function isPalindrome(str) {
  return str === str.split('').reverse().join('')
}
