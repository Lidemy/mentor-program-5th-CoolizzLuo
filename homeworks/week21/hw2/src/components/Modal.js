import { useState } from 'react'
import styled from 'styled-components'

const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  text-align: center;
  padding: 5rem 1rem 0;
  background: rgba(0, 0, 0, .8);
  transition: all .2s;
  z-index: 3;
  user-select: none;
  animation: zoom-in 1s;
  ${({isShow}) => !isShow && `
    display: none;
  `}

  @keyframes zoom-in {
    from {opacity: 0;}
    to {opacity: 1;}
  }

  h2 {
    color: #eee;
    font-size: 8rem;
  }

  div {
    margin: 10rem auto;
    padding: 0 5rem;
    display: flex;
    justify-content: center;
  }
  button {
    min-width: 12rem;
    font-size: 2rem;
    padding: 1rem 2rem;
    border: none;
    outline: none;
    border-radius: 12px;
    color: #111;
    background: rgba(200, 200, 200, .6);
    box-shadow: .2rem .2rem .2rem #333;
    cursor: pointer;
    transition: all .2s;

    & + button {
      margin-left: 10rem;
    }
    &:active {
      transform: translate(.5rem, .8rem);
      box-shadow: none;
    }
    &:hover {
      background: #666;
      color: #ccc;
    }
  }
`

const Modal = ({msg, showing, reset}) => {
  const [isShow, setIsShow] = useState(showing)

  return (
    <ModalWrapper isShow={isShow}>
      <h2>{msg}</h2>
      <div>
        <button onClick={reset}>Restart</button>
        <button onClick={() => setIsShow(false)}>Back</button>
      </div>
    </ModalWrapper>
  )
}

export default Modal