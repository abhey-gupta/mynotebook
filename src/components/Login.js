import React, { useState } from 'react'
import '../stylesheets/Login.css'
import {useNavigate} from 'react-router-dom';

const Login = () => {

    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({email: '', password: ''})

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    const handleLoginClick = async () => {
        const response = await fetch("http://localhost:4000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password})
        });

        const json = await response.json()
        console.log(json)

        if (json.success) {
            // Save the authtoken and redirect 
            localStorage.setItem('token', json.authtoken)
            navigate('/')
        }
        else {
            alert("invalid credentials")
        }
    }

    return (
        <div className="container">
            <div className="login-form">
                <h1>Login</h1>
                <span>Email</span>
                <input type="email" name="email" id="email" placeholder='Enter your Email' onChange={onChange} />

                <span>Password</span>
                <input type="password" name="password" id="password" placeholder='Enter your password' onChange={onChange} />

                <button type="submit" onClick={handleLoginClick}>Login</button>
            </div>
        </div>
    )
}

export default Login