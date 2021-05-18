const request = require('request')

const API = 'https://restcountries.eu/rest/v2/name'

request.get(`${API}/tai`, (err, res, body) => {
  if (err) return console.log('catch error', err)
  if (res.statusCode >= 200 && res.statusCode < 300) {
    const data = JSON.parse(body)
    data.forEach(renderCountry)
  }
})

function renderCountry(country) {
  console.log('============')
  console.log(`國家:${country.name}`)
  console.log(`首都:${country.capital}`)
  console.log(`貨幣:${country.callingCodes[0]}`)
  console.log(`國碼:${country.currencies[0].code}`)
}
