import React, { useState } from 'react';
import "../css/Login.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login attempted with:", credentials);

        const login_user = {
            email: credentials.email,
            password: credentials.password
        };

        try {
            const response = await fetch('http://localhost:5000/user/loginUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(login_user)
            });

            const data = await response.json();

            if (data === "" || data.length === 0) {
                // backend sent empty string or empty array
                alert("Login unsuccessful! Wrong email or password.");
            } else {
                alert("Login successful!");
                navigate("/chatbox");
            }

        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Log In</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Log In</button>

                <p className="signup-link">
                    Don't have an account? <a href="/">Sign Up</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
