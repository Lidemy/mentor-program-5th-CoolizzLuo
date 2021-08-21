## Webpack 是做什麼用的？可以不用它嗎？
1. 原生的瀏覽器沒辦法打包 npm 安裝的模組，而 webpack 除了解決這個問題之外，還順便擴展了「模組」的定義，任何資源都可以視為一個模組，搭配強大的 loader 與 plugin 系統也可以做出更多有趣的事。
2. 可以，但如果有要使用的模組需要另外寫成 `<script type="module"></script>`裡面，再利用 ES6 語法，import進來，但有瀏覽器支援度限制。

## gulp 跟 webpack 有什麼不一樣？
Webpack 是一個**模組化打包工具**，而 Gulp 則是**任務管理工具**，Webpack 主要目的是把模組化的資源打包在一起，打包的過程可以處理一些你在設定檔裡面設定好的事情，而 Gulp 你可以依照當下的情況執行需要的任務，不用明明只是修改 SCSS 檔，卻要 Babel 全部的 JavaScript 檔，甚至可以把 Webpack 定義成一個 Gulp 的任務。

## CSS Selector 權重的計算方式為何？
### 先了解 CSS 的載入方式影響
在確認權重計算方式之前，可以先從載入的方式先看，而 CSS 的載入方式有三種
1. `TAG 行內載入`
   - `<h1 style="color: blue;">這是標題</h1>`
2. `HTML 內部載入`
```html
<head>
  <style>
    h1 { color: #ffffff; }
  </style>
</head>
```

3. `link 外部載入`
```html
<head>
  <link rel="stylesheet" href="style.css">
</head>
```
那麽，這三個套用方法，CSS 讀取時的優先順位是怎麼排的呢? 答案是以越直接的方式套用 CSS 優先權就越大：　行內(inline)套用CSS ＞ HTML內部載入CSS ＞ 外部載入CSS，而內部載入及外部載入還會受到，CSS載入順序影響，同樣的 Selector 下，後面載入的會蓋掉前面載入的 CSS

可以參考這張圖
![CSS](https://miro.medium.com/max/700/1*sN7G0rOAM3tVLsmL4Ew8cw.jpeg)

### 權重值的計算
* 權重值的表示通常為（ID, class, element)，也就是：

element selector ( 0 ,0, 1)
class selector ( 0, 1, 0)
ID selector ( 1, 0, 0)
> 如果在vsCode裡將游標移到選擇器上，也會顯示當下選擇器的權重值。可以看到下圖的.container為class selector，權重值就會是（ 0, 1, 0）：
![](https://i.imgur.com/LmlhPAk.png)

* 藉上述規則，我們可以用範例來驗證：
```html
<body>
  <h1 class="special" id="uniq">I am an H1</h1>
</body>
```

```css
  h1 {color: red}            /*權重值(0, 0, 1)*/
  body h1 {color: green}     /*權重值(0, 0, 2)*/
  h1.special { color: blue}  /*權重值(0, 1, 1)*/
  #uniq{ color: orange}      /*權重值(1, 0, 0)*/
```
權重值( 1, 0, 0) > 權重值( 0, 1, 1) > 權重值( 0, 0, 2) > 權重值( 0, 0, 1)
所以最後是由ID選擇器勝出，而顯示橘色。

![](https://i.imgur.com/0yuWxiY.png)

* 備註
如果是 inline style 的話，則大於以上使用的權重，但如果在後面使用 `!important` 則無視 inline style，只看出現的順序

* 心得
在了解 CSS 的權重計算後，也不難發現現在主流的 html css 已經很少使用 id 來設計樣式，把樣式都寫在 class 才是正確，並且要有良好習慣，並知道自己怎樣寫會蓋掉或蓋不掉的問題，非必要不要使用 `!important`，找到根本的權重問題才是治本的方式


## 參考資料
[MDN:CSS Selectors](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_Selectors)
[Day14 CSS：權重](https://ithelp.ithome.com.tw/articles/10221486)
[CSS的優先順位](https://medium.com/ui-ux%E7%B7%B4%E5%8A%9F%E5%9D%8A/css%E7%9A%84%E5%84%AA%E5%85%88%E9%A0%86%E4%BD%8D-cfb859e988bda)