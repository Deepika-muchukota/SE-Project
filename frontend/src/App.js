import React, { useState, useEffect } from 'react';
import './App.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import FoodStalls from './FoodStalls';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';

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

import Subway from './subway/subway';
import Bread from './subway/bread';
import Protien from './subway/protien';
import Toppings from './subway/toppings';
import Sauces from './subway/sauces';
import SubwaySides from './subway/sides';
import Drinks from './subway/drinks';

import HalalShack from './Halal_shack/HalalShack';
import Base from './Halal_shack/base';
import HalalProtein from './Halal_shack/protein';
import HalalToppings from './Halal_shack/toppings';
import HalalSauces from './Halal_shack/sauces';
import HalalDrinks from './Halal_shack/drinks';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, confirmSetPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [cart, setCart] = useState({});
  const [menuItems, setMenuItems] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("authToken");

  // Fetch all menu items once logged in
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/foodstalls");
        const stalls = res.data.foodstalls || [];

        let allItems = [];

        for (const stall of stalls) {
          const res = await axios.get(`http://localhost:5000/api/foodstalls/${stall.id}/menu`);
          allItems = [...allItems, ...res.data.menu];
        }

        setMenuItems(allItems);
      } catch (err) {
        console.error("Failed to load menu items", err);
      }
    };

    if (user && token) {
      fetchMenus();
    }
  }, [isLoggedIn]);

  // Fetch cart items from backend on login
  useEffect(() => {
    if (!user || !token) return;

    const fetchCart = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cart/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const items = res.data.cartItems || [];
        const cartMap = {};
        items.forEach(item => {
          const menuItem = menuItems.find(m => m.id === item.menu_id);
          if (menuItem) {
            cartMap[menuItem.name] = item.quantity;
          }
        });
        setCart(cartMap);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };

    fetchCart();
  }, [isLoggedIn, menuItems]);

  // Sync local cart to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add/Remove cart items and sync with backend
  const addItemToCart = async (item, action = 'add') => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (!item || !item.name || !currentUser) return;
  
    const menuItem = menuItems.find(m => m.name === item.name);
    if (!menuItem) return;
  
    const currentQty = cart[item.name] || 0;
    const newQty = action === 'add' ? currentQty + 1 : currentQty - 1;
  
    try {
      if (newQty <= 0) {
        await axios.delete(`http://localhost:5000/api/cart/delete/${currentUser.id}/${menuItem.id}`);
      } else {
        await axios.post("http://localhost:5000/api/cart/add", {
          user_id: currentUser.id || currentUser.ID,
          menu_id: menuItem.id,
          quantity: newQty
        });
      }
  
      setCart(prev => {
        const updated = { ...prev };
        if (newQty <= 0) {
          delete updated[item.name];
        } else {
          updated[item.name] = newQty;
        }
        return updated;
      });
    } catch (err) {
      console.error("Cart sync error", err);
    }
  };   

  const handleLogout = async () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData?.id || userData?.ID;
  
    if (userId) {
      try {
        await axios.delete(`http://localhost:5000/api/cart/empty/${userId}`);
      } catch (err) {
        console.error("Logout cart cleanup failed", err);
      }
    }
  
    setIsLoggedIn(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setCart({});
  };
  

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signin" element={
            isLoggedIn ? <Navigate to="/foodstalls" /> : <SignIn setIsLoggedIn={setIsLoggedIn} />
          } />
          <Route path="/signup" element={
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
          } />
          <Route exact path="/foodstalls" element={
            isLoggedIn ? (
              <Layout cart={cart} setCart={setCart} onLogout={handleLogout}>
                <FoodStalls onLogout={handleLogout} />
              </Layout>
            ) : <Navigate to="/signin" />
          } />
          <Route path="/" element={<Navigate to="/signin" />} />

          {/* FoodStall Menus */}
          <Route path="/foodstalls/burger352" element={<Burger352 />} />
          <Route path="/foodstalls/baba-pizza" element={<Babas />} />
          <Route path="/foodstalls/starbucks" element={<StarBucksDrinks cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/panda-express" element={<PandaExpress />} />
          <Route path="/foodstalls/burger352/burger" element={<Burger cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/burger352/chicken" element={<Chicken cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/burger352/shakes" element={<Shakes cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/burger352/sides" element={<Sides cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/burger352/steaks" element={<Steaks cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/Babas/ve" element={<Vegeterian cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/Babas/nve" element={<Nvegeterian cart={cart} addItemToCart={addItemToCart} />} />

          {/* Subway */}
          <Route path="/foodstalls/subway" element={<Subway cart={cart} />} />
          <Route path="/foodstalls/subway/bread" element={<Bread cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/subway/protien" element={<Protien cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/subway/toppings" element={<Toppings cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/subway/sauces" element={<Sauces cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/subway/sides" element={<SubwaySides cart={cart} addItemToCart={addItemToCart} />} />
          <Route path="/foodstalls/subway/drinks" element={<Drinks cart={cart} addItemToCart={addItemToCart} />} />

          {/* Halal Shack */}
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
