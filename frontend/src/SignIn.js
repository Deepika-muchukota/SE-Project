import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import cafeteriaBg from "./cafeteria-bg.jpg";
import { useNavigate } from "react-router-dom";

const SignIn = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to store error messages

  const navigate = useNavigate(); // Initialize it inside the component

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await axios.post("http://localhost:5000/api/users/signin", {
        email,
        password,
      });
  
      console.log("SignIn response:", response.data); // <-- Add this line!
  
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user)); 
        setIsLoggedIn(true);
        navigate("/foodstalls");
      }
      else {
        setError("Login failed. Please try again.");
      }
  
    } catch (err) {
      console.error("SignIn Error:", err.response?.data || err.message); // add logging
      setError(err.response?.data?.error || "Invalid email or password");
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
