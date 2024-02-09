import './CreateDeck.css';
import { useState } from 'react';
import FormInput from './FormInput';


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
        },
        {
            id: 2,
            name: "description",
            type: "text",
            placeholder: "These are my study flashcards for my midterm.",
            className: "description"
        },
    ]

    //Update deck state when input value changes
    const onChange = (e) => {
        setDeck({ ...deck, [e.target.name]: e.target.value })
    }

    console.log(deck);

    return (
        <div>
            <h1>Create a New Deck</h1>
            <form>
                {inputs.map((input) => (
                    <FormInput key={input.id} {...input} value={deck[input.name]} onChange={onChange} />
                ))}

            <button>Create</button>  
            </form>
        </div>
    )
}

export default CreateDeck
