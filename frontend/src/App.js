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
import Chicken from './Burger_352/Chicken';
import Shakes from './Burger_352/Shakes';
import Sides from './Burger_352/Sides';
import Steaks from './Burger_352/Steaks.';
import Vegeterian from './Baba/Vegeterian';
import Nvegeterian from './Baba/Nvegeterian';
import Layout from './Layout';

// Import Subway components with the correct file names
import Subway from './subway/subway';
import Bread from './subway/bread';
import Protien from './subway/protien';
import Toppings from './subway/toppings';
import Sauces from './subway/sauces';
import SubwaySides from './subway/sides'; // Renamed to avoid conflict
import Drinks from './subway/drinks';

// Import Halal Shack components
// Import Halal Shack components 
import HalalShack from './Halal_shack/HalalShack';
import Base from './Halal_shack/base';
import HalalProtein from './Halal_shack/protein';
import HalalToppings from './Halal_shack/toppings';
import HalalSauces from './Halal_shack/sauces';
import HalalDrinks from './Halal_shack/drinks';
 
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState('true');
  /* State variables for authentication and sign-up form
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  */
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
    return savedCart ? JSON.parse(savedCart) : {};
  });

  // Persist cart changes with useEffect
  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Global function to add or remove an item
  const addItemToCart = (item, action='add') => {
    if (!item || !item.name) {
      return;
    }
    setCart(prevCart => {
      const updatedCart = { ...prevCart };
      if (action === "add") {
        updatedCart[item.name] = (updatedCart[item.name] || 0) + 1;
      } else if (action === "remove") {
        if (updatedCart[item.name] > 1) {
          updatedCart[item.name] -= 1;
        } else {
          delete updatedCart[item.name];
        }
      }
      return updatedCart;
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

          {/* Existing Food Stall Routes */}
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
          
          {/* Subway Routes - Using the actual file names you have */}
          <Route path="/foodstalls/subway" element={<Subway cart={cart} />} />
          <Route path="/foodstalls/subway/bread" element={<Bread cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/subway/protien" element={<Protien cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/subway/toppings" element={<Toppings cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/subway/sauces" element={<Sauces cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/subway/sides" element={<SubwaySides cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/subway/drinks" element={<Drinks cart={cart} addItemToCart={addItemToCart} />} />
          
          {/* Halal Shack Routes */}
          <Route path="/foodstalls/halalshack" element={<HalalShack cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/halalshack/base" element={<Base cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/halalshack/protein" element={<HalalProtein cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/halalshack/toppings" element={<HalalToppings cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/halalshack/sauces" element={<HalalSauces cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/halalshack/drinks" element={<HalalDrinks cart={cart} addItemToCart={addItemToCart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;