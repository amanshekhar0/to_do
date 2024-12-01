import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login details submitted:", { email, password });

    axios
      .post("http://localhost:8080/login", { email, password })
      .then((res) => {
        console.log("user logged in", res);
        if (res.data === "logged") {
          navigate("/todo");
        } else {
          alert(res.data); 
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error logging in. Please try again.");
      });
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
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
            className="form-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <div className="signup-link">
      Don't have an account? <NavLink to="/">Sign up</NavLink>
      </div>
    </div>
  );
};

export default Login;
