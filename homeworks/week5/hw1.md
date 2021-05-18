## 前四週心得與解題心得

### week1
第一周比較多適用文字表達，雖然 git 與 cli 覺得自己會用了，但會用與會教人有很大的差距，除了講出來也要讓人能夠了解，在寫完這周的教朋友使用 cli 與 git 後，很怕別人會看不懂，因此找了兩位朋友看完，覺得還可以，才敢提交這周的作業

### week 2
之前有寫過一些程式，所以這周的基本題不是太大問題，不過還是很仔細的再重新審視一次寫程式邏輯，這周有三個挑戰題，第一題還算順利，有查詢一下不同的演算法，第二題不使用 +-*/ 任一符號，這個比較卑鄙使用了 ascii + `eval()` 直接把題目解完，看了老師的做法覺得還要學的東西有很多

### week3
這周比較多時間都在刷 LIOJ，花了一些時間了解平台的輸入模式，一開始刷得很慢，有一部分是因為看題目看了很久，到中期開始看得比較快，因為很快找到重點，自己寫完後也有去看一下其他的做法，覺得很多做法都很厲害，不太會想到這種做法，但看多了後再後面的題目邊解會邊嘗試不一樣的解法，覺得受益良多

### week4
之前有利用 Java 架設過 api，當時也是用 restful 風格撰寫，所以還算是熟悉這周的東西，不過在於比較詳細的網路，利用 http 協定，tcp 這塊就滿不熟悉，也是重新再加強自己的基礎

### Lidemy HTTP Challenge
lv1~lv10部分比較算是前菜，花比較久時間是在轉換 base64，不過還算好理解，第一次接觸到使用要花一點時間，之後再遇到就算忘了去 google ，也能很快地上手使用

一開始再查詢的時候找到的方法為 `window.btoa()`，不過在 node 執行環境下是沒有 window 的，必須使用 `Buffer.from()`，為此寫了一個轉換的函式，判斷如果執行環境下可以找到 window 就使用 `window.btoa()`，找不到就使用 `Buffer.from()`
```javascript=
function convertBase64(str) {
	if(typeof window !== 'undefined') {
		return window.btoa(str)
	} else {
		return Buffer.from('admin:admin123').toString('base64')
	}
}
```

lv12 遇到會轉址兩次，一開始沒有注意到找了很久的 token，大概找了快半小，一度以為是自己帶錯參數，後來放棄去找尋以往學長姐做過的心得，才恍然大悟，馬上找到需要的 token

### 1016
[題目](https://oj.lidemy.com/problem/1016)

#### 心得
1. 先把輸入的資料轉換成一個陣列及物件，分別記錄人的選項順序及A與B的數量
2. 把 peace 的情況先排除，有以下三種情境為 peace
    - A 與 B 的數量相等 ( A == B)
    - A 為 0 
    - B 為 0
3. 如果都沒 Peace，先判斷不合群的為 A 還是 B
4. 對陣列跑迴圈找出等於不合群 value 的 arr index + 1

#### 程式碼
```javascript=
function solve(lines) {
    const people = Number(lines[0]);
    const arr = [];
    const result = { A: 0, B: 0};
    for(let i = 1; i <= people; i++) {
        lines[i] === 'A' ? result['A']++ : result['B']++;
        arr.push(lines[i]);
    }

    // 如果A與B人數相等，A或B為0，則沒有不合群的人
    if(result['A'] === result['B'] || !result['A'] || !result['B']) return console.log('PEACE');
    const loserValue = result['A'] > result['B'] ? 'B' : 'A';
    arr.forEach((value, index) => {
        if(value === loserValue) console.log(index+1);
    })
}
```


### 1017
[題目](https://oj.lidemy.com/problem/1017)

#### 心得
1. 把輸入資料轉換成陣列 (只存放物品價值的)
2. 對陣列做排序 (使用 sort 大排到小)
3. 使用迴圈加總 從第一項到最大能偷的件數
4. 印出加總後的數值

#### 程式碼
```javascript=
function solve(lines) {
  let limit = Number(lines[0]);
  const length = Number(lines[1]);
  const arr = [];
  let result = 0;
  for (let i = 2; i < length + 2; i++) {
    arr.push(Number(lines[i]))
  }
  arr.sort((a, b) => b - a);
  for (let i = 0; i < limit; i++) {
    result += arr[i]
  }
  console.log(result);
}
```

### 1018
[題目](https://oj.lidemy.com/problem/1018)

#### 心得
1. 逐一加總每個平台的數量
2. 轉換平台時，比對此平台的加總有無超過目前記錄最大值，有超過則把當初數值紀錄為最大值
3. 跑完後把最大值(max)印出
#### 程式碼
```javascript=
function solve(lines) {
  const arr = lines[1].split(' ').map(Number);
  let temp = 0;
  let result = 0;
  let max = 0;

  arr.forEach((num) => {
    if (num !== temp) {
      temp = num;
      result = 0;
    }
    result++;
    if (result > max) max = result;
  });
  console.log(max);
}
```


