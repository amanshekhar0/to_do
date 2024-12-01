import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { name, email, password };
    console.log("Form Data:", formData);

    axios
      .post("http://localhost:8080/register", formData)
      .then((res) => {
        console.log("User registered:", res.data);
        alert("Registration successful");
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        alert("Error registering user. Please try again.");
      });
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Create Your Account</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signup-button">
          Register
        </button>
      </form>
      <div className="login-link">
        Already registered? <a href="/login">Sign in</a>
      </div>
    </div>
  );
};

export default Signup;
