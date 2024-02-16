import "./CreateDeck.css";
import { useState } from "react";
import CreateDeckInput from "./CreateDeckInput";
import axios from "axios";

function CreateDeck() {
  //Define state for the my deck object
  const [deck, setDeck] = useState({
    title: "",
    description: "",
  });

  //Define input fields with props
  const inputs = [
    {
      id: 1,
      name: "title",
      type: "text",
      placeholder: "Bio 120 Midterm",
      label: "Title",
      errorMessage:
        "Title should be between 1 and 20 characters and cannot include any special character.",
      pattern: "^[A-Za-z0-9 ]{1,20}$",
      required: true,
    },
    {
      id: 2,
      name: "description",
      type: "text",
      placeholder: "These are my study flashcards for my midterm.",
      label: "Description",
      className: "description",
      pattern: "^[A-Za-z0-9 ]{0,50}$",
      errorMessage: "Description should not exceed 50 characters.",
    },
  ];

  //Update deck state when input value changes
  const onChange = (e) => {
    setDeck({ ...deck, [e.target.name]: e.target.value });
  };

  //Handle form submission
  const onSubmit = (e) => {

    //prevent page refresh
    e.preventDefault();

    //make api post call and create and store deck in database
    axios.post("http://localhost:3001/decks", deck).then((res) => {
      console.log("Works!");
    });
  };

  return (
    <div className="container">
      <h1 className="title">Create a New Deck</h1>
      <form className="createDeck" onSubmit={onSubmit}>
        {inputs.map((input) => (
          <CreateDeckInput
            key={input.id}
            {...input}
            value={deck[input.name]}
            onChange={onChange}
          />
        ))}
        <button className="createDeckButton" type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateDeck;
