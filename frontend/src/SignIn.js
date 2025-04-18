import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import cafeteriaBg from "./cafeteria-bg.jpg";

const SignIn = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to store error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:3500/auth/login", { 
        email, 
        password 
      });

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token); // Store auth token
        setIsLoggedIn(true); // Update login state
      } else {
        setError("Login failed. Please try again.");
      }
      
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div
      className="signin-page"
      style={{
        backgroundImage: `url(${cafeteriaBg})`,
        backgroundSize: "cover",
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="signin-container">
        <h2>Sign In</h2>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signin-btn">Sign In</button>
        </form>
        <div className="signin-links">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
