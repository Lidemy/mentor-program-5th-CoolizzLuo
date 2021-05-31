const prevEl = document.querySelector('.nav.prev')
const nextEl = document.querySelector('.nav.next')
const playBtn = document.querySelector('.play-btn')
const mainPic = document.querySelector('.container')
const mainPicArr = document.querySelectorAll('.container > li')
const smallPicArr = document.querySelectorAll('.small-pic > li')

const maxPage = mainPicArr.length
let currPage = 0
let timer = null

function rollPage(page) {
  if (page >= maxPage) page = maxPage - 1
  if (page < 0) page = 0
  if (!playBtn.disabled) currPage = page
  mainPic.style.left = `${page * -500}px`

  // handler btn show/hide
  page <= 0 ? prevEl.classList.add('hide') : prevEl.classList.remove('hide')
  page >= maxPage - 1 ? nextEl.classList.add('hide') : nextEl.classList.remove('hide')

  // handler smallPic show/hide
  smallPicArr.forEach((li) => {
    li.classList.remove('active')
  })
  smallPicArr[page].classList.add('active')
}

function autoPlay() {
  playBtn.disabled = true
  rollPage(currPage++)
  if (currPage >= maxPage) currPage = 0
  console.log('currPage: ', currPage)
  timer = setTimeout(autoPlay, 2500)
}

prevEl.addEventListener('click', () => {
  clearTimeout(timer)
  playBtn.disabled = false
  rollPage(--currPage)
})
nextEl.addEventListener('click', () => {
  clearTimeout(timer)
  playBtn.disabled = false
  rollPage(++currPage)
})

playBtn.addEventListener('click', autoPlay)

smallPicArr.forEach((smallPic, index) => {
  smallPic.addEventListener('click', (e) => {
    if (e.target.classList.contains('active')) return
    clearTimeout(timer)
    playBtn.disabled = false
    rollPage(index)
  })
})

rollPage(0)
autoPlay()
