import { useState } from 'react'
import RegistrationInput from './RegistrationInput'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./Registration.css"

function Registration() {
  let navigate = useNavigate();
  //Define state for the registration inputs
  const [registrationValues, setRegistrationValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirm: "",
  })

  ///Define intput fields with props
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      errorMessage: "Username should be 5-12 chracters in length and shouldn't include any special characters.",
      pattern: "^[A-Za-z0-9]{5,12}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      errorMessage: "Email address needs to be valid.",
      required: true,
    },
    {
      id: 3,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday"
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      errorMessage: "Password should be 8-20 chracters and include at least 1 letter, 1 number and 1 special character",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      label: "Confirm Password",
      errorMessage: "Passwords don't match.",
      pattern: registrationValues.password,
      required: true,
    },


  ]

  //Update registration values state when input value changes
  const onChange = (e) => {
    setRegistrationValues({ ...registrationValues, [e.target.name]: e.target.value })
  }

  //Handle form submission
  const onSubmit = (e) => {
    //prevent page refresh
    e.preventDefault();

    //make api post call and create profile and store new user in database
    axios.post("http://localhost:3001/user", registrationValues).then((res) => {
      console.log("User created.");
      navigate("/");
    })
  };

  return (
    <div className='container'>
      <h1 className='title'>Register</h1>
      <form className="registration" onSubmit={onSubmit}>
        {inputs.map((input) => (
          <RegistrationInput
            key={input.id}
            {...input}
            value={registrationValues[input.name]}
            onChange={onChange}
          />
        ))}
        <button className='registrationButton' type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default Registration
