import './App.css'
import { useState, useMemo, useCallback } from 'react'
import { GAME_SIZE } from '../constants/data'
import { calculateWinner } from '../utils'
import Modal from './Modal'
import GameBoard from './GameBoard'
import GameInfo from './GameInfo'
import Footer from './Footer'


const App = () => {
  const [history, setHistory] = useState(() => [{ squares: Array(GAME_SIZE).fill().map(() => Array(GAME_SIZE).fill(0)), coordinate: [null, null] }])
  const [blackIsNext, setBlackIsNext] = useState(true)
  const [stepNumber, setStepNumber] = useState(0)

  // [squares, coordinate]
  const currentStatus = useMemo(() => history[stepNumber], [history, stepNumber])
  const winner = useMemo(() => calculateWinner(currentStatus.squares, ...currentStatus.coordinate), [currentStatus])
  const statusMsg = useMemo(() => {
    if (winner === 'draw') return 'draw'
    if (winner) {
      setBlackIsNext(null)
      return `Winner is ${winner.current === 1 ? 'Black' : 'White'}`
    } else {
      return 'Next player: ' + (blackIsNext ? 'Black' : 'White')
    }
  }, [winner, blackIsNext])
  const winnerBoard = useMemo(() => {
    if (!winner || winner === 'draw') return
    const tempBoard = JSON.parse(JSON.stringify(currentStatus.squares))
    winner.chess.forEach(([y, x]) => tempBoard[y][x] = tempBoard[y][x] + 5)

    return tempBoard
  }, [winner, currentStatus])

  const handleClick = useCallback((row, col) => {
    if (blackIsNext === null || currentStatus.squares[row][col] ) return
    const newHistory = history.slice(0, stepNumber + 1)
    const squares = JSON.parse(JSON.stringify(currentStatus.squares))
    squares[row][col] = blackIsNext ? 1 : 2
    
    setHistory([...newHistory, {squares, coordinate: [row, col]}])
    setStepNumber(newHistory.length)
    setBlackIsNext(!blackIsNext)
  }, [history, blackIsNext, currentStatus.squares, stepNumber])

  const handleMove = useCallback((move) => {
    setStepNumber(move)
    setBlackIsNext((move % 2) === 0)
  }, [setStepNumber, setBlackIsNext])

  const renderModal = useCallback(() => (
    <Modal 
      msg={statusMsg}
      showing={true}
      reset={() => {
        setStepNumber(0)
        setHistory(history.slice(0, 1))
        setBlackIsNext(true)
      }
    }/>
  ), [statusMsg, history])


  return (
    <>
      <div className="game">
        { winner && renderModal()}
        <GameBoard
          winner={winner}
          winnerBoard={winnerBoard}
          hover={blackIsNext}
          squares={currentStatus.squares}
          onClick={handleClick}
        />
        <GameInfo
          status={statusMsg}
          stepNumber={stepNumber}
          history={history}
          handleMove={handleMove}
          />
      </div>
      <Footer/>
    </>
  )
}

export default App
