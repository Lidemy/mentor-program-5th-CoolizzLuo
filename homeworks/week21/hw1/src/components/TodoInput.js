import { useCallback } from 'react'
import styled from 'styled-components'
import useInput from '../hooks/useInput'

const TodoInputWrapper = styled.form`
  margin: 2rem 0 3rem;
  display: flex;
  justify-content: space-between;
`

const Input = styled.input`
  width: 60%;
  font-size: 1.2rem;
  padding: 0.4rem 0.8rem;
  outline: none;
  border: none;
  flex-grow: 1;
`

const Button = styled.button`
  font-size: 1rem;
  padding: 0.4rem 0.8rem;
  flex-grow: 1;
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
  cursor: pointer;
  box-sizing: border-box;
  &:hover {
    background: #333;
    transition: all 0.5s;
  }
  &:active {
    transform: scale(1.05);
  }
`

const TodoAddInput = ({ addTodo }) => {
  const { value, setValue, handleChange, handleEscKey } = useInput()
  const handleSubmit = useCallback((e) => {
    e.preventDefault()

    if (!value.trim()) return alert('Please input some words')
    addTodo(value)
    setValue('')
  }, [addTodo, value, setValue])

  return (
    <TodoInputWrapper onSubmit={ handleSubmit }>
      <Input 
        type="text" 
        value={value} 
        onChange={handleChange} 
        onKeyUp={handleEscKey} />
      <Button>Add item</Button>
    </TodoInputWrapper>
  )
}

export default TodoAddInput
