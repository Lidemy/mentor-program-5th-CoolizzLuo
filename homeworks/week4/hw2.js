const API = 'https://lidemy-book-store.herokuapp.com'
const request = require('request')

const bookAPI = {
  list() {
    const limit = 20
    request.get(`${API}/books?_limit=${limit}`, (err, res, body) => {
      if (err) return console.log('catch error', err)
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const bookData = JSON.parse(body)
        this.render(bookData)
      }
    })
  },
  read(id) {
    request.get(`${API}/books/${id}`, (err, res, body) => {
      if (err) return console.log('catch error', err)
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const bookData = JSON.parse(body)
        this.render(bookData)
      } else {
        console.log(`can't find ${id}`)
      }
    })
  },
  create(name) {
    request.post(
      {
        url: `${API}/books`,
        form: { name }
      },
      (err, res, body) => {
        if (err) return console.log('catch error', err)
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const bookData = JSON.parse(body)
          this.render(bookData)
        }
      }
    )
  },
  delete(id) {
    request.delete(`${API}/books/${id}`, (err, res, body) => {
      if (err) return console.log('catch error', err)
      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log(`delete book id:${id} ok`)
      } else {
        console.log(`can't find book id:${id}`)
      }
    })
  },
  update(id, name) {
    request.patch(
      {
        url: `${API}/books/${id}`,
        form: { name }
      },
      (err, res, body) => {
        if (err) return console.log('catch error', err)
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const bookData = JSON.parse(body)
          this.render(bookData)
        } else {
          console.log(`can't find book id:${id}`)
        }
      }
    )
  },
  render(bookData) {
    if (bookData.length) {
      for (const book of bookData) {
        console.log(`${book.id} ${book.name}`)
      }
    } else {
      console.log(`${bookData.id} ${bookData.name}`)
    }
  }
}

const action = process.argv[2]
const param1 = process.argv[3]
const param2 = process.argv[4]

try {
  bookAPI[action](param1, param2)
} catch (error) {
  console.log("can't find action")
}
