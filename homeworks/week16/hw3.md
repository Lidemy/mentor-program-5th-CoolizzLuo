# hw3：Hoisting
> 請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。
## 問題
``` js
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

## 細部拆解流程
> 執行環境 (EC: Execution context)
> 變數物件 (VO: Variable Object) / 活動物件（AO: Activation Object）
> 作用域鏈（Scope Chain）
> > VO & AO 差別 ? 
> 執行函式所創造出來的執行環境中，則會另把參數（parameters）也加進去變數物件中，這個多了參數的變數物件就被稱為是「活化（Activation Object)。


---
1-1. `全域`編譯階段：建立全域執行環境
```js
globalEC {
  VO: {
  
  },
  scopeChain: [globalEC.VO]
}
```
1-2. `全域`編譯階段：初始化變數 a 和 fn
> function 呼叫時才會建立 EC
  - var a = 1 -> 宣告一個變數 a
  - function fn() -> 宣告一個函式 fn 
```js
globalEC: {
  VO: {
    a: undefined,
    fn: Function
  },
  scopeChain: [globalEC.VO]
}
```

1-3. `全域`編譯階段：設定 fn scope 屬性
> fn 是一個 function，所以要設定它的 scope 屬性
`// fn.[[scope]] = globalEC.scopeChain ===> [global.VO]`

1-4. `全域`編譯階段：建立好執行環境和環境物件，開始逐行執行
```js
var a = 1
fn(...)
console.log(a)
a = 10
console.log(a)
console.log(b)
```
---
2-1. `全域`執行階段：對 a 進行賦值
> 將 globalEC.VO 裡面的 a 值從 undefined 變成 1
```js
globalEC {
    VO: {
        a: 1,
        fn: func
    },
    scopeChain: [globalEC.VO]
}

// 設定屬性
// fn.[[scope]] = globalEC.scopeChain ===> [global.VO]
```

2-2. `全域`執行階段：呼叫函式 `fn`
> 建立函式 fn 的執行環境
  - 這個新的環境會被堆疊在原本的 globalEC 上面，這個堆疊的過程被稱為「執行堆疊（Execution stack）」

---
3-1. `fn` 編譯階段：建立新的執行環境 fnEC
```js
fnEC {
    AO: {
        argument: [],
    }

    scopeChain: [fnEC.AO, fnEC.[[scope]]]  // ===> fnEC.AO + global.VO
}

globalEC {
    VO: {
        a: 1,
        fn: func
    },
    scopeChain: [globalEC.VO]
}

// 設定屬性
// fn.[[scope]] = globalEC.scopeChain ===> [global.VO]
```
`scope chain` 是它的 `AO` 加上它本身的 `scope` 屬性所組成

3-2. `fn` 編譯階段：fnEC 初始化變數 a 和 fn2
```js
fnEC {
    AO: {
        a: undefined,
        fn2: func
    }

    scopeChain: [fnEC.AO, fnEC.[[scope]]]  // ===> fnEC.AO + global.VO
}

globalEC {
    VO: {
        a: 1,
        fn: func
    },
    scopeChain: [globalEC.VO]
}

// fn.[[scope]] = globalEC.scopeChain ===> [global.VO]
```

3-3. `fn`編譯階段：設定 fn2 scope 屬性
`// fn2.[[scope]] = fnEC.scopeChain ===> [fnEC.AO, global.VO]`

3-4 `fn`編階階段：建立好執行環境和環境物件，開始逐行執行
```js
function fn(){
  console.log(a)  // 開始執行
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
}
```
---
4-1. `fn`執行階段：印出 `a` 的值為 `undefined`
從 `fnEC` 可以發現此時 `AO` 裡面還是 `undefined`
```js
fnEC {
    AO: {
        a: undefined,
        fn2: func
    }
    scopeChain: [fnEC.AO, fnEC.[[scope]]]  // ===> fnEC.AO + global.VO
}
```
```js
function fn(){
  console.log(a)  // 印出undefined
  var a = 5 // 賦予 a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
}
```

4-2. `fn`執行階段：`a` 賦予值 `5`
```js
fnEC {
    AO: {
        a: 5,
        fn2: func
    }
    scopeChain: [fnEC.AO, fnEC.[[scope]]]  // ===> fnEC.AO + global.VO
}
```
```js
function fn(){
  console.log(a)  // 印出undefined
  var a = 5 // 賦予 a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
}
```

