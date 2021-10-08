import { useState, useEffect, useMemo, useCallback } from 'react'
import { v4 } from 'uuid'

const useTodos = (initialValue = [], localStorageKey = 'todos') => {
  const [filterValue, setFilterValue] = useState('All')
  const [todos, setTodos] = useState(() => {
    try {
      const item = window.localStorage.getItem(localStorageKey)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  useEffect(() => window.localStorage.setItem(localStorageKey, JSON.stringify(todos)))

  const handleAddTodo = useCallback((todoContent) => {
    setTodos([
      {
        id: v4(),
        content: todoContent,
        isDone: false
      },
      ...todos
    ])
  }, [todos])

  const handleUpdateTodo = useCallback((id, newContent) => {
    setTodos(todos.map((todo) => {
      if (todo.id !== id) return todo
      return {
        ...todo,
        content: newContent
      }
    }))
  }, [todos])

  const handleChangeDoneTodo = useCallback((id) => {
    setTodos(todos.map((todo) => {
      if (todo.id !== id) return todo
      return {
        ...todo,
        isDone: !todo.isDone
      }
    }))
  }, [todos])

  const handleDeleteTodo = useCallback((id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }, [todos])
  
  const filterTodos = useMemo(() => {
    const options = {
      All: todo => todo,
      Done: todo => todo.isDone,
      Todo: todo => !todo.isDone
    }
    return todos.filter(options[filterValue])
  }, [filterValue, todos])

  return {
    todos,
    setTodos,
    filterValue,
    setFilterValue,
    handleAddTodo,
    handleUpdateTodo,
    handleChangeDoneTodo,
    handleDeleteTodo,
    filterTodos
  }
}

export default useTodos
