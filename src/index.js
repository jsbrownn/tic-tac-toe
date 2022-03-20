import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Square = (props) => {
  let current = props.stepNumber;
  const value = props.history[current].squares[props.id];
  return <button  className="square"
                  onClick = {props.onClick}
                  id = {props.id}>
        {value}
        </button>;
};

const Board = (props) => {
  const renderSquare = (i) => {
    return <Square  onClick = {props.onClick} 
                    history = {props.history} 
                    stepNumber = {props.stepNumber}
                    id = {i} 
                />;
  };

  const status = props.winner? `Winner - ${props.winner}`: `Next player: ${props.xIsNext?"X":"0"}`;

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game = (props) => {
  const [data, setData] = useState({
    history: [
      {squares:Array(9).fill(null)},
    ],
    xIsNext: true,
    stepNumber: 0,
    winner: null,
  });

  const calculateWinner = (squares)=>{
    
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

    for (let i = 0; i < lines.length; i++){
    
      const [a,b,c] = lines[i]
      
      if(squares[a] && squares[a] === squares[b] && squares[a]=== squares[c]){
        return squares[a];
      }
    }
  
    return null;

  }

  const handleClick = (event) => {
    if(!data.winner && !event.target.textContent){
    const lastIndex = data.history.length -1;
    const snapshots = data.history.slice(0);
    const currentSnapshot = snapshots[lastIndex].squares.slice(0);
    const value = data.xIsNext? "X":"O";
    currentSnapshot[event.target.id] = value;
    const winner = calculateWinner(currentSnapshot);
    setData({
      history: data.history.concat({squares:currentSnapshot}),
      xIsNext: !data.xIsNext,
      winner: winner,
      stepNumber: snapshots.length,
    })
    }
    

  };


  const status = data.winner? `Выйграл  ${data.winner}`: `Следующий ход - ${data.xIsNext?"X":"O"}`

  const jumpTo = (step) => {
    const slicedHistory = data.history.slice(0,step + 1)
  
    setData({
      history: slicedHistory,
      stepNumber: step,
      xIsNext: (step % 2) === 0, 
    });

  }
  const moves = data.history.map((step, move) => {
    const desc = move ?
      'Перейти к ходу #' + move :
      'К началу игры';
    return (
      <li key = {move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });


// current > 0 ?current -= 1 : current = 0;

  // debugger
  return (
    <div className="game">
      <div className="game-board">
        <Board  onClick={handleClick} 
                history={data.history}
                xIsNext = {data.xIsNext}
                winner = {data.winner}
                stepNumber = {data.stepNumber}/>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
