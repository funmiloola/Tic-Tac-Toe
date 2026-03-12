import { useEffect, useState } from "react";
import Modal from "./Modal";
export default function Game({
  firstPlayer,
  secondPlayer,
  setOpenInput,
  setOpenGame,
  setSecondPlayer,
  setFirstPlayer
}) {
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const [currentBoard, setCurrentBoard] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const displayResult = () => {
    for (let patterns of winningPatterns) {
      const [a, b, c] = patterns;
      if (
        currentBoard[a] === "X" &&
        currentBoard[b] === "X" &&
        currentBoard[c] === "X"
      ) {
        return `Player ${firstPlayer} wins!`;
      } else if (
        currentBoard[a] === "O" &&
        currentBoard[b] === "O" &&
        currentBoard[c] === "O"
      ) {
        return `Player ${secondPlayer} wins!`;
      }
    }
    if (currentBoard.includes(null)) return;
    return "It is a draw";
  };
  const winner = displayResult();
  const [store, setStore] = useState(
    () => JSON.parse(localStorage.getItem("winner")) || [],
  );
  useEffect(() => {
    if (winner) {
      const existingWinner = JSON.parse(localStorage.getItem("winner")) || [];
      const updatedList = [...existingWinner, winner];
      setStore(updatedList);
      localStorage.setItem("winner", JSON.stringify(updatedList));
    }
  }, [winner]);

  const handleClick = (index) => {
    if (winner) return;
    if (currentBoard[index] === null) {
      const newBoard = [...currentBoard];
      newBoard[index] = currentPlayer;
      setCurrentBoard(newBoard);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };
  const nextPlayer = () => {
    if (currentPlayer === "X") {
      return firstPlayer;
    }
    return secondPlayer;
  };
  const handleReset = () => {
    setCurrentBoard([null, null, null, null, null, null, null, null, null]);
    setCurrentPlayer("X");
    localStorage.removeItem("winner");
    setStore([]);
  };
  const handlePlayAgain = () => {
    setCurrentBoard([null, null, null, null, null, null, null, null, null]);
    setCurrentPlayer("X");
  };
    const handleEndGame = () => {
    setCurrentBoard([null, null, null, null, null, null, null, null, null]);
    setCurrentPlayer("X");
    setOpenInput(true);
    setOpenGame(false);
    localStorage.removeItem("winner");
    setStore([]);
    setSecondPlayer('')
    setFirstPlayer('')
  };
  return (
    <div>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          alignItems: "center",
          paddingTop: "64px",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "16px",
            paddingBottom: "12px",
            display: `${currentBoard.includes(null) && !winner ? "block" : "none"}`,
          }}
        >
          Next Player: {nextPlayer()}
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gridTemplateRows: "repeat(3,1fr)",
            gap: "10px",
            width: "50%",
            alignItems: "center",
          }}
        >
          {currentBoard.map((square, index) => (
            <button
              key={index}
              style={{ padding: "16px 2px", minHeight: "50px" }}
              onClick={() => handleClick(index)}
            >
              {square}
            </button>
          ))}
        </div>
        <button
          onClick={handleReset}
          style={{
            marginTop: "12px",
            padding: "4px 24px",
              borderRadius: "4px",
            cursor:"pointer"
          }}
        >
          Reset Game
        </button>
        <p style={{ paddingTop: "12px", color: "white" }}>{winner}</p>
        <div
          style={{
            background: "white",
            width: "50%",
            padding: "10px 10px",
            marginTop: "50px",
          }}
        >
          <h4
            style={{
              color: "rgb(1,1,62)",
              textAlign: "center",
              borderBottom: "1px solid",
              borderBottomColor: "rgb(1,1,62)",
              paddingBottom: "4px",
            }}
          >
            Live Scores
          </h4>
          <ul
            style={{
              paddingTop: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            {store.map((s, index) => (
              <li
                key={index}
                style={{ listStyle: "none", color: "rgb(1,1,62)" }}
              >
                <span>Round{index + 1}:</span>
                <span> {s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {winner && (
        <Modal
          winner={winner}
          handleReset={handlePlayAgain}
          handleEndGame={handleEndGame}
        />
      )}
    </div>
  );
}
