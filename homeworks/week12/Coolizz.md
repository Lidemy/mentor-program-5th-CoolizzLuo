## hw1
### 功能介紹
載入更多部份實作，每次 request 後端除了給 `ok`和 `discussions`另外會給 `currentPage`及`totalPage`，前端網頁判斷如果`currentPage`，`totalPage`相等，則把 button hide

### 心得
寫完才發現要盡量用 jQuery..下次會注意點, 看了老師的範例影片才發現實現分頁的方式有好多種。

## hw2
### 功能介紹
支援功能
- [X] 新增、編輯、刪除 todo
- [X] 標記完成/未完成
- [X] 清空 todo (已完成)
- [X] 篩選 todo（全部、未完成、已完成）
- [X] 串接後端利用 id 儲存
----
1. 初始化 Web 會先檢查 localStorage 有無 todo-data, 沒有的話有預設資料, 在判斷 URL query 有無 id, 有的話去資料庫抓取, 如果資料庫沒有此 id, 則倒回上一頁
2. 點擊 Save, 可以獲取 id, 如果 URL query 已經有 id, 則更新資料庫

### 心得
其實我第七周已經把前端功能都寫完了，就拿第七周的直接升級一下，之前都是用滿 VanillaJS 及 Scss，就沒改成 jQuery 和 Bootstrap了 (畢竟進度還落後??!!) 
當時是存在 localStorage 上，想說多個串後端應該很快吧，沒想到一改也是花了一個下午在修修剪剪，大概 20% 在建構程式 80% 在測試bug並看細節有沒有做好