(() => {
  const SITE_KEY = 'coolizz'
  // const API_URL = 'http://localhost/week12/board-api'
  const API_URL = 'https://mentor-program.co/mtr04group4/enzo/week12/board-api'
  const CARD_TEMPLATE = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">$nickname</h5>
        <p class="card-text">$content</p>
      </div>
    </div> `
  const COMMENTS = {
    _data: [],
    page: undefined,
    get data() {
      return this._data
    },
    set data(value) {
      this._data = value
      render()
    }
  }
  const formEl = document.querySelector('.board-form')
  const moreBtnEl = document.querySelector('.btn-more')

  function render() {
    const result = COMMENTS.data.reduce((pre, cur) => {
      const str = CARD_TEMPLATE
        .replace('$nickname', escapeHtml(cur.nickname))
        .replace('$content', escapeHtml(cur.content))
      return (pre += str)
    }, '')
    document.querySelector('.comments').innerHTML = result
  }

  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }

  function handleError(msg) {
    handleLoad(false)
    console.error(msg)
    alert('Oops! something wrong.')
  }

  function handleLoad(bool) {
    // true: open, false: close
    const el = document.querySelector('.load')
    bool ? el.classList.add('loading') : el.classList.remove('loading')
  }

  function handleMoreBtn(bool) {
    bool ? moreBtnEl.classList.add('d-none') : moreBtnEl.classList.remove('d-none')
  }

  function addComment(formData) {
    handleLoad(true)
    const option = {
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'post'
    }
    fetch(`${API_URL}/add_comment.php`, option)
      .then((res) => {
        handleLoad(false)
        return res.json()
      })
      .then((res) => {
        if (!res.ok) return handleError(res.message)
        getComments()
      })
      .catch((res) => handleError(res))
  }

  function getComments(page = 1) {
    handleLoad(true)
    fetch(`${API_URL}/get_comments.php?site_key=${SITE_KEY}&page=${page}`)
      .then((res) => {
        handleLoad(false)
        return res.json()
      })
      .then((res) => {
        if (!res.ok) return handleError(res.message)
        COMMENTS.data = page === 1 ? res.discussions : [...COMMENTS.data, ...res.discussions]
        COMMENTS.page = page
        handleMoreBtn(page === res.totalPage)
      })
      .catch((res) => handleError(res))
  }

  formEl.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = new URLSearchParams()
    data.append('site_key', SITE_KEY)
    for (const pair of new FormData(e.target)) {
      data.append(pair[0], pair[1])
    }
    addComment(data)
    formEl.reset()
  })

  moreBtnEl.addEventListener('click', () => getComments(++COMMENTS.page))

  getComments()
})()
