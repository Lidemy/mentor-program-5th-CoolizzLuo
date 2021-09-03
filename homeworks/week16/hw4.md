# hw4：What is this?
> 請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() //
obj2.hello() //
hello() //
```

## 總結
1. `this` 是 `JavaScript`的一個關鍵字。
2. `this` 是 `function` 執行時，自動生成的一個物件。
3. 隨著 `function` 執行的場合的不同，`this` 所指向的值，也會有所不同。
4. 在大多數的情況下，`this` 代表的就是呼叫 `function` 的物件(Owner Object of the function)。
5. 當沒有特別指名 `this` 的情況下，依據不同的執行環境，預設為 `全域物件` 也就是 `window` / `global`，嚴格模式下則會是 `undefined`


## 解答
> 注意重點，this 要注意的是使用的位置，而非宣告的位置

1. obj.inner.hello() 印出??
`obj.inner.hello()` 裡面的 `this`為　`obj.inner`，`obj.inner.value`為`2`，故印出`2`
2. obj2.hello() 印出??
`obj2` 與 `obj.inner` 指向同個記憶體位址，`obj2 === obj.inner`，並且利用 `obj2.hello`呼叫函式，`obj.inner.value`為`2`，故印出`2`

3. 依照總結第五條，沒有特別指名 `this`，則會指向全域物件，嚴格模式下則是 `undefined`。
