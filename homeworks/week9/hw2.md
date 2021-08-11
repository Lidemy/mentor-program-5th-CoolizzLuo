## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼
varchar： 可以存放無論英文還是非英文的資料，儲存大小為輸入資料的位元組的實際長度，並且可設置最大長度，可以存放最大長度為 65532 byte。
text：基本上大致和 varchar 相同，些許的差別是，無法設置最大長度，且可存放的最大長度是2的16次方-1，讀取速度比 varchar 慢。

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？
Cookie 是一種小型文字檔案，指某些網站為了辨別使用者身分而儲存在用戶端（Client Side）上的資料（通常經過加密）。
伺服器透過 header 的屬性 Set-Cookie，把使用者的狀態紀錄成儲存在使用者電腦裡的 Cookie。
瀏覽器在發 request 的時候，會在 request header 帶上 Cookie 的資訊供 Server 讀取。


## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？
密碼沒有被加密，容易被獲取

