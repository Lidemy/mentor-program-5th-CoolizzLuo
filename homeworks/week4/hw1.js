const request = require('request')

const API = 'https://lidemy-book-store.herokuapp.com'
const limit = 10

request(`${API}/books?_limit=${limit}`, (err, res, body) => {
  if (err) return console.log('catch error', err)
  if (res.statusCode >= 200 && res.statusCode < 300) {
    const data = JSON.parse(body)
    for (const book of data) {
      console.log(`${book.id} ${book.name}`)
    }
  }
})
