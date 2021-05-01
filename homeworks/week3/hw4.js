function solve(lines) {
  console.log(isPalindrome(lines[0]) ? 'True' : 'False')
}

function isPalindrome(str) {
  return str === str.split('').reverse().join('')
}

solve(['abbba'])
solve(['ac'])
