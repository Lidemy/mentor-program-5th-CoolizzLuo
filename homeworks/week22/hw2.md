# React Hook

# 基礎 Hook

## useState

useState 關注在狀態的改變

### 寫法

```
const [state, setState] = useState(default)
```

### 說明

- state 代表原狀態，setState 代表改變後狀態，而 useState 後放預設值
- `useState` 會回傳一個包含兩個值的 array，第一個值是 state、第二個值是用來更新 state 的函式，**每當 state 值改變，就會觸發 re-render**，沒改變則不會 re-render。
- 可以宣告多個 state 變數

### 還有這樣的區別

- Pass the state
  - 寫法 `setCount(count + 1)`
  - 每次都會重新跑（會覆蓋掉上次）
- Pass the function
  - 寫法 `setCount(prev => prev + 1)`
  - 只跑第一次（不會覆蓋，建議都這樣寫）

---

## useEffect

useEffect 用於非同步請求時

### 寫法

```
useEffect() => { ,[]}
```

### 說明

- 任何會產生 side Effect 的行為都應該 Effect Hook 裡執行
- 跟 `componentDidMount`、`componentDidUpdate`、 `componentWillUnmount` 有著同樣的宗旨，但整合進一個單一的 API
- **after rendering** 才會執行
- `useEffect` 的第二個參數
  1. 什麼都不傳：render 後執行
  2. 傳空陣列 `[]`：render 後只執行一次
  3. 傳有變數的陣列 `[變數]`：render 後這個變數有改變才會執行

#### 副作用 side Effect

官方文件說明，副作用指我們曾在 React component 做過 fetch 資料、訂閱、或手動改變 DOM，這些操作就稱 side effect（簡稱 effect）因為他們可以影響其他 component 且在 render 期間無法完成。

---

## useContext

useContext 讓父子層之間不用手動一層一層傳遞

### 寫法

```
const value = useContext(MyContext);
```

### 說明

- context 中的 `Provider` `consumer` 在 hook、class 中皆可使用
- useContext 的參數必需為 context object 自己
- ` useContext(MyContext)` 只能讀取 context 及訂閱其變更，還是要在 tree 的上層使用 `<MyContext.Provider>` 來提供 context 的值。

---

# 讓寫法優化的 Hook

## useMemo

useMemo 根據改變的值重新計算結果，值沒改變則不觸發狀態改變

### 寫法

```
const check = useMemo(() => {
    let sum = 0;
    for(let i = 0; i<ocunt*100; i++) {
        sum +=1;
    }
    return sum;
}, [count]);
```

### 說明

- useMemo 再渲染時執行，不是渲染後（與 useEffect 區別），所以不建議做副作用相關操作
- `useMemo` 的第二個參數
  1. 什麼都不傳：每次更新就重新計算
  2. 傳空陣列 `[]`：只會計算一次
  3. 傳有變數的陣列 `[變數]`：這個變數有改變才會重新計算

---

## useCallback

useCallback 是 useMemo 語法糖，能用 useCallback 實現的，都可以用 useMemo
`useCallback(fn, deps)` 相當於 `useMemo(()=>fn,deps)`

### 寫法

```
useCallback(fn, deps) =  useMemo(() => fn, deps)
```

