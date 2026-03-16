import { useState } from "react";
import './Input.css'
import Game from "./game";
export default function Input() {
  const [firstPlayer, setFirstPlayer] = useState("");
  const [secondPlayer, setSecondPlayer] = useState("");
  const [openGame, setOpenGame] = useState(false);
  const [openInput, setOpenInput] = useState(true);
    const [error, setError] = useState('')
    const [err,setErr] = useState('')
    const handleClick = () => {
        let hasError = false;
      if (firstPlayer.trim("") === "") {
           setError("Please fill this field")
           hasError = true
        }
      else {
          setError("")
        }
       if (secondPlayer.trim("") === "") {
        setErr("Please fill this field")
          hasError = true
        }
       else {
           setErr("")
        }
        if (hasError) return;
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
              <h1 style={{ paddingTop: "24px", color: "#FFB347",fontFamily:"Montserrat Alternates" }}>TIC-TAC-TOE</h1>
              <img src="/Image.png" style={{width:"150px",height:"150px",borderRadius:"10px"}} />
        <h2 style={{ color: "white", padding: "10px",fontFamily:"Nunito" }}>
           Enter Player Names
              </h2>
       <label style={{display:"flex",flexDirection:"column",gap:"5px"}}>
        <input
          type="text"
          value={firstPlayer}
          onChange={(e) => setFirstPlayer(e.target.value)}
          required
          placeholder="Enter name for Player 1"
          style={{
            
            padding: "10px",
            borderRadius: "6px",
            outline: "none",
            background: "rgba(255, 255, 255, 0.9)",
            border: "none",
              color: "#333",
            fontFamily:"Nunito"
          }}
              />
                  <span style={{color:"rgba(158, 11, 11, 1)"}}>{error}</span>
              </label>
              <label style={{display:"flex",flexDirection:"column",gap:"5px"}}>
        <input
          type="text"
          required
          placeholder="Enter name for Player 2"
          value={secondPlayer}
          onChange={(e) => setSecondPlayer(e.target.value)}
          style={{
           
            padding: "10px",
            borderRadius: "6px",
            outline: "none",
            background: "rgba(255, 255, 255, 0.9)",
            border: "none",
              color: "#333",
            fontFamily:"Nunito"
          }}
              />
                  <span style={{color:"rgba(158, 11, 11, 1)"}}>{err}</span>
                  </label>
        <button
          onClick={handleClick}
          style={{
            background: "rgba(31, 175, 91, 1)",
            padding: "10px 80px",
            border: "none",
            fontSize: "16px",
            color: "white",
            borderRadius: "20px",
            cursor: "pointer",
              fontWeight: "500",
              marginBottom: "10px",
            fontFamily:"Nunito"
          }}
        >
          Start Game
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
