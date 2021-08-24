# hw1 短網址系統設計
> 請你畫出一張短網址服務的後端系統架構圖，越詳細越好，可以考慮到如何增進效能、scaling 以及備份資料。

## 短網址
### 什麼是短網址
> 短網址：把普通的網址轉換成比較短的網址

範例:
轉換前 `https://www.google.com/?&bih=1041&biw=1920&rlz=1C1ONGR_zh-TWTW948TW948&hl=zh-TW`
轉換後 `https://reurl.cc/VEr3ny`

網址長度幾乎少了 1/3，如果原本的網址更長的話，效果會更明顯，像是有些含有中文的網址，因為編碼關係，中文可能會變成一大串特殊符號，這樣在分享網址時就特別適合用短網址。

### 基本原理
怎麼做到呢？並不是真的把網址變短了，而是在伺服器上根據演算法產生一組新的字串，並存到資料庫，當使用者訪問短網址時，就到資料庫找到 mapping 的原網址，並轉址到該頁面。


### 流程
使用者在網址列輸入：`https://www.google.com/?&bih=1041&biw=1920&rlz=1C1ONGR_zh-TWTW948TW948&hl=zh-TW`
伺服器向資料庫詢問這串短網址的原網址，得到：`https://reurl.cc/VEr3ny`
幫使用者轉址到原網址

### 增進效能
1. 避免單點故障（Single Point Of Failure）
  * 目前的設計，如果其中一個 Server 或是 Database 掛了，我們的短網址服務就無法使用了，所以 Server 跟 Database 都不能只有一個。再加上 Load Balancer 來進行分流，Load Balancer 當然也不能只有一個。
2. 使用 Cache ，將該使用者輸入過的短網址存在 Cache，下次訪問相同的短網址時，先從 Cache 抓取，增加使用者體驗，也降低伺服器負載
3. 資料庫複寫（Replication）與讀寫分離
  * 其中一個資料庫當作 Master，剩下的當作 Slaves，任何需要變動到資料庫裡的資料都在 Master 完成，再同步到每個 Slaves，而 Slaves 就只要負責讀取資料的工作就好。
4. 刪除過期短網址
  * 如果不斷的檢查過期的短網址來清除他們，會給伺服器很大的負擔。
  * 我們可以設定短網址的過期時間，如果使用者要訪問一個過期的短網址，就回傳給他 HTTP 404，並刪除該短網址。也可以每隔一段時間就清除那些過期的短網址，當然要在流量比較低的時候才做這件事。

## 參考資料
[短网址(short URL)系统的原理及其实现](https://hufangyun.com/2017/short-url/)
[系統設計101—大型系統的演進（上）](https://medium.com/%E5%BE%8C%E7%AB%AF%E6%96%B0%E6%89%8B%E6%9D%91/backend-architecture-101-5c425e760a13)
[系統設計 - 設計縮網址服務](https://www.jyt0532.com/2019/12/05/design-tiny-url/)
[短 URL 系统是怎么设计的？](https://www.zhihu.com/question/29270034)