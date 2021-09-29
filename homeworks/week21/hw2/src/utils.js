function countTotal(squares, currentY, currentX, directionY, directionX) {
  const tempColor = squares[currentY][currentX]
  let tempY = currentY + directionY
  let tempX = currentX + directionX
  let total = 0
  const chessArr = []

  while(squares[tempY] && squares[tempY][tempX] === tempColor) {
    chessArr.push([tempY, tempX])
    total++
    tempY += directionY
    tempX += directionX
  }

  return [total, chessArr];
}

export function calculateWinner(squares, y, x) {
  if (y === null && x === null) return
  if (countTotal(squares, y, x, 1, 0)[0] + countTotal(squares, y, x, -1, 0)[0] >= 4) {
    return {
      current: squares[y][x], 
      chess: [...countTotal(squares, y, x, 1, 0)[1], ...countTotal(squares, y, x, -1, 0)[1], [y, x]]
    }
  }
  if (countTotal(squares, y, x, 0, 1)[0] + countTotal(squares, y, x, 0, -1)[0] >= 4) {
    return {
      current: squares[y][x], 
      chess: [...countTotal(squares, y, x, 0, 1)[1], ...countTotal(squares, y, x, 0, -1)[1], [y, x]]
    }
  }
  if (countTotal(squares, y, x, 1, 1)[0] + countTotal(squares, y, x, -1, -1)[0] >= 4) {
    return {
      current: squares[y][x], 
      chess: [...countTotal(squares, y, x, 1, 1)[1], ...countTotal(squares, y, x, -1, -1)[1], [y, x]]
    }
  }
  if (countTotal(squares, y, x, 1, -1)[0] + countTotal(squares, y, x, -1, 1)[0] >= 4) {
    return {
      current: squares[y][x], 
      chess: [...countTotal(squares, y, x, 1, -1)[1], ...countTotal(squares, y, x, -1, 1)[1], [y, x]]
    }
  }

  if (squares.every((row) => row.every((col) => col))) {
    return "draw";
  }
  
  return null
}