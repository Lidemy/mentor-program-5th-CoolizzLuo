function capitalize(str) {
    let firstChar = str[0].charCodeAt();
    if(!(firstChar >= 97 && firstChar <= 122)) {
        return str;
    } else {
        let result = String.fromCharCode(firstChar - 32);
        for(let i = 1; i < str.length; i++) {
            result += str[i];
        }
        return result;
    }
}

function capitalize2(str) {
    return str[0].toUpperCase() + str.slice(1);
}

console.log(capitalize('hello'));
console.log(capitalize2('hello'));
