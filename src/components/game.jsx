import { useState } from "react"

export default function Game() {
    const winningPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2, 4, 6]
    ]
    const [currentBoard, setCurrentBoard] = useState([null, null, null, null, null, null, null, null, null])
    const [currentPlayer, setCurrentPlayer] = useState('X')
    const displayResult = () => {
        for (let patterns of winningPatterns) {
            const [a, b, c] = patterns
            if (currentBoard[a] === "X" && currentBoard[b] === "X" && currentBoard[c] === "X") {
                return "Player X wins!"
            
            }
            else if (currentBoard[a] === "O" && currentBoard[b] === "O" && currentBoard[c] === "O") {
                return "Player O wins!"
            }
        }
        if (currentBoard.includes(null)) return;
        return "It is a draw"
    }
    const winner = displayResult()
   
    const handleClick = (index) => {
        if (winner) return;
        if (currentBoard[index] === null ) {
            const newBoard = [...currentBoard]
            newBoard[index] = currentPlayer
            setCurrentBoard(newBoard)
            setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
        } 
        
    }

    const handleReset = () => {
        setCurrentBoard([null, null, null, null, null, null, null, null, null])
        setCurrentPlayer("X")
    }
    return (
        <section style={{ display: "flex", flexDirection: "column", justifyItems: "center", alignItems: "center", paddingTop: "64px" }}>
            <h1 style={{color:"white",fontSize:"16px",paddingBottom:"12px",display:`${currentBoard.includes(null) && !winner ? "block":"none"}`}}>Next Player: {currentPlayer}</h1>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gridTemplateRows:"repeat(3,1fr)",gap:"10px",width:"50%",alignItems:"center"}}>
                {currentBoard.map((square, index) => (
                    <button style={{ padding: "16px 2px" }} onClick={()=>handleClick(index)}>{ square}</button>
                ))}
            </div>
            <button onClick={handleReset} style={{ marginTop: "12px", padding: "4px 24px", borderRadius: "4px" }}>Reset Game</button>
            <p style={{ paddingTop: "12px", color: "white"}} >{winner}</p>
        </section>
    )
}