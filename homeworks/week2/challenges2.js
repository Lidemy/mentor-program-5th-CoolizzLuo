// 請實作以上函式，回傳 a+b 的結果
// 但是函式裡面不能出現 +-*/ 任何一個符號
function add(a, b) {
    return eval(`a${String.fromCharCode(43)}b`);
}


console.log(add(3, 5));
console.log(add(11, 6));
console.log(add(6, -5));