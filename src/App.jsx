import { BrowserRouter,Routes,Route } from "react-router-dom"
import Game from "./components/game"
import Input from "./components/Input"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Input />} />
        <Route path="/game" element={<Game/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
