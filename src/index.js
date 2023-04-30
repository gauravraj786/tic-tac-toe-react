import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

const rowStyle = {
  display: "flex"
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white"
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid"
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column"
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px"
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px"
};

function Square({ id, onClick, value }) {
  return (
    <div key={id} className="square" style={squareStyle} onClick={onClick}>
      {value}
    </div>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState("");

  useEffect(() => {
    setWinner(calculateWinner(squares));
  }, [squares]);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const squaresCopy = [...squares];
    squaresCopy[i] = xIsNext ? "X" : "O";
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);
  }

  function renderSquare(i) {
    return (
      <Square
        key={i}
        id={i}
        value={squares[i]}
        onClick={() => handleClick(i)}
      />
    );
  }

  const renderStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (squares.includes(null)) {
      return `Next player: ${xIsNext ? "X" : "O"}`;
    } else {
      return `It's a tie!`;
    }
  };

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  }

  return (
    <div style={containerStyle} className="gameBoard">
      {winner ? (
        <div id="winnerArea" className="winner" style={instructionsStyle}>
          {renderStatus()}
        </div>
      ) : (
        <div id="statusArea" className="status" style={instructionsStyle}>
          {renderStatus()}
        </div>
      )}
      <button style={buttonStyle} onClick={resetGame}>
        Reset
      </button>
      <div style={boardStyle}>
        {[0, 1, 2].map((i) => (
          <div key={i} className="board-row" style={rowStyle}>
            {[i * 3, i * 3 + 1, i * 3 + 2].map(renderSquare)}
          </div>
        ))}
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Game />);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
