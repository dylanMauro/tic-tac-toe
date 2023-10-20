import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


const TURNS = {
  X: "x",
  O: "o"
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8]
]

function Square({children, index, updateBoard}) {
  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div className='square' onClick={handleClick}>
      {children}
    </div>
  )
            
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
        ) {
        return boardToCheck[a]          
      } 
    }
    return null
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return // No hacer nada si la casilla esta en uso
    // actualizar el estado del tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    console.log(newWinner)
    if (newWinner) {
      setWinner(newWinner)
    }
  }

  return (
    <main className='game'>
      <h1>Tic Tac Toe</h1>
      <section className='board'>
        {
          board.map((value, index) => (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          ))
        }
      </section>
      <div>
        el turno es de {turn}
      </div>
    </main>
  )
}

export default App
