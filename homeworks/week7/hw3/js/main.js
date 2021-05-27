(() => {
  const formEl = document.querySelector('.form')
  const inputEl = document.querySelector('.form > input')
  const listEl = document.querySelector('.list')
  const listLenEl = document.querySelector('.items-len > span')
  const filterEl = document.querySelector('.filter-btn')

  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }

  const app = {
    el: document.querySelector('#app'),
    _data: JSON.parse(localStorage.getItem('todo-data')) || [
      {
        id: 1,
        content: 'Code a Todo list',
        complete: true
      },
      {
        id: 2,
        content: 'Demo',
        complete: false
      }
    ],
    editing: null,
    filterValue: 'all',
    set data(value) {
      Array.isArray(value) ? (this._data = value) : this._data.push(value)
      localStorage.setItem('todo-data', JSON.stringify(this.data))
      this.render()
    },
    get data() {
      return this._data
    },
    add(value) {
      this.data = {
        id: Date.now(),
        content: value,
        complete: false
      }
    },
    edit(id, value) {
      if (!this.editing || (this.editing !== id && window.confirm('give up this edit'))) {
        this.editing = id
        this.render()
        return
      }
      if (window.confirm('Sure update item ?')) {
        const temp = [...this.data]
        const target = temp.find((item) => item.id === id)
        target.content = value
        this.editing = null
        this.data = temp
      } else {
        this.editing = null
        this.render()
      }
    },
    change(id) {
      const temp = [...this.data]
      const target = temp.find((item) => item.id === id)
      target.complete = !target.complete
      this.data = temp
    },
    remove(id) {
      if (window.confirm('Are you sure to delete the item ?')) {
        this.data = this.data.filter((item) => item.id !== id)
      }
    },
    filter(value) {
      if (this.filterValue === value) return
      document.querySelector(`button[data-value='${value}']`).classList.add('active')
      document.querySelector(`button[data-value='${this.filterValue}']`).classList.remove('active')
      this.filterValue = value
      this.render()
    },
    render() {
      let temp = null
      if (this.filterValue === 'done') {
        temp = this.data.filter((item) => item.complete)
      } else if (this.filterValue === 'todo') {
        temp = this.data.filter((item) => !item.complete)
      } else {
        temp = this.data
      }
      listEl.innerHTML = temp.reduce((str, item) =>
        (str += `
          <li>
            <div class="content ${this.editing === item.id ? 'editing' : ''}">
              <h3 class="${item.complete ? 'done' : ''}">${item.content}</h3>
              <input type="text" value="${item.content}">
            </div>
            <div class="action">
              <button><i class="fa fa-edit" data-action="edit" data-id="${item.id}"></i></button>
              <button><i class="fa fa-${item.complete ? 'check-' : ''}square" data-action="change" data-id="${item.id}"></i></button>
              <button><i class="fa fa-trash" data-action="remove" data-id="${item.id}"></i></button>
            </div>
          </li>
        `)
      , '')
      listLenEl.textContent = temp.length
    },
    created() {
      this.render()
      // bind add method to formEl
      formEl.addEventListener('submit', (e) => {
        e.preventDefault()
        if (!inputEl.value.trim()) return alert('please input item')
        this.add(escapeHtml(inputEl.value))
        formEl.reset()
      })
      // bind method to listEl
      listEl.addEventListener('click', (e) => {
        if (e.target.dataset.id) {
          const { id, action } = e.target.dataset
          let value = null
          if (action === 'edit') {
            const closeLi = e.target.closest('li')
            value = closeLi.querySelector('.content > input').value.trim()
          }
          this[action](Number(id), value)
        }
      })
      filterEl.addEventListener('click', (e) => {
        if (e.target.nodeName === 'BUTTON') {
          this.filter(e.target.dataset.value)
        }
      })
    }
  }
  app.created()
})()
