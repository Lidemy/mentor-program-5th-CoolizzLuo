(() => {
  const formEl = document.querySelector('.form')
  const inputEl = document.querySelector('.form > input')
  const listEl = document.querySelector('.list')
  const originalData = [
    {
      id: 1,
      content: 'Code a todo list',
      complete: true
    },
    {
      id: 2,
      content: 'Learn JS',
      complete: false
    },
    {
      id: 3,
      content: 'Sleep',
      complete: false
    },
    {
      id: 4,
      content: 'Study CSS',
      complete: true
    },
    {
      id: 5,
      content: 'Learn something else',
      complete: false
    }
  ]

  const app = {
    el: document.querySelector('#app'),
    _data: originalData || [],
    editing: null,
    set data(value) {
      Array.isArray(value) ? (this._data = value) : this._data.push(value)
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
    render() {
      listEl.innerHTML = this.data.reduce((str, item) =>
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
    },
    created() {
      this.render()
      // bind add method to formEl
      formEl.addEventListener('submit', (e) => {
        e.preventDefault()
        if (!inputEl.value.trim()) return alert('please input item')
        this.add(inputEl.value)
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
    }
  }
  app.created()
})()
