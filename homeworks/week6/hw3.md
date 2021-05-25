## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
1. `video` - 可在 HTML 中嵌入影片撥放器
2. `audio` - 可在 HTML 中嵌入音訊撥放器
3. `svg` - 用於標記可縮放的向量圖形

## 請問什麼是盒模型（box model）
![示意圖](https://i.imgur.com/2NNyvwJ.png)

> 所謂的 box model 是把每一個元素都可以視為一個模式，可以在 css 中使用 `box-sizing` 去調整模式，預設為 `content-box`，`content-box` 計算元素的寬高時，會把元素的寬度加上 `padding` 及 `border` 才是實際元素的寬高，而改成　‵border-box‵ 則是在設定 `width` 後，`padding` 及 `border` 都是向內推擠，提高 `padding` 及 `border` 並不會使元素變大，更方便設計者掌握元素的寬高。

## 請問 display: inline, block 跟 inline-block 的差別是什麼？
- `inline`
  1. 無法設定寬高
  2. 無法設定 margin、padding (對 bordr, backgroud 會起作用, 但不會影響其他元素位置)
  3. 不會換行 

- `block`
  1. 可以設定寬高，
  2. 可以設定 `margin`、`padding`
  3. 會換行 (會佔滿最大框度)

- `inline-block`
  1. 可以設定寬高，
  2. 可以設定 `margin`、`padding`
  3. 不會換行 

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
- `static`
  1. 網頁預設定位方式
  2. 無法使用 `top`、`right`、`bottom`、`left`、`z-index` 的屬性

- `relative`
  1. 相對於自己原本 `static` 的位置定位
  2. 可以使用 `top`、`right`、`bottom`、`left`、`z-index` 的屬性
  3. 不會影響其他元素的位置，只會改變自己的位置

- `absolute`
  1. 絕對定位，需要參考點(往上找查找 `position` 不為 `static` 的父元素，找到 body 為止)
  2. 可以使用 `top`、`right`、`bottom`、`left`、`z-index` 的屬性
  3. 元素脫離原本的排版，其他元素遞補其位置

- `fixed`
  1. 相對瀏覽器(viewport)的位置定位
  2. 可以使用 `top`、`right`、`bottom`、`left`、`z-index` 的屬性