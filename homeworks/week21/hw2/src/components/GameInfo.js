import { useMemo } from 'react'
import styled from 'styled-components'

const GameInfoWrapper = styled.div`
  width: 240px;
  height: 38rem;
  overflow: auto;
  margin-left: 2rem;
  padding-left: 1rem;

  @media only screen and (max-width: 1080px) {
    width: 90%;
    text-align: center;
    font-size: 2.5rem;
    margin-top: 4rem;
    button {
      width: 80%;
      font-size: 1.5rem;
      padding: 1rem;
    }
  }
`

const Button = styled.button`
  font-family: "Cyber", Futura, sans-serif;
  font-size: 1.1rem;
  width: 80%;
  padding: .3rem .4rem;
  margin: .4rem .2rem 0;
  border: none;
  outline: none;
  border-radius: 4px;
  color: #111;
  background: #ccc;
  box-shadow: .1rem .1rem .1rem #999;
  transition: .2s;
  cursor: pointer;
  user-select: none;
  z-index: 1;

  &:active {
    transform: translateY(.2rem);
    box-shadow: none;
    transform: scale(1.05);
  }

  ${({active}) => active && `
    font-weight: 900;
    background: #666;
    color: #eee;
    box-shadow: .1rem .1rem .1rem #333;
    transform: scale(1.05);
  `}

  &:hover {
    background: #666;
    color: #ccc;
  }
`

const GameInfo = ({status, stepNumber, history, handleMove}) => {
  const moves = useMemo(() => (history.map((step, move) => (
      <li key={`#${move}`}>
        <Button 
          active={stepNumber === move} 
          onClick={() => handleMove(move)}>
          {move ? ('Go to move #' + move) : ('Go to game start')}
        </Button>
      </li>
    )
  )), [history, stepNumber, handleMove])

  return (
    <GameInfoWrapper>
      <div>{status}</div>
      <div>current step: {stepNumber}</div>
      <ul>{moves}</ul>
    </GameInfoWrapper>
  )
}

export default GameInfo