import { getAuthToken } from './utils'


const token = getAuthToken() || ''
const BASE_URL = process.env.REACT_APP_BASE_URL
const DEFAULT_OPTION = {
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${token}`
  },
}

const login = async (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    ...DEFAULT_OPTION,
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    })
  })
    .then(res => res.json())
}

const singUp = async (nickname, username, password) => {
  return fetch(`${BASE_URL}/register`, {
    ...DEFAULT_OPTION,
    method: 'POST',
    body: JSON.stringify({
      nickname,
      username,
      password
    })
  })
    .then(res => res.json())
}

const getUsers = async () => {
  return fetch(`${BASE_URL}/users`)
    .then(res => res.json())
}

const getMe = async () => {
  return fetch(`${BASE_URL}/me`, { ...DEFAULT_OPTION })
    .then(res => res.json())
}

const getPosts = async (sort = 'createdAt', order = 'desc') => {
  return fetch(`${BASE_URL}/posts?_sort=${sort}&_order=${order}`)
    .then(res => res.json())
}

const getPostById = async (id) => {
  return fetch(`${BASE_URL}/posts?id=${id}`)
    .then(res => res.json())
}

const addPost = async (title, body) => {
  return fetch(`${BASE_URL}/posts`, {
    ...DEFAULT_OPTION,
    method: 'POST',
    body: JSON.stringify({
      title,
      body,
    })
  })
    .then(res => res.json())
}

const removePostById = async (id) => {
  return fetch(`${BASE_URL}/posts/${id}`, { method: 'DELETE' })
    .then(res => res.json())
}

export {
  login,
  singUp,
  getMe,
  getUsers,
  getPosts,
  getPostById,
  addPost,
  removePostById,
}
