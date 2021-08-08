## 六到十週心得與解題心得
### 前言
前面一開始都有跟著進度，到了第八周後，有點走心跑去玩了一下魔獸世界，整個六七月都空掉，目前在趕進度追回來，雖然說是趕進度但還是希望能做挑戰題就做，並且能學好，不是敷衍學過去，之前有寫一些前端，前面基本都算好跟進度，但是算是給自己重新打底子，預計能在八月底至少追到18周的進度。

### 六到十週心得
1. week6
  - 切版都還算能切到自己想到的位置, 不過細節還要加油, 在我電腦看沒問題, 換大一點解析度的就突然現出原形, 還有RWD部分有待加強
2. week7
  - 第七周有寫出挑戰題-輪播圖覺得滿有成就感的, 雖然覺得不是最佳解法, Todo List也花滿多時間在調整細節功能, 希望把功能做越完善越好
3. week8
  - 學習看API文件真的不容易, 而且看到的大部分都是 cURL 來示範, 花了點時間學習 cURL 的語法跟使用, 做出 Twitch 那份作業出來真的覺得很讚
4. week9
  - 本期課程終於進入後端階段, 之前有寫過一點 JAVA 對後端不算陌生, 比較不習慣是 PHP 使用 $當作參數開頭以及使用物件屬性的方式是使用 '->', 但整體相對 JAVA, PHP真的好上手很多

### 解題心得
1. 綜合能力測驗
  - 前半段都還算很直覺得找出來，直到最後的變數沒有想到是 SHA-1 編譯的數字，想了滿長一段時間後來放棄找前人的心得後順利找出，當下應該先把字串拿去 google 很快就獲得解答了
2. r3:0 異世界網站挑戰
  - Lv0 看完對話，query string 傳入 token 即可
  - Lv1 要將 '100101001001100001110' 轉換成18進位, 直接下了 toString(18), 後來才發現要先把2進位的轉換成10進位在使用 toString 去轉換
  - Lv2 F12找到 class="hide" 的 token
  - Lv3 F12找到註解的 token
  - Lv4 把遮罩的 ::after content 移掉, 或直接看 javascript 原始碼XD
  - Lv5 一開打被跳轉到 Lv6並 GameOver, 一開始猜是 redirect, 檢查 Network 看到收到 Lv5.php 是 200 不是 301 or 302, 使用 POST MAN 打開 Lv5, 首頁就有 token (利用瀏覽器以外的工具打開網頁且不會執行JS的特性), 並看一下 Lv5.js 使用了 window.location 把網址換掉了, 快速跳轉停止載入頁面也可以, 甚至可以禁止 js 執行也可以破關
  - Lv6 在 window 裡面找 IamToken 屬性就是 token  (找好久沒找到, 這題看攻略才找到, 實在眼殘)
  - Lv7 根據提示很快找到 cookie 即破關
  - Lv8 根據提示尋找 response , 在 header 找到 Tokenisme
  - Lv9 看到 ord() 這個函數 先去GOOGLE: php ord, 得知可以獲去 ASCII , 花了很長時間推導一下找出 'aaccddii'
  - Lv10 提到不是異世界的人, 並說工具人, 到 devTool Network 看到有一條 call api 有錯誤, 使用 post man 並用 post 方式成功拿到 token ={sosdan}
  - Lv11 點到異世界八卦版, 有一個比較特殊是已刪除, 只有管理員才能觀看, 一開始試著先把 class 的 admin 移除還是沒作用, 點開 js 原始碼, 有 api 網址, 帶上id=888888 後取得 token={fakeituntilyoumakeit}
  - Lv12 先點到 cookie 查看 token 是 "do_you_really_know_how_to_set_cookie?", 想到應該去看 response 的 set-Cookie, 找到 Comment=real_token_is:{you_are_cookie_master}
  - Lv13 試了很久才猜出... 5371 , 發現 1.3.5.7 特別慢
  - Lv14 又是數學題~ 數學太爛了  看一下攻略總算湊出來
  - Lv15 破關~~ 不得不說 minw 助教真的很厲害 想得出這樣的題目