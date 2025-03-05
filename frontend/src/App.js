import React, { useState, useEffect } from 'react';
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
import Nvegeterian from './Baba/Nvegeterian';
import Layout from './Layout';

function App() {

  // State variables for authentication and sign-up form
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, confirmSetPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [passwordFocused, setPasswordFocused] = useState(false);

  useEffect(() => {
    localStorage.clear();
  }, []);

  const [cart, setCart] = useState(() => {
    const savedCart = sessionStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Persist cart changes (or trigger any side-effect) with useEffect
  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Global function to add or remove an item
  const addItemToCart = (item, action = "add") => {
    setCart(prevCart => {
      if (action === "add") {
        // Add the item only if it's not already in the cart
        return prevCart.some(cartItem => cartItem.name === item.name)
          ? prevCart
          : [...prevCart, item];
      } else if (action === "remove") {
        return prevCart.filter(cartItem => cartItem.name !== item.name);
      }
      return prevCart;
    });
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
                <SignIn/>
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
                <Layout cart={cart} setCart={setCart} onLogout={handleLogout}>
                  <FoodStalls onLogout={handleLogout} />
                </Layout>
              ) : (
                <Navigate to="/signin" />
              )
            }
          />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/signin" />} />

          <Route path="/foodstalls/burger352" element={<Burger352 />} />
          <Route path="/foodstalls/baba-pizza" element={<Babas/>} />
          <Route path="/foodstalls/starbucks" element={<StarBucksDrinks cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/panda-express" element={<PandaExpress />} />
          <Route path="/foodstalls/burger352/burger"  element={<Burger cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/burger352/chicken" element={<Chicken cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/burger352/shakes" element={<Shakes cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/burger352/sides" element={<Sides cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/burger352/steaks" element={<Steaks cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/Babas/ve" element={<Vegeterian cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/Babas/nve" element={<Nvegeterian cart={cart} addItemToCart={addItemToCart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;