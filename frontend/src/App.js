import React, { useState } from 'react';
import './App.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import FoodStalls from './FoodStalls'; 
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  // Dummy user data
  const dummyUser = {
    email: 'user@example.com',
    password: 'password123',
  };

  // State variables for authentication and sign-up form
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, confirmSetPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Function to handle sign-in
  const handleSignIn = (emailInput, passwordInput) => {
    if (emailInput === dummyUser.email && passwordInput === dummyUser.password) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Sign In Route */}
          <Route
            path="/signin"
            element={
              isLoggedIn ? (
                <Navigate to="/foodstalls" />
              ) : (
                <SignIn onSignIn={handleSignIn} />
              )
            }
          />

          {/* Sign Up Route */}
          <Route
            path="/signup"
            element={
              <SignUp
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                confirmSetPassword={confirmSetPassword}
                errors={errors}
                setErrors={setErrors}
                passwordFocused={passwordFocused}
                setPasswordFocused={setPasswordFocused}
              />
            }
          />

          {/* Food Stalls Route */}
          <Route
            path="/foodstalls"
            element={
              isLoggedIn ? (
                <FoodStalls onLogout={handleLogout} />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/signin" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
