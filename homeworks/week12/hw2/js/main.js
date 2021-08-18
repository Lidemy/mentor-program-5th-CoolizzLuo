(() => {
  const formEl = document.querySelector('.form')
  const inputEl = document.querySelector('.form > input')
  const listEl = document.querySelector('.list')
  const listLenEl = document.querySelector('.items-len > span')
  const filterBtn = document.querySelector('.filter-btn')
  const clearBtn = document.querySelector('.clear-btn')
  const saveBtn = document.querySelector('.save-btn')
  // const API_URL = 'http://localhost/week12/todo-api'
  const API_URL = 'https://mentor-program.co/mtr04group4/enzo/week12/todo-api'

  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }

  function handleMsg(log, msg) {
    handleLoad(false)
    console.log(log)
    alert(msg || 'Oops! something wrong')
  }

  function handleLoad(bool) {
    // true: open, false: close
    const el = document.querySelector('.load')
    bool ? el.classList.add('loading') : el.classList.remove('loading')
  }

  const APIUtils = {
    load(cb, id) {
      handleLoad(true)
      fetch(`${API_URL}/get_todo.php?id=${id}`)
        .then((res) => res.json())
        .then((res) => {
          handleLoad(false)
          if (res.ok) {
            cb(res)
          } else {
            handleMsg(res.message, 'can\'t load this id')
            window.history.back()
          }
        })
        .catch((res) => handleMsg(res))
    },
    save(todos) {
      const data = new URLSearchParams()
      data.append('todo', JSON.stringify(todos))

      const option = {
        body: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST'
      }
      handleLoad(true)
      fetch(`${API_URL}/add_todo.php`, option)
        .then((res) => res.json())
        .then((res) => {
          handleLoad(false)
          if (res.ok) {
            handleMsg(res.message, `your id is ${res.id}`)
            window.location.search = `?id=${res.id}`
          } else {
            handleMsg(res.message)
          }
        })
        .catch((res) => handleMsg(res))
    },
    update(todos, id) {
      const data = new URLSearchParams()
      data.append('todo', JSON.stringify(todos))
      data.append('id', id)

      const option = {
        body: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST'
      }
      handleLoad(true)
      fetch(`${API_URL}/update_todo.php`, option)
        .then((res) => res.json())
        .then((res) => {
          handleLoad(true)
          if (res.ok) {
            handleMsg(res.message, `id: ${id} update ok !`)
          } else {
            handleMsg(res.message)
          }
        })
        .catch((res) => handleMsg(res))
    }
  }

  const app = {
    el: document.querySelector('#app'),
    id: undefined,
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
        complete: this.filterValue === 'done'
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
      if (this.editing) return alert('Please complete edit !!!')
      const temp = [...this.data]
      const target = temp.find((item) => item.id === id)
      target.complete = !target.complete
      this.data = temp
    },
    remove(id) {
      if (this.editing) return alert('Please complete edit !!!')
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
          <li data-id="${item.id}" class="${item.complete ? 'done' : ''}">
            <div class="content ${this.editing === item.id ? 'editing' : ''}">
              <h3>${escapeHtml(item.content)}</h3>
              <input type="text" value="${escapeHtml(item.content)}">
            </div>
            <div class="action">
              <button><i class="fa fa-edit" data-action="edit"></i></button>
              <button><i class="fa fa-${item.complete ? 'check-' : ''}square" data-action="change"></i></button>
              <button><i class="fa fa-trash" data-action="remove"></i></button>
            </div>
          </li>
        `)
      , '')
      listLenEl.textContent = temp.length
    },
    clear() {
      const temp = this.data.filter((todo) => todo.complete)
      if (temp.length === 0) return handleMsg('clear fail', 'don\'t have completed !')
      if (!window.confirm('Are you sure clear?')) return
      this.data = this.data.filter((todo) => !todo.complete)
    },
    save() {
      !this.id ? APIUtils.save(this.data) : APIUtils.update(this.data, this.id)
    },
    created() {
      const urlParams = new URLSearchParams(window.location.search)
      this.id = urlParams.get('id')
      if (!this.id) return this.render()

      APIUtils.load((res) => {
        const todo = JSON.parse(res.todo)
        todo ? (this.data = todo) : (this.data = [])
      }, this.id)
    },
    // mount EventListener to HTML Element
    mounted() {
      formEl.addEventListener('submit', (e) => {
        e.preventDefault()
        if (!inputEl.value.trim()) {
          alert('please input item')
          inputEl.focus()
          return
        }
        this.add(inputEl.value)
        formEl.reset()
      })
      // bind method to listEl
      listEl.addEventListener('click', (e) => {
        if (e.target.dataset.action) {
          const { action } = e.target.dataset
          const { id } = e.target.closest('li').dataset

          let value = null
          if (action === 'edit') {
            const closeLi = e.target.closest('li')
            value = closeLi.querySelector('.content > input').value.trim()
          }
          this[action](Number(id), value)
        } else if (e.target.nodeName === 'H3') {
          console.log(e.target.nodeName)
          const { id } = e.target.closest('li').dataset
          this.change(Number(id))
        }
      })
      listEl.addEventListener('keyup', (e) => {
        if (e.keyCode !== 13) return

        const { id } = e.target.closest('li').dataset
        this.edit(Number(id), e.target.value)
      })
      filterBtn.addEventListener('click', (e) => {
        if (e.target.nodeName !== 'BUTTON') return
        this.filter(e.target.dataset.value)
      })
      clearBtn.addEventListener('click', (e) => this.clear())
      saveBtn.addEventListener('click', (e) => this.save())
    }
  }

  app.created()
  app.mounted()
})()
