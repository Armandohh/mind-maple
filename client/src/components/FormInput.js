import "./FormInput.css";

function FormInput(props) {

    //Destructure props to extract label, onChange and id
    const { onChange, id, ...inputProps } = props

    return (
        <div className="formInput">
            <input {...inputProps} onChange={onChange} />
        </div>
    )
}

export default FormInput
