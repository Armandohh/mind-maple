import './App.css';
import axios from "axios";
import Home from './components/Home/Home';
import CreateDeck from './components/CreateDeck/CreateDeck';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { AuthContext } from './helpers/AuthContext';

function App() {
  let navigate = useNavigate();

  //set authentication state to see if user is logged in
  const [authenticationState, setAuthenticationState] = useState({
    username: "",
    loggedIn: false,
  });

  //use useEffect hook to see if user is logged in
  useEffect(() => {
    //make a get request to server to get user information
    axios.get("http://localhost:3001/user", {
      headers: {
        //pass access token from local storage as part of headers
        Authorization: localStorage.getItem("accessToken"),
      }
    }).then((response) => {
      //if request returns an error then keep set logged in to false
      if (response.data.error) {
        setAuthenticationState({ ...authenticationState, loggedIn: false });
      }
      else {
        setAuthenticationState({
          username: response.data.username,
          loggedIn: true,
        });
      }
    });
  }, []);

  //function to log user out when he clicks log out
  const logout = () => {
    //remove access token from local storage
    localStorage.removeItem("accessToken");

    //set authentication state back to empty
    setAuthenticationState({
      username: "",
      loggedIn: false,
    });

    //send them to the login page
    navigate("/login");
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authenticationState, setAuthenticationState }}>
        <div className='navbar'>
          <h1 className='mindMaple'>Mind Maple</h1>
          <div className='links'>
            {!authenticationState.loggedIn ? (
              <div className='loggedOutContainer'>
                <Link to="login"> Login </Link>
                <Link to="register"> Register </Link>
              </div>
            ) : (
              <>
                <Link to="/"> Home Page </Link>
                <Link to="createdeck"> Create Deck </Link>
                <div className="loggedInContainer">
                  <p className='username'>{authenticationState.username}</p>
                  <button className="logoutButton" onClick={logout}>Logout</button>
                </div>
              </>
            )}
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createdeck" element={<CreateDeck />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
