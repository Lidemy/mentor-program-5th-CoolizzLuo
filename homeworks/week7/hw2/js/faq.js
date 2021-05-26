// 1. 這個當有 li 擴充會沒辦法監聽到
// const questions = document.querySelectorAll('.qa-list > li')
// questions.forEach((question) => {
//   question.addEventListener('click', () => {
//     question.classList.toggle('active')
//   })
// })

// let activeEl = null
// document.querySelector('.qa-list').addEventListener('click', (e) => {
//   let targetEl = null
//   if (e.target.nodeName === 'LI') targetEl = e.target
//   else if (e.target.parentElement.nodeName === 'LI') targetEl = e.target.parentElement
//   else if (e.target.parentElement.parentElement.nodeName === 'LI') targetEl = e.target.parentElement.parentElement
//   if (targetEl) {
//     if (activeEl && activeEl !== targetEl) activeEl.classList.remove('active')
//     activeEl = targetEl
//     targetEl.classList.toggle('active')
//   }
// })

let activeEl = null
document.querySelector('.qa-list').addEventListener('click', (e) => {
  const targetEl = e.target.closest('li')
  if (targetEl) {
    if (activeEl && activeEl !== targetEl) activeEl.classList.remove('active')
    activeEl = targetEl
    targetEl.classList.toggle('active')
  }
})
