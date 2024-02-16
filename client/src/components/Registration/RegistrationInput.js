import React, { useState } from 'react';
import './RegistrationInput.css';

function RegistrationInput(props) {
    const [focused, setFocused] = useState(false);

    //Destructure props to extract stuff
    const { label, errorMessage, onChange, id, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    }

    return (
        <div className="registrationInput">
            <label className='label'>{label}</label>
            <input
                className='input'
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() =>
                    inputProps.name === "confirmPassword" && setFocused(true)
                }
                focused={focused.toString()}
            />
            <span className='errorMessage'>{errorMessage}</span>
        </div>
    )
}

export default RegistrationInput
