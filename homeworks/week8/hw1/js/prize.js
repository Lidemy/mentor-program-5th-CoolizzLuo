const prizeEl = document.querySelector('.prize')
const prizeIndex = prizeEl.querySelector('.content')
const prizeResult = prizeEl.querySelector('.result')
const prizeText = prizeResult.querySelector('h2')
const apiUrl = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery'
const errorMsg = '系統不穩定，請再試一次'

const prizeArr = {
  FIRST: {
    title: 'FIRST',
    text: '恭喜你中頭獎了！日本東京來回雙人遊！',
    class: 'prize-first'
  },
  SECOND: {
    title: 'SECOND',
    text: '二獎！90 吋電視一台！',
    class: 'prize-second'
  },
  THIRD: {
    title: 'THIRD',
    text: '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！',
    class: 'prize-third'
  },
  NONE: {
    title: 'NONE',
    text: '銘謝惠顧',
    class: 'prize-none'
  }
}

const lsTool = {
  load() {
    return JSON.parse(window.localStorage.getItem('statistics'))
  },
  save(data) {
    window.localStorage.setItem('statistics', JSON.stringify(data))
  }
}

const statistics = lsTool.load() || { ALL: 0 }

const state = {
  loading: false,
  prize: undefined
}

function errorHandler() {
  alert(errorMsg)
}

function getPrize() {
  if (state.loading) return
  state.loading = true
  fetch(apiUrl)
    .then((res) => (res.ok ? res.json() : errorHandler()))
    .then((res) => {
      state.loading = false
      state.prize = prizeArr[res.prize]
      console.log(state.prize)
      state.prize ? render() : errorHandler()
    })
    .catch((err) => console.log(err))
}

function render() {
  if (!state.prize) return
  if (prizeResult.classList.contains('hide')) {
    prizeIndex.classList.add('hide')
    prizeResult.classList.remove('hide')
  }
  prizeEl.className = `prize ${state.prize.class}`
  prizeText.textContent = state.prize.text

  // 統計機率
  statistics.ALL++
  statistics[state.prize.title] ? statistics[state.prize.title]++ : statistics[state.prize.title] = 1
  lsTool.save(statistics)
}

function goBackPrize() {
  prizeEl.className = 'prize'
  prizeIndex.classList.remove('hide')
  prizeResult.classList.add('hide')
}

function showStats() {
  let str = `抽獎次數: ${statistics.ALL}\r\n`
  Object.keys(statistics).forEach((key) => {
    if (key === 'ALL') return
    str += `${key} 次數: ${statistics[key]} 機率: ${((statistics[key] / statistics.ALL) * 100).toFixed(2)}%\r\n`
  })
  alert(str)
}

document.querySelector('.get-prize').addEventListener('click', getPrize)
document.querySelector('.go-back').addEventListener('click', goBackPrize)
document.querySelector('.show-stats').addEventListener('click', showStats)
