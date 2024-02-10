import "./CreateDeck.css";
import { useState } from "react";
import FormInput from "./FormInput";
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
      className: "description",
      pattern: "^[A-Za-z0-9 ]{0,50}$",
      errorMessage: "Description should not exceed 50 characters.",
    },
  ];

  //Update deck state when input value changes
  const onChange = (e) => {
    setDeck({ ...deck, [e.target.name]: e.target.value });
  };

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/decks", data).then((res) => {
      console.log("Works!");
    });
  };

  return (
    <div>
      <h1>Create a New Deck</h1>
      <form onSubmit={onSubmit}>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={deck[input.name]}
            onChange={onChange}
          />
        ))}
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateDeck;
