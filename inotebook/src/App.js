import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/noteState";

function App() {
  return (
    <NoteState>
    <BrowserRouter>
    <Navbar/>
    <div className="container my-3">
    <Routes>
    <Route index element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    </Routes>
    </div>
    </BrowserRouter>
    </NoteState>
  );
}

export default App;
