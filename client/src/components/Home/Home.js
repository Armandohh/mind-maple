import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../helpers/AuthContext';
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";

function Home() {
  let navigate = useNavigate();

  //create a reference to the Slider componenet to access and manipulate it
  let sliderRef = useRef(null);

  //retrieve auth state from Auth Context
  const { authenicationState } = useContext(AuthContext);

  //State to store the decks data fetched from API
  const [decks, setDecks] = useState([]);

  ///settings for slider
  const settings = {
    className: "center",
    dots: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  //check if we have an access token in our local storage
  useEffect(() => {
    //if not have the user log in
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
    else {
      //get the users decks and folders
      axios.get("http://localhost:3001/decks", { headers: { Authorization: localStorage.getItem("accessToken") } }).then((response) => {
        setDecks(response.data);
      })
    }
  }, []);

  return (
    <div>
      <h1 className='title'>Your Folders</h1>
      <h1 className='title'>Your Decks</h1>
      {decks.length > 0 ? (
        <Slider ref={slider => (sliderRef = slider)}{...settings} className="slider">
          {decks.map((value, key) => (
            <div key={key} className="deck">
              <div className="deckTitle">{value.title}</div>
            </div>
          ))}
        </Slider>
      ) : (
        <div>No decks available</div>
      )}
    </div>
  );

}

export default Home
