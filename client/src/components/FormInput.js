import { useState } from "react";
import "./FormInput.css";

function FormInput(props) {

    const [focused, setFocused] = useState (false);

    //Destructure props to extract label, onChange and id
    const { onChange, id, errorMessage, ...inputProps } = props

    const handleFocus = (e) => {
        setFocused(true);
    }

    return (
        <div className="formInput">
            <input 
                {...inputProps} 
                onChange={onChange} 
                onBlur={handleFocus} 
                focused={focused.toString()}/>
            <span>{errorMessage}</span>
        </div>
    )
}

export default FormInput
