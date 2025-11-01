import React, { useState } from "react";
import axios from "axios";
import "../css/csslogin.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      // Send login request to backend (adjust URL if needed)
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      // If successful
      setSuccess("Login successful! Redirecting...");
      localStorage.setItem("token", res.data.token);

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Unable to connect to server. Please try again later.");
      }
      console.error(err);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1 className="hrms-title">HRMS</h1>
        <h2 className="login-heading">Login</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
