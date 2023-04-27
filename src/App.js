import { useState } from "react";
import Board from "./components/Board";
import "./App.css";
// import "./reset.css";

function App() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  // const current = history[history.length - 1];

  const calculateWinner = (squares) => {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        // console.log(squares[a]);
        return squares[a];
      }
    }
    return null; // 없는 경우
  };

  const current = history[stepNumber];

  const winner = calculateWinner(current.squares);

  let status;

  if (winner) {
    status = `💛 Winner: ${winner} 💛`;
  } else {
    status = `🧚‍♀️ Next player: ${xIsNext ? "X" : "O"}`;
  }

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const newCurrent = newHistory[newHistory.length - 1]; // 현재의 current

    // slice() 사용하여 매 동작 이후에 squares 배열의 새로운 복사본 만들었고 이를 불변 객체로 취급.
    // 따라서 과거 square 배열의 모든 버전 저장하고 이미 지나간 차례 탐색 가능
    const newSquares = current.squares.slice();

    if (calculateWinner(newSquares) || newSquares[i]) return; // winner 결정 되면 끝내기

    newSquares[i] = xIsNext ? "X" : "O";
    setHistory([...newHistory, { squares: newSquares }]); // 기존 + 새롭게 추가
    setXIsNext((prev) => !prev);
    // setXIsNext(!xIsNext); 함수형으로 넣는 것과 아닌 것의 차이
    setStepNumber(newHistory.length);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0); // stepNumber가 짝수일 때마다 xIsNext를 true로 설정
  };

  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button className="move-button" onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          status={status}
        />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol style={{ listStyle: "none" }}>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
