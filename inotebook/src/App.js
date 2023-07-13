import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/noteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {useEffect,useState} from 'react';

function App() {

  const [AtBottom,ToggleScroll] = useState(false);
  
  useEffect(() => {

    const handleScroll = () => {

      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 100) {
      ToggleScroll(!AtBottom);
      }
      
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
// eslint-disable-next-line
  }, []);

  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <div className="sticky-top container my-2">
          <Alert />
        </div>
        <div className="container my-3">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
        <div className={`d-flex justify-content-end my-4 ${AtBottom ? '' :'d-none'}`} style={{height:'50px'}}>Go upward</div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
