const API_URL = 'https://api.twitch.tv/kraken'
const ACCEPT = 'application/vnd.twitchtv.v5+json'
const CLIENT_ID = 'gomk5kk4708v0xcoaiqlaihf95wk9a'
const STREAM_TEMPLATE = `
  <a class="stream" href="$url" target="_blank">
    <img src="$preview">
    <div class="stream__info">
      <div class="stream__avatar">
        <img src="$logo">
      </div>
      <div class="stream__intro">
        <h3 class="stream__title">$title</h3>
        <p class="stream__channel">$name / $viewers viewers</p>
      </div>
    </div>
  </a>
  `
const BASE_LIMIT = 20
const state = {
  game: undefined,
  temp: '',
  offset: 0
}
const navEl = document.querySelector('.navbar__nav')
const loadBtn = document.querySelector('.load')
const streamsEl = document.querySelector('.streams')

function sendRequest(endPoint, callback) {
  // const request = new XMLHttpRequest()
  // request.open('GET', `${API_URL}${endPoint}`, true)
  // request.setRequestHeader('Accept', ACCEPT)
  // request.setRequestHeader('Client-ID', CLIENT_ID)
  // request.onload = function() {
  //   if (this.status >= 200 && this.status < 400) {
  //     console.log(JSON.parse(this.response))
  //     callback(JSON.parse(this.response))
  //   }
  // }
  // request.send()

  const option = {
    headers: {
      Accept: ACCEPT,
      'Client-ID': CLIENT_ID
    }
  }

  fetch(`${API_URL}${endPoint}`, option)
    .then((res) => res.json())
    .then((res) => callback(res))
    .catch((err) => console.log(err))
}

function renderNav(data) {
  const gameList = data.top
  navEl.innerHTML = gameList.reduce((acc, cur) => `${acc}<li>${cur.game.name}</li>`, '')
  selectGame(gameList[0].game.name)
}

function renderStream(streams) {
  // 如果回傳陣列為 0 , 把載入更多的按鈕隱藏
  streams.streams.length ? loadBtn.classList.remove('hide') : loadBtn.classList.add('hide')
  const str = streams.streams.reduce((acc, stream) => acc + STREAM_TEMPLATE
    .replace('$url', stream.channel.url)
    .replace('$preview', stream.preview.large)
    .replace('$logo', stream.channel.logo)
    .replace('$title', stream.channel.status)
    .replace('$name', stream.channel.name)
    .replace('$viewers', stream.viewers), '')
  state.offset ? (state.temp += str) : (state.temp = str)
  streamsEl.innerHTML = state.temp
  addBlankStream()
}

function addBlankStream() {
  streamsEl.innerHTML += '<div class="stream blank"></div>'.repeat(3 - streamsEl.childElementCount % 3)
}

function selectGame(gameName) {
  if (gameName === state.game) {
    state.offset += BASE_LIMIT
  } else {
    document.querySelector('h1').innerText = gameName
    state.game = gameName
    state.offset = 0
  }
  sendRequest(`/streams?game=${encodeURIComponent(gameName)}&offset=${state.offset}&limit=${BASE_LIMIT}`, renderStream)
}

navEl.addEventListener('click', (e) => {
  if (e.target.nodeName === 'LI' && e.target.textContent !== state.game) selectGame(e.target.textContent)
})
loadBtn.addEventListener('click', (e) => selectGame(state.game))

sendRequest('/games/top?limit=5', renderNav)
