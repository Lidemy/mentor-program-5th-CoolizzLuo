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
        <p class="stream__channel">$name</p>
      </div>
    </div>
  </a>
  `
const navEl = document.querySelector('.navbar__nav')

function sendRequest(endPoint, callback) {
  const request = new XMLHttpRequest()
  request.open('GET', `${API_URL}${endPoint}`, true)
  request.setRequestHeader('Accept', ACCEPT)
  request.setRequestHeader('Client-ID', CLIENT_ID)
  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      callback(JSON.parse(this.response))
    }
  }
  request.send()
}

function renderNav(data) {
  const gameList = data.top
  navEl.innerHTML = gameList.reduce((acc, cur) => `${acc}<li>${cur.game.name}</li>`, '')
  selectGame(gameList[0].game.name)
}

function renderStream(streams) {
  // console.log(streams)
  const str = streams.streams.reduce((acc, stream) => {
    const temp = STREAM_TEMPLATE
      .replace('$url', stream.channel.url)
      .replace('$preview', stream.preview.large)
      .replace('$logo', stream.channel.logo)
      .replace('$title', stream.channel.status)
      .replace('$name', stream.channel.name)
    return acc + temp
  }, '')
  document.querySelector('.streams').innerHTML = str
}

function selectGame(gameName) {
  document.querySelector('h1').innerText = gameName
  sendRequest(`/streams?game=${encodeURIComponent(gameName)}`, renderStream)
}

navEl.addEventListener('click', (e) => {
  if (e.target.nodeName === 'LI') selectGame(e.target.textContent)
})

sendRequest('/games/top?limit=5', renderNav)
