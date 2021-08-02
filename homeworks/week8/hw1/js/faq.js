// 1. 這個當有 li 擴充會沒辦法監聽到
// const questions = document.querySelectorAll('.qa-list > li')
// questions.forEach((question) => {
//   question.addEventListener('click', () => {
//     question.classList.toggle('active')
//   })
// })

// 2. 對 ul 下監聽, 透過事件委派, 並紀錄目前 active 的 element
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

// 3. 看完範例後，發現有 closest() 可以使用，讓程式碼看起來更精簡了
let activeEl = null
document.querySelector('.qa-list').addEventListener('click', (e) => {
  const targetEl = e.target.closest('li')
  if (targetEl) {
    if (activeEl && activeEl !== targetEl) activeEl.classList.remove('active')
    activeEl = targetEl
    targetEl.classList.toggle('active')
  }
})
