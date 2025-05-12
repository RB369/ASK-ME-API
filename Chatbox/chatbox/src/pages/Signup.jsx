import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/Signup.css";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("User registered:", formData);

        const new_user = {
            "email": formData.email,
            "name": formData.name,
            "password": formData.password
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_user)
        };
        const response = await fetch('http://localhost:5000/user/addUser', requestOptions);
        const data = await response.json();

        try {
            if (data._id != null) {
                alert("signup successful")
                navigate("/chatbox");
            }
            else {
                alert("Registration unsuccessful")
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("An error occurred. Please try again later.");
        }

    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Create Account</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Sign Up</button>

                <p className="login-link">
                    Already have an account? <a href="/login">Log In</a>
                </p>
            </form>
        </div>
    );
};

export default Signup;
