const request = require('request')

const options = {
  url: 'https://api.twitch.tv/kraken/games/top',
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': 'gomk5kk4708v0xcoaiqlaihf95wk9a'
  }
}

request.get(options, (err, res, body) => {
  if (err) return console.log('catch error', err)
  if (res.statusCode >= 200 && res.statusCode < 300) {
    const data = JSON.parse(body)
    data.top.forEach((item) => console.log(formatGame(item)))
  } else {
    console.log("can't get data")
  }
})

function formatGame(item) {
  return `${item.viewers} ${item.game.name}`
}
