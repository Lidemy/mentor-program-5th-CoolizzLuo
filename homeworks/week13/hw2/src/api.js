/* eslint-disable */

export function getComments(apiUrl, siteKey, cb, page) {
  fetch(`${apiUrl}/get_comments.php?site_key=${siteKey}&page=${page}`)
    .then((res) => res.json())
    .then((res) => cb(res))
    .catch((res) => handleError(res))
}

export function addComment(apiUrl, formData, cb) {
  const option = {
    body: formData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post'
  }
  fetch(`${apiUrl}/add_comment.php`, option)
    .then((res) => res.json())
    .then((res) => cb(res))
    .catch((res) => handleError(res))
}

function handleError(msg) {
  console.error(msg)
  alert('Oops! something wrong.')
}
