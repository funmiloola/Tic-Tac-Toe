import { useEffect, useState } from "react";
import Modal from "./Modal";
import "./game.css";
import { useNavigate, useLocation } from "react-router-dom";
export default function Game() {
  const firstPlayer = localStorage.getItem("firstPlayer");
  const secondPlayer = localStorage.getItem("secondPlayer");
  const location = useLocation();

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
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
  ]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const navigate = useNavigate();
  const displayResult = () => {
    for (let patterns of winningPatterns) {
      const [a, b, c] = patterns;
      if (
        currentBoard[a] === "X" &&
        currentBoard[b] === "X" &&
        currentBoard[c] === "X"
      ) {
        return `Player ${firstPlayer.charAt(0).toUpperCase() + firstPlayer.slice(1)} wins!`;
      } else if (
        currentBoard[a] === "O" &&
        currentBoard[b] === "O" &&
        currentBoard[c] === "O"
      ) {
        return `Player ${secondPlayer.charAt(0).toUpperCase() + secondPlayer.slice(1)} wins!`;
      }
    }
    if (currentBoard.includes("_")) return;
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
  useEffect(() => {
    return () => {
      localStorage.removeItem("winner");
    };
  }, []);
  const handleClick = (index) => {
    if (winner) return;
    if (currentBoard[index] === "_") {
      const newBoard = [...currentBoard];
      newBoard[index] = currentPlayer;
      setCurrentBoard(newBoard);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };
  const nextPlayer = () => {
    if (currentPlayer === "X") {
      return firstPlayer.toUpperCase();
    }
    return secondPlayer.toUpperCase();
  };

  const handlePlayAgain = () => {
    setCurrentBoard(["_", "_", "_", "_", "_", "_", "_", "_", "_"]);
    setCurrentPlayer("X");
  };
  const handleEndGame = () => {
    setCurrentBoard(["_", "_", "_", "_", "_", "_", "_", "_", "_"]);
    setCurrentPlayer("X");
    localStorage.removeItem("winner");
    setStore([]);
    navigate("/");
  };
  return (
    <div>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          alignItems: "center",
          paddingTop: "120px",
        }}
      >
        <h1
          style={{
            color: "#FFD6A5",
            paddingBottom: "20px",
            display: `${currentBoard.includes("_") && !winner ? "block" : "none"}`,
            fontFamily: "Nunito",
          }}
        >
          NEXT PLAYER: {nextPlayer()}
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gridTemplateRows: "repeat(3,1fr)",
            gap: "10px",
            alignItems: "center",
          }}
          className="grid"
        >
          {currentBoard.map((square, index) => (
            <button
              key={index}
              style={{
                padding: "0px 2px",
                minHeight: "40px",
                backgroundColor: `${
                  currentBoard[index] === "X"
                    ? "#f7bf7aff"
                    : currentBoard[index] === "O"
                      ? "#bd82f0ff"
                      : "white"
                }`,
                color: `white`,
                border: "none",
                borderRadius: "6px",
                fontSize: "24px",
                fontWeight: "400",
                fontFamily: "Nunito",
              }}
              onClick={() => handleClick(index)}
            >
              {square === "_" ? null : square}
            </button>
          ))}
        </div>
        <button
          onClick={handleEndGame}
          style={{
            marginTop: "24px",

            borderRadius: "4px",
            cursor: "pointer",
            border: "none",
            background: "#e2224fff",
            color: "white",
            fontSize: "16px",
            fontWeight: "500",
            fontFamily: "Nunito",
          }}
          className="btn"
        >
          Reset Game
        </button>
        <div
          style={{
            background: "white",
            padding: "10px 10px",
            marginTop: "50px",
          }}
          className="liveScore"
        >
          <h4
            style={{
              color: "rgba(31, 175, 91, 1)",
              textAlign: "center",
              borderBottom: "1px solid",
              borderBottomColor: "rgba(226, 226, 230, 1)",
              paddingBottom: "4px",

              fontFamily: "Nunito",
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
              fontFamily: "Nunito",
            }}
          >
            {store.map((s, index) => (
              <li
                key={index}
                style={{
                  listStyle: "none",
                  color:
                    typeof s === "string"
                      ? s.toLowerCase().includes(firstPlayer.toLowerCase())
                        ? "#f7bf7aff"
                        : s.toLowerCase().includes(secondPlayer.toLowerCase())
                          ? "#bd82f0ff"
                          : "rgba(31, 175, 91, 1)"
                      : "rgba(31, 175, 91, 1)",
                  fontWeight: "400",
                }}
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
          firstPlayer={firstPlayer}
          secondPlayer={secondPlayer}
        />
      )}
    </div>
  );
}
