function join(arr, concatStr) {
    let result = ''
    for(let i = 0; i < arr.length; i++) {
        if (i === arr.length -1) {
            result += arr[i]
        } else {
            result += arr[i] + concatStr;
        }
    }
    return result
}

function repeat(str, times) {
    let result = '';
    for(let i = 1; i <= times; i++) {
        result += str;
    }
    return result;
}

console.log(join(['a'], '!'));
console.log(join([''], '!'));
console.log(join([1, 2, 3], ''));
console.log(join(["a", "b", "c"], "!"));
console.log(join(["a", 1, "b", 2, "c", 3], ','));
console.log(repeat('a', 5));
console.log(repeat('yoyo', 2));