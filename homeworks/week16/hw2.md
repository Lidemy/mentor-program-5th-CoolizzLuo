# hw2：Event Loop + Scope
> 請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

輸出
```
i: 0
i: 1
i: 2
i: 3
i: 4
5
// delay 1s
5
// delay 1s
5
// delay 1s
5
// delay 1s
5
```


## 細部拆解流程
1. `main()` 啟動放入 `call stack`，開始執行程式碼
2. 初始化 for 迴圈，這邊 i 是使用 var 來宣告，而 var 是 function scope，這邊則會把變數的 scope 放在全域，因此可以看做是
```js
var i
for(i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
3. i 的值 `0`，並符合 `i < 5`，進入迴圈
  3-1. `console.log('i: ' + i)` 放入 `call stack`，並執行，此時，i 為 `0`，因此打印出　`0`。
  3-2. `setTimeout(() => console.log(i), i * 100)`，會透過 webAPI呼叫瀏覽器啟動計時器，並在 `i * 1000` 毫秒 (此時 i 為 `0`，所以是 `0` 毫秒)後往 `callback queue` 放入 `console.log(i)`。 `call stack` 此時還未清空，並不會執行 `callback queue`的 function
  3-3 迴圈結束 `i++`
4. i 的值 `1`，並符合 `i < 5`，進入迴圈
  4-1. `console.log('i: ' + i)` 放入 `call stack`，並執行，此時，i 為 `1`，因此打印出　`1`。
  4-2. `setTimeout(() => console.log(i), i * 100)`，會透過 webAPI呼叫瀏覽器啟動計時器，並在 `i * 1000` 毫秒 (此時 i 為 `1`，所以是 `1000` 毫秒)後往 `callback queue` 放入 `console.log(i)`。 `call stack` 此時還未清空，並不會執行 `callback queue`的 function
  4-3 迴圈結束 `i++`
5. i 的值 `2`，並符合 `i < 5`，進入迴圈
  5-1. `console.log('i: ' + i)` 放入 `call stack`，並執行，此時，i 為 `2`，因此打印出　`2`。
  5-2. `setTimeout(() => console.log(i), i * 100)`，會透過 webAPI呼叫瀏覽器啟動計時器，並在 `i * 1000` 毫秒 (此時 i 為 `2`，所以是 `2000` 毫秒)後往 `callback queue` 放入 `console.log(i)`。 `call stack` 此時還未清空，並不會執行 `callback queue`的 function
  5-3 迴圈結束 `i++`
6. i 的值 `3`，並符合 `i < 5`，進入迴圈
  6-1. `console.log('i: ' + i)` 放入 `call stack`，並執行，此時，i 為 `3`，因此打印出　`3`。
  6-2. `setTimeout(() => console.log(i), i * 100)`，會透過 webAPI呼叫瀏覽器啟動計時器，並在 `i * 1000` 毫秒 (此時 i 為 `3`，所以是 `3000` 毫秒)後往 `callback queue` 放入 `console.log(i)`。 `call stack` 此時還未清空，並不會執行 `callback queue`的 function
  6-3 迴圈結束 `i++`
7. i 的值 `4`，並符合 `i < 5`，進入迴圈
  7-1. `console.log('i: ' + i)` 放入 `call stack`，並執行，此時，i 為 `4`，因此打印出　`4`。
  7-2. `setTimeout(() => console.log(i), i * 100)`，會透過 webAPI呼叫瀏覽器啟動計時器，並在 `i * 1000` 毫秒 (此時 i 為 `4`，所以是 `4000` 毫秒)後往 `callback queue` 放入 `console.log(i)`。 `call stack` 此時還未清空，並不會執行 `callback queue`的 function
  7-3 迴圈結束 `i++`
8. i 的值 `5`，不符合 `i < 5`，跳出迴圈
9. `main()` 結束，`call stack` 已經清空
10. `event loop`，開始調用 `callback queue`裡的等待的任務，
11. 步驟2時，計時器 0 毫秒後把`console.log(i)`放入`callback queue` 執行，i 為全域變數且此時 值為 5，因次打印出 5
12. 步驟3時，計時器 1000 毫秒後把`console.log(i)`放入`callback queue`，因`call stack`沒有任務執行，而執行此任務，i 為全域變數且值為 5，因次打印出 5
13. 步驟4時，計時器 2000 毫秒後把`console.log(i)`放入`callback queue`，因`call stack`沒有任務執行，而執行此任務，i 為全域變數且值為 5，因次打印出 5
14. 步驟5時，計時器 3000 毫秒後把`console.log(i)`放入`callback queue`，因`call stack`沒有任務執行，而執行此任務，i 為全域變數且值為 5，因次打印出 5
15. 步驟6時，計時器 4000 毫秒後把`console.log(i)`放入`callback queue`，因`call stack`沒有任務執行，而執行此任務，i 為全域變數且值為 5，因次打印出 5
16. `call stack` 及 `callback queue` 全空，瀏覽器也無計時器在倒數。