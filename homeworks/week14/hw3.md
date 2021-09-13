## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
### Q1. 什麼是 DNS？
> DNS 域名系統（Domain Nmae System）
1.  是一種可以將 URL 轉換為機器可讀取的 IP 地址 (例如，192.0.2.44)。
2.  作為將域名和IP位址相互對映的一個分散式資料庫
### Q2. Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
> 由 Google 推出的免費網域解析服務，Google 表示是為了提升網路瀏覽速度、網路使用體驗跟安全性（有這麼好的事？）。
1. 性能優勢
   * 因為 Google 強大的搜尋引擎，google 已經成為了搜尋的代名詞。所以 google 搜尋引擎每天都在抓取非常多的 DNS 資訊，所以 google 可以將這些資料快取，就不用再翻電話簿了。
2. 安全優勢
   * Google 是全球知名的大公司，他們的服務也在世界各地都非常多人使用，因此他們對於安全性有相對高的要求。
3. **收集大數據**
   * 搜尋結果可以分析趨勢、了解使用者行為，Google 廣告和Google 地圖都是大量數據帶來的結果。

## 什麼是資料庫的 lock？為什麼我們需要 lock？
當多人同時存取資料庫的同一筆資料的時候，可能會造成資料的讀取或儲存部正確。
例如有一個資料表裡存著門票的數量，假設數量只有一張，當有十個人同時要購買這張門票，這十個人可能都看會到門票存量一張，且同時購買成功，導致超賣的情況。
而 lock 就是在有人正在存取某個資料時，讓其他想存取同一個資料的人等待的機制。
所以當有一個人正在購買那唯一一張門票時，其他人就只能等待，如果他購買成功，其他人就沒辦法再購買了，而如果他購買失敗，門票就會釋放出來，給下一個幸運兒進入交易，並讓剩下的人繼續等待。


## NoSQL 跟 SQL 的差別在哪裡？
> SQL 並不是指資料庫系統，而是一種特定目的程式語言
### SQL
使用 SQL 作為查詢方式的資料庫通常為 SQL 資料庫。
任何一種以 SQL 為基礎的資料庫系統，都有差不多的特性，例如說他們必須事先定義好 Schema，你可以想成是資料庫的規格書。就是資料庫裡面要有哪些欄位、每一個欄位的資料型態是什麼。
會先把每一個欄位的名稱跟型態都先固定住。這個就是 SQL 的一個特點。還有另外一個特點是「關聯式資料庫」

### SQL
1. 沒有 Schema，可以想像成存 JSON 資料進 DB
2. 用 key-value 來存
3. 不支援 JOIN
4. 通常用來存一些結構不固定的資料（log 之類的）


## 資料庫的 ACID 是什麼？
> 資料庫在更新資料時，為了保持 Transation 正確可靠，必須具備四種特性

1. `Atomicity 原子性` 一個事務（transaction）中的所有操作，或者全部完成，或者全部不完成，不會結束在中間某個環節。事務在執行過程中發生錯誤，會被回滾（Rollback）到事務開始前的狀態，就像這個事務從來沒有執行過一樣。即，事務不可分割、不可約簡。
2. `Consistency 一致性` Transation 完成前後，資料庫的完整性不會被破壞。
3. `Isolatio 隔離性` 資料庫可以同時有多個 Transations ，且確保 Transations 間不會互相影響，導致數據不一致
4. `Durability 持久性` Transation 完成後，對資料的更動就是永久的，不會因為系統故障或錯誤而改變。

一個資料庫的效能往往也由它對 ACID 特性的執行效率來決定．所以發生問題都會是在寫入動作上．寫入代表刪除或更新，會改變資料庫內的資料狀態．如果你有一個資料庫只需要提供讀取而沒有寫入，那麼 ACID 特性對資料庫引擎而言就沒什麼意義。

## 參考資料
### DNS
[什麼是 DNS？](https://aws.amazon.com/tw/route53/what-is-dns/)
[域名系統](https://zh.wikipedia.org/wiki/%E5%9F%9F%E5%90%8D%E7%B3%BB%E7%BB%9F)
[DNS 伺服器是什麼？如何運用？](https://www.stockfeel.com.tw/dns-%E4%BC%BA%E6%9C%8D%E5%99%A8%E6%98%AF%E4%BB%80%E9%BA%BC%EF%BC%9F%E5%A6%82%E4%BD%95%E9%81%8B%E7%94%A8%EF%BC%9F/)
[Google Public DNS](https://zh.wikipedia.org/wiki/Google_Public_DNS)

### SQL
[程式導師實驗計畫：Lesson 8-2](https://docs.google.com/presentation/d/18dMncB442LO0MfCSjGPwjgrvGJ67I_YiVBLtqpCVnfs/edit#slide=id.g32ebc520ab_0_5)
[#65 資料庫引擎的交易資料鎖定 (Lock) 策略](http://www.woolycsnote.tw/2017/11/65-lock.html)
[SQL是什麼? 初學者必須知道的懶人包](https://kuochingsouthen.com/what-is-sql/)
[什麼是 NoSQL？](https://aws.amazon.com/tw/nosql/)
[MySQL 基本運作介紹，從資料庫交易與 ACID 特性開始](https://tw.alphacamp.co/blog/mysql-intro-acid-in-databases)
[Wiki-ACID](https://zh.wikipedia.org/wiki/ACID)