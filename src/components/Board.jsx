import React from 'react';
import './Board.jsx.css';

function Square(props) {
  return (
    <button className="cell" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
};

function Board(props) {
  const renderSquare = (i) => {
    return (
      <Square
        key={`cell-${i.toString()}`}
        value={props.squares[i]} 
        onClick={() => props.onClick(i)}
      />
    );
  }
  
  let boardRow = [];
  for (let i = 0; i < 3; i++) {
    let row = [];
    for (let j = i * 3; j < i * 3 + 3; j++) {
      row.push(renderSquare(j));
    }
    boardRow.push(
      <div className="board-row" key={`row-${i}`}>
        {row}
      </div>
    );
  };

  return (
    <div className="board">
      {boardRow}
    </div>
  );
};

export default Board;