![](https://i.imgur.com/9HAppoB.png)

### 說明

- 兩者差別，`useMemo` 調用且返回結果，`useCallback` 只返回結果

### 情境

父子組件，子組件接收一個函數做為 props，一般父子組件會一起更新，但有時候子組件沒有更新必要，這時候使用 useCallback 來避免子組件不必要的更新。（借助 useCallback 返回函數，然後把這個函數作為 props 傳給子組件）

---

## useRef

useRef 直接取到指定子層值

### 寫法

```
const refContainer = useRef(initialValue);
```

### 說明

- 類似於類組件 `this.xxx` 寫法

---

## useReducer

useReducer 類似 redux 功能，比起 useState 適合寫更複雜邏輯且含多個子值

### 寫法

```
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

### 說明

- useReducer 的三個參數
  1. reduce：類似`（state, action）=> newState` 的函數，傳上一個 state 跟本次的 action
  2. state：初始狀態（默認值）
     ```
       const [state, dispatch] = useReducer(
         reducer,
         {count: initialCount}
       );
     ```
  3. 惰性初始化：將計算 state 的邏輯拿到 reducer 外，對之後重置 state 的 action 很方便
- 可以傳遞 dispatch 而不是 callback

---

## useLayoutEffect

useLayoutEffect 裡的 callback 函数在 DOM 更新完成後立即執行，但是在瀏覽器渲染前執行完成，阻塞瀏覽器繪製

> 與 useEffect 結構相同，只是執行時機不同而已

### 說明

- 與 useEffect 不同之處 — 執行時間
  - DOM 更新 -> render -> useEffect
  - DOM 更新 -> useLayoutEffect -> render

---

## useImperativeHandle

useImperativeHandle 可以讓使用 ref 時能向父 component 暴露自定義的 instance 值

### 寫法

```
useImperativeHandle(ref, createHandle, [deps])
```

---

## useDebugValue

useDebugValue 可以用來在 React DevTools 中顯示自訂義 hook 的標籤

### 寫法

```
useDebugValue(value)
```

### 說明

- 不建議在每個自定義 Hook 都加上 debug 值，它在自定義 Hook 的共享函式庫中才是最有價值的

---

### 自定義 Hook

當我們想重用相同邏輯的組件時，可以自己寫一個 Hook

---

# 資料來源

- [React Doc](https://zh-hant.reactjs.org/docs/hooks-reference.html)
- [hook 大全](https://blog.csdn.net/qq_41064597/article/details/119175873)
- [hannah hook](https://medium.com/hannah-lin/react-hook-%E7%AD%86%E8%A8%98-%E5%BE%9E%E6%9C%80%E5%9F%BA%E6%9C%AC%E7%9A%84-hook-%E9%96%8B%E5%A7%8B-usestate-useeffect-fee6582d8725)

---

# Class Component

要定義一個 React component class，需要繼承（extend）React.Component

### 寫法

```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

# 先上生命週期

[先上圖](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
![](https://i.imgur.com/D8uILGJ.png)

## Mounting

當一個組件的 instance 被建立且加入 DOM，生命週期會依照下面順序呼叫

- constructor
- static getDerivedStateFromProps()
- render()
- componentDidMount()

## Updating

當 prop 或 state 有變化時，就會 updating，當一個組件被重新 render 時，生命週期將會依照下面順序呼叫

- static getDerivedStateFromProps()
- shouldComponentUpdate()
- render()
- getSnapshotBeforeUpdate()
- componentDidUpdate()

## Unmounting

當一個組件被從 DOM 中移除時會呼叫

- componentWillUnmount()

## error

當組件在 render 過程、生命週期、或在某個子組件的 constructor 中發生錯誤時會呼叫

- static getDerivedStateFromError()
- componentDidCatch()

---

# 常用的生命週期方法

## constructor()

一個 React component 的 constructor 會在其被 mount 之前被呼叫

> 幫 React.Component subclass 建立 constructor 時，要在其他任何宣告之前呼叫 super(props)，不然 this.props 在 constructor 中的值會出現 undefined

### 寫法

```
constructor(props)
```

### 說明

- 透過指定一個 this.state 物件來初始化內部 state
- 為 event handler 方法綁定 instance
- 不要在 constructor() 中呼叫 setState()，想用內部 state，就在 constructor 把最初的 state 指定為 this.state
- 避免在 constructor 中產生任何 side effect 或 subscription

---

## componentDidMount()

組件被 mount（加入 DOM tree 中）後，componentDidMount() 會馬上被呼叫

### 寫法

```
componentDidMount()
```

### 說明

- 要 DOM 節點初始化寫在這
- 在這請求資料
- 這裡適合設立任何 subscription（但後續要取消）
- 可以馬上呼叫 setState()，呼叫會觸發一次額外的 render，但會在瀏覽器更新螢幕之前發生（謹慎使用）

---

## componentDidUpdate()

componentDidUpdate() 會在更新後馬上被呼叫（不會在初次 render 時被呼叫）

### 寫法

```
componentDidUpdate(prevProps, prevState, snapshot)
```

### 說明

- 這裡也適合做網路請求
- 可以馬上呼叫 setState()，但為它設置條件不然會無限迴圈

---

## componentWillUnmount()

componentWillUnmount() 會在ㄧ個組件被 unmount 和 destroy 後馬上被呼叫

### 寫法

```
componentWillUnmount()
```

### 說明

- 這裡可以做一切的清除，像是取消計時器、網路請求、移除任何在 componentDidMount() 內建立的 subscription
- 不要呼叫 setState()，因為這裡不會再重新 render，當一個組件的 instance 被 unmount 後，就永遠不會再被 mount。

---

# 比較不常用的生命週期方法

## shouldComponentUpdate()

用 shouldComponentUpdate() 來讓 React 知道一個組件的 output 並不會被目前在 state 或 prop 內的改變所影響

> React 的預設行為是每當 state 有所改變時就重新 render，大多情況下按照這個預設行為。

### 寫法

```
shouldComponentUpdate(nextProps, nextState)
```

### 說明

- 這方法是為了效能最佳化

---

## static getDerivedStateFromProps()

getDerivedStateFromProps 會在一個組件被 render 前被呼叫

### 寫法

```
static getDerivedStateFromProps(props, state)
```

### 說明

- 每一次 render 時都會被觸發
- 這個方法是為了某些很少見的例子而存在的，像是有時 state 會依賴 prop 在一段時間過後所產生的改變

---

## getSnapshotBeforeUpdate

getSnapshotBeforeUpdate() 在提交最新 render 的 output 之前立即被調用

### 寫法

```
getSnapshotBeforeUpdate(prevProps, prevState)
```

### 說明

- 這個方法回傳的任何值會被當作一個參數傳遞給 componentDidUpdate()。

### 情境

在像是對話串這類需要以某種特殊方式處理滾動軸位置的 UI 中出現

---

## static getDerivedStateFromError()

在某個錯誤被一個 descendant component 拋出後被呼叫，接收該錯誤為其參數並回傳一個值以更新 state

### 寫法

```
static getDerivedStateFromError(error)
```

---

## componentDidCatch()

會在某個錯誤被一個 descendant component 拋出後被呼叫

### 寫法

```
componentDidCatch(error, info)
```

### 說明

- 接收兩個參數
  - error：被拋出的錯誤
  - info

---

# 資料來源

[React Doc](https://zh-hant.reactjs.org/docs/react-component.html#constructor)

---

## 請問 class component 與 function component 的差別是什麼？

## Class Component

### 寫法

複雜，繼承 React.Component，constructor 中接受 props 参數

```
class App extends React.Component{
    constructor(props){
      super(props);
      this.state = {}
    }
}
render(){
  return(
    <div class="App"></div>
  )
}
```

### 說明

- 要繼承 React.Component
- 有生命週期，可以針對某些情境決定是否渲染
- 有 this
- 每次都可以拿到最新的 this.props，因為 this 隨時都在變化

---

## Function Component

### 寫法

簡單直接，接受 props 作為参數

```
function App(props){
   return(
     <div class="App"></div>
   )
 }
```

### 說明

- 可以用 arrow function 或是一般的 function 宣告
- 編譯更快 (因為 Class 是 ES6 出的新方法)
- 沒有 this
- props 會一直是原本傳進來的那個，不會跟著更新，閉包的概念

---

## 資料來源

- [React class & function component 的區別](https://www.jianshu.com/p/d90235fa69c2)
- [React Functional Component 與 Class Component 的差異](https://medium.com/coding-hot-pot/react-functional-component-v-s-class-component-e46c6dc5a319)
- [從實際案例看 class 與 function component 的差異](https://blog.techbridge.cc/2020/06/13/class-function-component-and-useeffect/)

---

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

### 差在 Component 的資料是否被 React 控制

- uncontrolled component 的資料由 DOM 控制
- controlled component 的資料由 React 控制

### 以表單舉例

- controlled component：居住城市 > 下拉選單（值已經固定，選一個就行）
  - 用 ref 從 DOM 獲取表單值，而不是為每個狀態更新編寫事件處理程序
- uncontrolled component：居住城市 > 自由填寫（值不固定，容易得到預期外值，所以要加以條件處理）
  - 為每個狀態更新編寫事件處理程序

---

## 資料來源

- [uncontrolled-components](https://reactjs.org/docs/uncontrolled-components.html)
- [controlled-components](https://reactjs.org/docs/forms.html#controlled-components)