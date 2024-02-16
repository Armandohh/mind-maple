import { useState } from "react";
import "./CreateDeckInput.css";

function CreateDeckInput(props) {
    const [focused, setFocused] = useState(false);

    //Destructure props to extract label, onChange and id
    const { label, onChange, id, className, errorMessage, ...inputProps } = props

    const handleFocus = (e) => {
        setFocused(true);
    }

    return (
        <div className={`deckInput ${className ? className : ""}`}>
            <label className="label">{label}</label>
            <input
                className="input"
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                focused={focused.toString()}
            />
            <span className="errorMessage">{errorMessage}</span>
        </div>
    )
}

export default CreateDeckInput
