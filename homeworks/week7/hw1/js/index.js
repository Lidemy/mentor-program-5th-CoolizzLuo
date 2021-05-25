const form = document.querySelector('.lazy-form')

function verify() {
  const requiredList = document.querySelectorAll('.required')

  requiredList.forEach((el) => {
    const radioArr = el.querySelectorAll('input[type="radio"]')
    // handler radio input
    if (radioArr.length) {
      const isChecked = [...radioArr].some((radio) => radio.checked)
      isChecked ? el.classList.remove('highlight') : el.classList.add('highlight')
    // handler others input
    } else {
      const inputEl = el.querySelector('input')
      inputEl.value.trim() ? el.classList.remove('highlight') : el.classList.add('highlight')
    }
  })
}

function getFormData() {
  const data = new FormData(form)
  const obj = {}
  for (const [name, value] of data) {
    obj[name] = value
  }
  return obj
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  verify()
  const errorEl = document.querySelector('.highlight')
  if (errorEl) return errorEl.focus()
  alert('驗證Ok')
  console.log(getFormData())
})
