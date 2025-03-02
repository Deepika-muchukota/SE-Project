import React, { useState } from 'react';
import './App.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import FoodStalls from './FoodStalls'; 
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Burger352 from './Burger_352/Burger352'; 
import Babas from './Baba/Babas';
import StarBucksDrinks from './Starbucks/StarBucksDrinks';
import PandaExpress from './Panda_Exp/PandaExpress';
import Burger from './Burger_352/Burger';
import Chicken from './Burger_352/Chicken'
import Shakes from './Burger_352/Shakes'
import Sides from './Burger_352/Sides'
import Steaks from './Burger_352/Steaks.'
import Vegeterian from './Baba/Vegeterian';

function App() {
  // Dummy user data
  const dummyUser = {
    email: 'user@ex.com',
    password: 'p',
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
           exact path="/foodstalls"
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

          <Route path="/foodstalls/burger352" element={<Burger352 />} />
          <Route path="/foodstalls/baba-pizza" element={<Babas/>} />
          <Route path="/foodstalls/starbucks" element={<StarBucksDrinks />} />
          <Route path="/foodstalls/panda-express" element={<PandaExpress />} />
          <Route path="/foodstalls/burger352/burger" element={<Burger />} />
          <Route path="/foodstalls/burger352/chicken" element={<Chicken />} />
          <Route path="/foodstalls/burger352/shakes" element={<Shakes />} />
          <Route path="/foodstalls/burger352/sides" element={<Sides />} />
          <Route path="/foodstalls/burger352/steaks" element={<Steaks />} />
          <Route path="/foodstalls/Babas/ve" element={<Vegeterian />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;