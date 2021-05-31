## 什麼是 DOM？
DOM 全名為 Document Object Model 中文翻譯為 文件物件模型，把一份 html 文件定義成物件，最終會變成樹狀結構
![](https://i.imgur.com/iYWO02e.png)
有了 DOM 就可以方便網頁設計人員更方便的解析 html 上的元素並操作使用

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
DOM 觸發事件會從根節點開始向子節點傳遞，抵達被監聽的節點後，才往跟節點傳遞回去
從根節點到被監聽的節點過程為 `事件捕獲`
從被監聽節點回跟節點為 `事件冒泡`
![](https://i.imgur.com/9FtphHE.png)

## 什麼是 event delegation，為什麼我們需要它？
又稱事件委派，如果有新增元素需要重新監聽事件，在直接在父元素監聽，讓網頁不必掛載這麼多監聽事件，也可以更省效能，但父子元素之間經過太多節點也會影響效能

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
1. `event.preventDefault()` 取消觸發 tag 預設行為，例如 a (跳轉網頁或跳到hash), form (提交行為) 的行為
2. `event.stopPropagation()` 取消事件往後傳遞冒泡，類似像是在 function 中加入 return 中止函式，讓後續的程式碼不會繼續執行