import { useState } from "react";
import Game from "./game";

export default function Input() {
  const [firstPlayer, setFirstPlayer] = useState("");
  const [secondPlayer, setSecondPlayer] = useState("");
  const [openGame, setOpenGame] = useState(false);
  const [openInput, setOpenInput] = useState(true);
  const handleClick = () => {
    if (firstPlayer === "" || secondPlayer === "") return;
    setOpenGame(true);
      setOpenInput(false);
     
  };
  return (
    <div>
      <div
        style={{
          display: `${openInput ? "flex" : "none"}`,
          flexDirection: "column",
          alignItems: "center",
          justifyItems: "center",
          gap: "30px",
        }}
      >
        <h2 style={{ color: "white", padding: "50px" }}>
          Please Enter your Names
        </h2>
        <input
          type="text"
          value={firstPlayer}
          onChange={(e) => setFirstPlayer(e.target.value)}
          required
          placeholder="Enter name for Player 1"
          style={{
            width: "50%",
            padding: "10px",
            borderRadius: "6px",
            outline: "none",
          }}
        />
        <input
          type="text"
          required
          placeholder="Enter name for Player 2"
          value={secondPlayer}
          onChange={(e) => setSecondPlayer(e.target.value)}
          style={{
            width: "50%",
            padding: "10px",
            borderRadius: "6px",
            outline: "none",
          }}
        />
        <button
          onClick={handleClick}
          style={{
            background: "rgba(91, 91, 245, 1)",
            padding: "5px 30px",
            border: "none",
            fontSize: "16px",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>
      <div style={{ display: `${openGame ? "block" : "none"}` }}>
        <Game
          firstPlayer={firstPlayer}
          secondPlayer={secondPlayer}
          setFirstPlayer={setFirstPlayer}
          setSecondPlayer={setSecondPlayer}        
          setOpenInput={setOpenInput}
          setOpenGame={setOpenGame}
        />
      </div>
    </div>
  );
}
