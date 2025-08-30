import React, { useState } from "react";
import "./App.css"; // import styles

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(board);

  function handleClick(i) {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (board.every(Boolean)) {
    status = "Draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <h1 className="title">🎮 Tic Tac Toe</h1>
      <div className="board">
        {board.map((value, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`square ${value === "X" ? "x" : value === "O" ? "o" : ""}`}
          >
            {value}
          </button>
        ))}
      </div>
      <h2 className="status">{status}</h2>
      <button className="reset" onClick={resetGame}>
        🔄 Restart
      </button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
