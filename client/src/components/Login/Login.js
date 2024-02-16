import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./Login.css";

function Login() {
    let navigate = useNavigate();

    //Define states for username and password
    const [loginValues, setLoginValues] = useState({
        username: "",
        password: "",
    });

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            label: "Username",
            required: true,
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Password",
            label: "Password",
            required: true,
        },

    ]
    //const { setAuthState } = useContext(AuthContext);

    //Update login values state when input value changes
    const onChange = (e) => {
        setLoginValues({ ...loginValues, [e.target.name]: e.target.value })
    }

    //Handle login
    const onSubmit = (e) => {
        //prevent page refresh
        e.preventDefault();

        //make api post call to login user
        axios.post("http://localhost:3001/user/login", loginValues).then((response) => {
            //if we get an error from API call then display that error
            if (response.data.error) {
                alert(response.data.error);
            }
            else {
                //set the local storate
                localStorage.setItem("accessToken", response.data.token);
                //setAuthState({ username: res.data.username, id: res.data.id, status: true });
                navigate("/");
            }
        });
    }

    return (
        <div className='loginContainer'>
            <h1 className='title'> Login</h1>
            <form className="login" onSubmit={onSubmit}>
                {inputs.map((input) => (
                    <div className="loginInput" key={input.id}>
                        <label>{input.label}</label>
                        <input
                            type={input.type}
                            name={input.name}
                            placeholder={input.placeholder}
                            value={loginValues[input.name]}
                            onChange={onChange}
                            required={input.required}
                        />
                    </div>
                ))}
                <button className="loginButton" type="submit"> Login </button>
            </form>
        </div>
    )
}

export default Login
