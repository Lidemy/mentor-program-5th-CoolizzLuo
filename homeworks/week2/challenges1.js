function search(arr, target) {
  let L = 0
  let R = arr.length - 1
  while (L <= R) {
    const M = Math.floor((L + R) / 2)
    if (arr[M] === target) {
      return M
    } else if (arr[M] > target) {
      R = M - 1
    } else {
      L = M + 1
    }
  }
  return -1
}

console.log(search([1, 3, 10, 14, 39], 14))
console.log(search([1, 3, 10, 14, 39], 299))