4-3 `fn`執行階段：印出 `a` 的值為 `5`
```js
function fn(){
  console.log(a)  // undefined
  var a = 5
  console.log(a)  // 5
  a++
  var a
  fn2()
  console.log(a)
}
```
4-4 `fn`執行階段：`a` 賦予值為 `a + 1`，更改為 `6`
```js
fnEC {
    AO: {
        a: 6,
        fn2: func
    }
    scopeChain: [fnEC.AO, fnEC.[[scope]]]  // ===> fnEC.AO + global.VO
}
```
4-5 `fn`執行階段：`var a`，已經宣告不影響 `a` 的值 (如果是 let / const 會報錯)

4-6 `fn`執行階段：呼叫函式 `fn2`
> 建立一個新的執行環境，堆疊在 globalEC 和 fnEC 上面，並先執行

---
5-1. `fn2` 編譯階段：建立新的執行環境 fn2EC
```js
fn2EC {
    AO: {
    
    },
    scopeChain: [fn2EC.AO, fn2EC.[[scope]]] //fn2Ec.AO + fnEC.AO + global.VO
}

fnEC {
    AO: {
        a: 6,
        fn2: func
    }
    scopeChain: [fnEC.AO, fnEC.[[scope]]]  // fnEC.AO + global.VO
}
// fn2.[[scope]] = fnEC.scopeChain ===> [fnEC.AO, global.VO]

globalEC {
    VO: {
        a: 1,
        fn: func
    },
    scopeChain: [globalEC.VO]
}
// fn.[[scope]] = globalEC.scopeChain ===> [global.VO]
```

5-2. `fn2` 編譯階段：沒有心的宣告變數，進入執行階段
```
function fn2(){
  console.log(a)
  a = 20
  b = 100
}
```
---
6-1 `fn2`執行階段：印出 `a` 的值為 `6`
> 循著 scope chain 在 fn2EC AO 內找不到 a，往上一層 fnEC AO 找到 a 的值為 6

6-2 `fn2`執行階段： `a` 賦予值為 `20`
> 循著 scope chain 在 fn2EC AO 內找不到 a，往上一層 fnEC AO 找到 a 將其更改值為 6

6-3 `fn2`執行階段： `b` 賦予值為 `100`
> 循著 scope chain 在 fn2EC AO 內找不到 b，往上一層 fnEC AO 也找不到 a ，再往上一層 globalEC AO 找到 b將其更改值為 100

6-4 `fn2`執行階段：執行完畢，回到 `fn` 執行環境
> fn2執行完畢 就會自動從執行堆疊的頂端抽掉，所以現在堆疊最上方的執行環境是 fnEC
> 沒有其他物件參照到 scope 會被 GC 給回收掉

---

7-1 `fn`執行階段：繼續下一行指令印出 `a`，此時值為 `20`
```js
fnEC {
    AO: {
        a: 20,
        fn2: func
    }
    scopeChain: [fnEC.AO, fnEC.[[scope]]]  // fnEC.AO + global.VO
}

globalEC {
    VO: {
        a: 1,
        fn: func,
        b: 100
    },
    scopeChain: [globalEC.VO]
}
```

7-2 `fn`執行階段：執行完畢，回到 `global` 執行環境
> fn執行完畢 從執行堆疊的頂端抽掉，所以現在堆疊最上方的執行環境是 globalEC

---

8-1 `全域`執行階段：繼續執行全域上的程式
```js
fn() // 執行完畢

console.log(a)
a = 10
console.log(a)
console.log(b)
```

8-2 `全域`執行階段：印出 `a` 的值為 `1`
 > globalEC.VO 內找到 a 值為 1

```js
fn() // 執行完畢

console.log(a)  // 1
a = 10
console.log(a)
console.log(b)
```

8-3 `全域`執行階段：`a` 賦予值，更改為 `10`
> globalEC.VO 內找到 a 賦予新的值為 10

8-4 `全域`執行階段：印出 `a` 的值為 `10`
> globalEC.VO 內找到 a 值為 10
```js
fn() // 執行完畢

console.log(a)  // 1
a = 10
console.log(a) // 10
console.log(b)
```

8-4 `全域`執行階段：印出 `b` 的值為 `100`
> globalEC.VO 內找到 b 值為 100
```js
fn() // 執行完畢

console.log(a)  // 1
a = 10
console.log(a) // 10
console.log(b) // 100
```

## 輸出結果
```
undefined
5
6
20
1
10
100
```