import "./modal.css"
export default function Modal({ winner, handleReset, handleEndGame,firstPlayer,secondPlayer }) {
  return (
    <div
      style={{
        background: "rgba(0, 0, 0, 0.5)",
        position: "fixed",
        width: "100%",
        top: "0",
        left: "0",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
       
      }}
    >
      <div
        style={{
          background: "white",
          textAlign: "center",
          borderRadius: "10px",
          marginTop:"120px"
              }}
              className="modal"
      >
        <h2 style={{ color: "#FFB347", paddingTop: "20px" }}>
          Congratulations!
        </h2>
        <p
          style={{fontFamily:"Nunito", color: typeof winner === "string" ? winner.toLowerCase().includes(firstPlayer.toLowerCase()) ? "#f7bf7aff" : winner.toLowerCase().includes(secondPlayer.toLowerCase())? "#bd82f0ff"
                          : "rgba(31, 175, 91, 1)"
                      : "rgba(31, 175, 91, 1)", fontSize: "20px", paddingTop: "10px" }}
        >
          {winner}
        </p>
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
                      paddingTop: "35px",
            
          }}
        >
          <button
            onClick={handleReset}
            style={{
              padding: "8px 8px",
              background: "rgba(31, 175, 91, 1)",
              borderRadius: "5px",
              color: "white",
              border: "none",
                cursor: "pointer",
              fontFamily:"Nunito"
            }}
          >
            Play again!
          </button>
          <button
            onClick={handleEndGame}
            style={{
              padding: "8px 8px",
              background: "white",
              borderRadius: "5px",
              color: "#e20d3eff",
              borderColor: "#e2224fff",
                cursor: "pointer",
              fontFamily:"Nunito"
            }}
          >
            End game
          </button>
        </div>
      </div>
    </div>
  );
}
