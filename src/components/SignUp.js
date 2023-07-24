import React, { useState } from 'react'
import '../stylesheets/SignUp.css'
import {useNavigate} from 'react-router-dom';

const SignUp = () => {

    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({name: '', email: '', password: ''})

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    const handleSignupClick = async () => {
        const response = await fetch("http://localhost:4000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password})
        });

        const json = await response.json()
        console.log(json)

        if (json.success) {
            // Save the authtoken and redirect 
            localStorage.setItem('token', json.authtoken)
            navigate('/')
        }
        else {
            alert("An Error occured")
        }
    }

    return (
        <div className="container">
            <div className="login-form">
                <h1>Create new account</h1>

                <span>Name</span>
                <input type="text" name="name" id="name" placeholder='Enter your name' onChange={onChange} />

                <span>Email</span>
                <input type="email" name="email" id="email" placeholder='Enter your Email' onChange={onChange} />

                <span>Password</span>
                <input type="password" name="password" id="password" placeholder='Enter your password' onChange={onChange} />

                <button type="submit" onClick={handleSignupClick}>Sign Up</button>
            </div>
        </div>
    )
}

export default SignUp;