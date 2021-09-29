import { useState, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import TodoInput from './TodoInput'
import TodoFilterButton from './TodoFilterButton'
import TodoItem from './TodoItem'
import useTodos from '../hooks/useTodos'

const TodoItemList = styled.ul`
  margin: 3rem 0 1.5rem;
`

const TodoFooter = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
`

const Button = styled.button`
  font-size: 1rem;
  padding: .4rem .8rem;
  color: #555;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: .1rem .1rem .1rem #999;
  cursor: pointer;
  &.active {
    transform: translateY(.2rem);
    box-shadow: none;
    transform: scale(1.05);
  }
  &:hover {
    background: #f9ca24;
    color: #333;
  }
`

const initialTodo = [
  { id: 'c6411e9a-ac4b-4368-855c-9ca633961355', content: 'demo todo', isDone: false },
  { id: '4f43e6d4-7f55-5c7a-bd13-644917c3c821', content: 'demo working', isDone: true },
  { id: 'a3915a55-da1c-46a4-bf4f-9cb6e8172f56', content: 'demo cooking', isDone: false }
]

const TodoApp = () => {
  const [editing, setEditing] = useState(null)

  const {
    todos,
    setTodos,
    filterValue,
    setFilterValue,
    handleAddTodo,
    handleUpdateTodo,
    handleChangeDoneTodo,
    handleDeleteTodo,
    filterTodos
  } = useTodos(initialTodo)

  const handleInputAdd = useCallback((value) => editing ? alert('please complete your editing') : handleAddTodo(value), [editing, handleAddTodo])
  const handleClearTodo = () => {
    if (!todos.length) return alert('already empty data !')
    if (window.confirm('sure clear all todos ?')) {
      setTodos([])
      setEditing(null)
    }
  }

  const filterTodosLen = useMemo(()=> filterTodos.length, [filterTodos])


  return (
    <>
      <TodoInput addTodo={ handleInputAdd } />
      <TodoFilterButton filterValue={ filterValue } setFilter={ setFilterValue } />
      <TodoItemList>
        {
          filterTodos.map((todo) => (
            <TodoItem 
              key= { todo.id }
              todo={ todo } 
              editing= { editing } 
              setEditing={ setEditing }
              updateTodo={ handleUpdateTodo } 
              changeDoneTodo={ handleChangeDoneTodo } 
              deleteTodo={ handleDeleteTodo } />
          ))
        }
      </TodoItemList>
      <TodoFooter>
        total: { filterTodosLen }
        <Button onClick={ handleClearTodo }>Clear all</Button>
      </TodoFooter>
    </>
  )
}

export default TodoApp;