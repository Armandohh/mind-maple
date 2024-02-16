import './App.css';
import axios from "axios";
import Home from './components/Home';
import CreateDeck from './components/CreateDeck/CreateDeck';
import Registration from './components/Registration/Registration';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

function App() {
  const [authenticationState, setAuthenticationState] = useState([]);

  useEffect(() => {
    
  }, []);

  return (
    <div className="App">
      <div className='navbar'>
        <div className='links'>
        <Link to="/"> Home Page </Link>
        <Link to="createdeck"> Create Deck </Link>
        <Link to="register"> Register </Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createdeck" element={<CreateDeck />} />
        <Route path="/register" element={<Registration/>} />
      </Routes>
    </div>
  );
}

export default App;
