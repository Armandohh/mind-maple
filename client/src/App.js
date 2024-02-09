import './App.css';
import axios from "axios";
import Home from './components/Home';
import CreateDeck from './components/CreateDeck';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

function App() {
  const [userDecks, setUserDecks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/decks").then((res) => {
      setUserDecks(res.data);
    })
  }, []);

  return (
    <div className="App">
      <Link to="createdeck"> Create Deck </Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createdeck" element={<CreateDeck />} />
      </Routes>
    </div>
  );
}

export default App;
