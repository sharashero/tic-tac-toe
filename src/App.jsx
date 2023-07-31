import { useState } from 'react';
import './App.css';

const WIN_POSITION = [
  // diagonals
  [0, 4, 8],
  [2, 4, 6],

  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

function checkBoard(board, character) {
  for (let [i, j, k] of WIN_POSITION) {
    if (
      board[i] === character &&
      board[j] === character &&
      board[k] === character
    )
      return true;
  }

  return false;
}


function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}


function App() {
  const [state, setState] = useState({
    board: new Array(9).fill(' '),
    turn: true,
    gameOver: false
  });
  const character = state.turn ? 'X' : 'O';

  const reset = () => {
    setState({
      board: new Array(9).fill(' '),
      turn: true,
      gameOver: false
    });
  };

  const handleClick = (position) => () => {
    if (state.gameOver) return;

    if (state.board[position] === ' ') {
      const next = { ...state };
      next.board[position] = character;

      if (checkBoard(next.board, character))
        next.gameOver = true;
      else
        next.turn = !next.turn;

      setState(next);
    }
  };

  return (
    <div>
      <div className="board">
        {state.board.map((value, index) => (
          <Square key={index} value={value} onClick={handleClick(index)} />
        ))}
      </div>

      <div className="status">
        {state.gameOver ? `${character} has won !!!` : `${character}'s turn`}
      </div>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
