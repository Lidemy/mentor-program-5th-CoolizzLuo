## 什麼是 Ajax？
1. Ajax ( Asynchronous JavaScript and XML ) 非同步的 JavaScript 與 XML 技術，是 JavaScript 以「非同步」方式與伺服器交換資料的統稱，網頁不須換頁，就能即時更新渲染畫面。
2. Ajax 早期都是以 XML 為資料格式，現在多用 JSON 格式。

## 用 Ajax 與我們用表單送出資料的差別在哪？
1. 使用 Ajax 可以在不刷新整個網頁的情況下取得 response, 表單需要重新刷新網頁的同步載入
2. 使用 Ajax 需要瀏覽器支援 JavaScript 

## JSONP 是什麼？
1. 利用 script 或  img 這兩個標籤沒有跨網域的限制，透過標籤讀取網頁的 JS 資訊，再透過指定的 function 進行輸出，就能夠拿到想要的資料。


## 要如何存取跨網域的 API？
1. 使用後端方式發 request
2. 請 API 提供者開放跨網域（CORS） 在 response header 加上 `access-control-allow-origin: *`

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
1. 因為之前是直接從電腦發送 request，這周使用 JavaScript 是多透過瀏覽器去發送 request，再取得 response 時，瀏覽器會因為安全性而且跨網域的限制