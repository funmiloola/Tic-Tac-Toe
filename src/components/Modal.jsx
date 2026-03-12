import "./modal.css"
export default function Modal({ winner, handleReset, handleEndGame }) {
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
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          textAlign: "center",
          borderRadius: "10px",
              }}
              className="modal"
      >
        <h2 style={{ color: "rgb(1,1,46)", paddingTop: "20px" }}>
          Congratulations!
        </h2>
        <p
          style={{ color: "rgb(1,1,46)", fontSize: "20px", paddingTop: "10px" }}
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
              padding: "4px 8px",
              background: "rgb(1,1,46)",
              borderRadius: "5px",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Play again!
          </button>
          <button
            onClick={handleEndGame}
            style={{
              padding: "4px 8px",
              background: "white",
              borderRadius: "5px",
              color: "rgb(1,1,46)",
              borderColor: "rgb(1,1,46)",
              cursor: "pointer",
            }}
          >
            End game
          </button>
        </div>
      </div>
    </div>
  );
}
