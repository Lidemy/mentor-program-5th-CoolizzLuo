/* eslint-disable */

import { getComments, addComment } from './api'
import { escapeHtml } from './utils'
import { getFormTemplate, CARD_TEMPLATE, CSS_TEMPLATE } from './templates'

export function init(options) {
  const { siteKey, apiUrl, container } = options

  const containerElement = document.querySelector(container)
  containerElement.innerHTML = getFormTemplate(siteKey)
  const formEl = document.querySelector(`.${siteKey}-board-form`)
  const moreBtnEl = document.querySelector(`.${siteKey}-btn-more`)
  const styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  styleElement.appendChild(document.createTextNode(CSS_TEMPLATE))
  document.head.appendChild(styleElement)

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

  function handleError(msg) {
    console.error(msg)
    alert('Oops! something wrong.')
  }

  function render() {
    const result = COMMENTS.data.reduce((pre, cur) => {
      const str = CARD_TEMPLATE
        .replace('$nickname', escapeHtml(cur.nickname))
        .replace('$content', escapeHtml(cur.content))
      return (pre += str)
    }, '')
    document.querySelector(`.${siteKey}-comments`).innerHTML = result
  }

  function handleMoreBtn(bool) {
    bool ? moreBtnEl.classList.add('d-none') : moreBtnEl.classList.remove('d-none')
  }

  function getNewComments(page = 1) {
    getComments(apiUrl, siteKey, (data) => {
      if (!data.ok) return handleError(data.message)
      COMMENTS.data = page === 1 ? data.discussions : [...COMMENTS.data, ...data.discussions]
      COMMENTS.page = page
      handleMoreBtn(page === data.totalPage)
    }, page) 
  }

  function addNewComments(formData) {
    addComment(apiUrl, formData, (data) => {
      if (!data.ok) return handleError(data.message)
      getNewComments(COMMENTS.page)
    })
  }

  formEl.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = new URLSearchParams()
    data.append('site_key', siteKey)
    for (const pair of new FormData(e.target)) {
      data.append(pair[0], pair[1])
    }
    addNewComments(data)
    formEl.reset()
  })
  
  moreBtnEl.addEventListener('click', () => getNewComments(++COMMENTS.page))
  getNewComments(COMMENTS.page)
}
