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

form.addEventListener('submit', (e) => {
  e.preventDefault()
  verify()
  if (!document.querySelector('.highlight')) {
    // form.submit()
    alert('驗證Ok')
  }
})
