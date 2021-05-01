function solve(lines) {
  for (let i = 1; i < lines.length; i++) {
    console.log(isPrime(Number(lines[i])) ? 'Prime' : 'Composite')
  }
}

function isPrime(num) {
  if (num === 1) return false
  for (let i = 2; i < Math.ceil(num / 2) + 1; i++) {
    if (num % i === 0) return false
  }
  return true
}

solve(['5', '1', '2', '3', '4', '5'])
