## 請以自己的話解釋 API 是什麼
全名為 Application Programming Interface (應用程式介面)，提供一個"介面"開放給外部想要拿取程式資料做使用，而且不是直接操作讀取程式本身，通常開放 CRUD 功能，比較常用到的是透過 http 傳輸，並以 restful 風格撰寫 api

## 請找出三個課程沒教的 HTTP status code 並簡單介紹
1. 400 Bad Request
   * 該請求為無效的語法 
2. 405 Method Not Allowed
   * 表示該請求的方法沒有被允許使用
3. 414 URI Too Long
   * 請求的 URI 請求超過伺服器願意解析的長度
4. 505 HTTP Version Not Supported (en-US)
   * 請求使用的 HTTP 版本不被伺服器支援

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

| 說明     | Method | path       | 參數                   | 範例             |
|--------|--------|------------|----------------------|----------------|
| 獲取所有餐廳 | GET    | /restaurants     | _limit:限制回傳資料數量           | /restaurants?_limit=5 |
| 獲取單一餐廳 | GET    | /restaurant/:id | 無                    | /restaurant/10      |
| 新增餐廳   | POST   | /restaurant     | name: 餐廳名 | 無              |
| 刪除餐廳   | DELETE   | /restaurant/:id     | 無 | 無              |
| 更改餐廳   | PATCH   | /restaurant/:id     | name: 餐廳名 | 無              |