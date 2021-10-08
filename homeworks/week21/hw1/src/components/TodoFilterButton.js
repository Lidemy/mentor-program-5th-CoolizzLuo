import { useRef } from 'react'
import styled from 'styled-components'

const FilterBtnWrapper = styled.div`
  margin: 2rem 0;
  display: flex;
`

const Button = styled.button`
  flex: 1;
  padding: 0.5rem 0;
  font-size: 1.1rem;
  color: #555;
  border: 1px solid #ccc;
  transition: background 0.2s;
  cursor: pointer;

  &:hover {
    background: #f9ca24;
    color: #333;
  }
  ${({active}) => active && `
    background: #f9ca24;
    color: #333;
  `}
  
`

const TodoFilterButton = ({ filterValue, setFilter }) => {
  const btnList = useRef(['All', 'Done', 'Todo'])

  return (
    <FilterBtnWrapper>
      { 
        btnList.current.map((btn) => (
          <Button 
            key={btn} 
            active={filterValue === btn} 
            onClick={() => setFilter(btn)}>
            { btn }
          </Button>
        ))
      }
    </FilterBtnWrapper>
  )
}

export default TodoFilterButton
