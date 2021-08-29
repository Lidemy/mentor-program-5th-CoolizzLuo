# hw1：Event Loop
> 在 JavaScript 裡面，一個很重要的概念就是 Event Loop，是 JavaScript 底層在執行程式碼時的運作方式。請你說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

輸出
```
1
3
5
2
4
```

## 細部拆解流程
1. 程式開始產生 `main()` 放入 `call stack`，開始逐一執行程式碼
2. 第一行 `console.log(1)` 放入 `call stack`，立即執行印出 1
3. 第二行 `setTimeout(() => console.log(2) , 0)` 放入 `call stack` 並透過 WebAPI 呼叫瀏覽器啟動計時器，時間到後把 `setTimeout()` 裡面執行的 function 丟入 `callback queue`，但`call stack`仍還有任務`main()`，`callback queue`繼續擱置。
4. 第五行 `console.log(3)` 放入 `call stack`，立即執行印出 3
5. 第六行 `setTimeout(() => console.log(4) , 0)` 放入 `call stack` 並透過 WebAPI 呼叫瀏覽器啟動計時器，時間到後把 `setTimeout()` 裡面執行的 function 丟入 `callback queue`，但`call stack`仍還有任務`main()`，`callback queue`繼續擱置。
6. 第九行 `console.log(5)` 放入 `call stack`，立即執行印出 5
7. `main()` 結束，`call stack` 已經清空
8. `event loop`，開始調用 `callback queue`裡的等待的任務，執行步驟2放入的 `console.log(2)`，打印出 2
9. `event loop` 檢測 `call stack` 還是沒有任務，繼續調用　`callback queue`裡的等待的任務，直接步驟2放入的 `console.log(4)`，打印出 4
10. 執行完畢

## 總結
1. 堆疊當下的程式碼會執行完畢，過程中不會被 Queue 中等待的 callback function 打斷
2. 將 setTimeout() 延遲時間設為 0，不代表程式會立即執行到，它的 cb 依然會被排在 Queue 等待堆疊清空
3. JavaScript 還是跑單執行緒，但 Web APIs 提供了它運作多任務的可能，利用 Event Loop 機制來協調、幫助 JavaScript 執行任務