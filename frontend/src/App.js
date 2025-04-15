import React, { useState, useEffect } from 'react';
import './App.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import FoodStalls from './FoodStalls'; 
import CartPage from './CartPage'; // Import the CartPage component
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Burger352 from './Burger_352/Burger352'; 
import Babas from './Baba/Babas';
import StarBucksDrinks from './Starbucks/StarBucksDrinks';
import PandaExpress from './Panda_Exp/PandaExpress';
import Burger from './Burger_352/Burger';
import Chicken from './Burger_352/Chicken';
import Shakes from './Burger_352/Shakes';
import Sides from './Burger_352/Sides';
import Steaks from './Burger_352/Steaks';
import Vegeterian from './Baba/Vegeterian';
import Nvegeterian from './Baba/Nvegeterian';
import Layout from './Layout';

// Import Subway components
import Subway from './subway/subway';
import Bread from './subway/bread';
import Protien from './subway/protien';
import Toppings from './subway/toppings';
import Sauces from './subway/sauces';
import SubwaySides from './subway/sides'; // Renamed to avoid conflict
import Drinks from './subway/drinks';

// Import Halal Shack components 
import HalalShack from './Halal_shack/HalalShack';
import Base from './Halal_shack/base';
import HalalProtein from './Halal_shack/protein';
import HalalToppings from './Halal_shack/toppings';
import HalalSauces from './Halal_shack/sauces';
import HalalDrinks from './Halal_shack/drinks';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState('false');
  
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

  // Changed cart structure to store complete orders instead of individual items
  const [cart, setCart] = useState(() => {
    const savedCart = sessionStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Add this effect to log cart changes
  useEffect(() => {
    console.log("Cart updated:", cart);
    console.log("Total orders in cart:", cart.length);
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Updated function to add complete orders to cart
  const addOrderToCart = (order) => {
    if (!order || !order.stall) {
      console.warn("Tried to add invalid order to cart", order);
      return;
    }
    
    console.log("Adding order from:", order.stall);
    
    setCart(prevCart => {
      // Generate a unique orderId for this order
      const orderId = `${order.stall}-${Date.now()}`;
      const orderWithId = {
        ...order,
        orderId: orderId,
        timestamp: new Date().toISOString()
      };
      
      return [...prevCart, orderWithId];
    });
  };

  // Function to remove an order from cart
  const removeOrderFromCart = (orderId) => {
    setCart(prevCart => prevCart.filter(order => order.orderId !== orderId));
  };

  // Legacy function to maintain compatibility with existing components
  const addItemToCart = (item, action='add', stallName = 'Individual Items') => {
    if (!item || !item.name) {
      console.warn("Tried to add invalid item to cart", item);
      return;
    }
    
    console.log(`${action === 'add' ? 'Adding' : 'Removing'} individual item from ${stallName}:`, item.name);
    
    // Create a simple order for individual items
    if (action === "add") {
      // Extract price properly - handle both number and string formats
      let itemPrice = 0;
      if (typeof item.price === 'number') {
        itemPrice = item.price;
      } else if (typeof item.price === 'string') {
        // Remove $ sign and convert to number
        itemPrice = parseFloat(item.price.replace(/[$,]/g, '')) || 0;
      }
      
      const singleItemOrder = {
        stall: stallName, // Use the provided stall name instead of default
        items: [{ 
          type: "Item", 
          name: item.name, 
          price: itemPrice,
          quantity: 1
        }],
        totalPrice: itemPrice,
      };
      
      addOrderToCart(singleItemOrder);
    } else if (action === "remove") {
      // Find the first order containing this item and remove it
      setCart(prevCart => {
        const orderIndex = prevCart.findIndex(order => 
          order.stall === stallName && 
          order.items.some(orderItem => orderItem.name === item.name)
        );
        
        if (orderIndex === -1) return prevCart;
        
        const newCart = [...prevCart];
        newCart.splice(orderIndex, 1);
        return newCart;
      });
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
                <SignIn setIsLoggedIn={setIsLoggedIn} />
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
                <Layout cart={cart} setCart={setCart} onLogout={handleLogout} removeOrderFromCart={removeOrderFromCart}>
                  <FoodStalls onLogout={handleLogout} />
                </Layout>
              ) : (
                <Navigate to="/signin" />
              )
            }
          />

          {/* New Cart Page Route */}
          <Route
            path="/cart"
            element={
              isLoggedIn ? (
                <CartPage 
                  cart={cart} 
                  setCart={setCart} 
                  removeOrderFromCart={removeOrderFromCart} 
                />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/signin" />} />

          {/* Existing Food Stall Routes */}
          <Route path="/foodstalls/burger352" element={
            <Layout cart={cart} setCart={setCart} onLogout={handleLogout} removeOrderFromCart={removeOrderFromCart}>
              <Burger352 />
            </Layout>
          } />
          <Route path="/foodstalls/baba-pizza" element={
            <Layout cart={cart} setCart={setCart} onLogout={handleLogout} removeOrderFromCart={removeOrderFromCart}>
              <Babas/>
            </Layout>
          } />
          <Route path="/foodstalls/starbucks" element={
            <Layout cart={cart} setCart={setCart} onLogout={handleLogout} removeOrderFromCart={removeOrderFromCart}>
              <StarBucksDrinks cart={cart} addItemToCart={addItemToCart} />
            </Layout>
          } />
          <Route 
            path="/foodstalls/panda-express" 
            element={
              <Layout cart={cart} setCart={setCart} onLogout={handleLogout} removeOrderFromCart={removeOrderFromCart}>
                <PandaExpress cart={cart} addOrderToCart={addOrderToCart} addItemToCart={addItemToCart} />
              </Layout>
            } 
          />
          <Route path="/foodstalls/burger352/burger" element={
            <Layout cart={cart} setCart={setCart} onLogout={handleLogout} removeOrderFromCart={removeOrderFromCart}>
              <Burger cart={cart} addItemToCart={addItemToCart} />
            </Layout>
          } />
          <Route path="/foodstalls/burger352/chicken" element={
            <Layout cart={cart} setCart={setCart} onLogout={handleLogout} removeOrderFromCart={removeOrderFromCart}>
              <Chicken cart={cart} addItemToCart={addItemToCart} />
            </Layout>
          } />
          <Route path="/foodstalls/burger352/shakes" element={
            <Layout cart={cart} setCart={setCart} onLogout={handleLogout} removeOrderFromCart={removeOrderFromCart}>
              <Shakes cart={cart} addItemToCart={addItemToCart} />
            </Layout>
          } />
          <Route path="/foodstalls/burger352/sides" element={
            <Layout cart={cart} setCart={setCart} onLogout={handleLogout} removeOrderFromCart={removeOrderFromCart}>
              <Sides cart={cart} addItemToCart={addItemToCart} />
            </Layout>
          } />
          <Route path="/foodstalls/burger352/steaks" element={
            <Layout cart={cart} setCart={setCart} onLogout={handleLogout} removeOrderFromCart={removeOrderFromCart}>
              <Steaks cart={cart} addItemToCart={addItemToCart} />
            </Layout>
          } />
          <Route path="/foodstalls/Babas/ve" element={
            <Layout cart={cart} setCart={setCart} onLogout={handleLogout} removeOrderFromCart={removeOrderFromCart}>
              <Vegeterian cart={cart} addItemToCart={addItemToCart} />
            </Layout>
          } />
          <Route path="/foodstalls/Babas/nve" element={
            <Layout cart={cart} setCart={setCart} onLogout={handleLogout} removeOrderFromCart={removeOrderFromCart}>
              <Nvegeterian cart={cart} addItemToCart={addItemToCart} />
            </Layout>
          } />
          
          {/* Subway Routes */}
          <Route path="/foodstalls/subway" element={
            <Layout cart={cart} setCart={setCart} onLogout={handleLogout} removeOrderFromCart={removeOrderFromCart}>
              <Subway cart={cart} />
            </Layout>
          } />
          <Route path="/foodstalls/subway/bread" element={
            <Layout cart={cart} setCart={setCart} onLogout={handleLogout} removeOrderFromCart={removeOrderFromCart}>
              <Bread cart={cart} addItemToCart={addItemToCart} />
            </Layout>
          } />
          <Route path="/foodstalls/subway/protien" element={
            <Layout cart={cart} setCart={setCart} onLogout={handleLogout} removeOrderFromCart={removeOrderFromCart}>
              <Protien cart={cart} addItemToCart={addItemToCart} />
            </Layout>
          } />
          <Route path="/foodstalls/subway/toppings" element={
            <Layout cart={cart} setCart={setCart} onLogout={handleLogout} removeOrderFromCart={removeOrderFromCart}>
              <Toppings cart={cart} addItemToCart={addItemToCart} />
            </Layout>
          } />
          <Route path="/foodstalls/subway/sauces" element={
            <Layout cart={cart} setCart={setCart} onLogout={handleLogout} removeOrderFromCart={removeOrderFromCart}>
              <Sauces cart={cart} addItemToCart={addItemToCart} />
            </Layout>
          } />
          <Route path="/foodstalls/subway/sides" element={
            <Layout cart={cart} setCart={setCart} onLogout={handleLogout} removeOrderFromCart={removeOrderFromCart}>
              <SubwaySides cart={cart} addItemToCart={addItemToCart} />
            </Layout>
          } />
          <Route path="/foodstalls/subway/drinks" element={
            <Layout cart={cart} setCart={setCart} onLogout={handleLogout} removeOrderFromCart={removeOrderFromCart}>
              <Drinks cart={cart} addItemToCart={addItemToCart} />
            </Layout>
          } />
          
          {/* Halal Shack Routes with updated props */}
          <Route path="/foodstalls/halalshack" element={
            <Layout cart={cart} setCart={setCart} onLogout={handleLogout} removeOrderFromCart={removeOrderFromCart}>
              <HalalShack cart={cart} addOrderToCart={addOrderToCart} addItemToCart={addItemToCart} />
            </Layout>
          } />
          <Route path="/foodstalls/halalshack/base" element={
            <Layout cart={cart} setCart={setCart} onLogout={handleLogout} removeOrderFromCart={removeOrderFromCart}>
              <Base cart={cart} />
            </Layout>
          } />
          <Route path="/foodstalls/halalshack/protein" element={
            <Layout cart={cart} setCart={setCart} onLogout={handleLogout} removeOrderFromCart={removeOrderFromCart}>
              <HalalProtein cart={cart} />
            </Layout>
          } />
          <Route path="/foodstalls/halalshack/toppings" element={
            <Layout cart={cart} setCart={setCart} onLogout={handleLogout} removeOrderFromCart={removeOrderFromCart}>
              <HalalToppings cart={cart} />
            </Layout>
          } />
          <Route path="/foodstalls/halalshack/sauces" element={
            <Layout cart={cart} setCart={setCart} onLogout={handleLogout} removeOrderFromCart={removeOrderFromCart}>
              <HalalSauces cart={cart} />
            </Layout>
          } />
          <Route path="/foodstalls/halalshack/drinks" element={
            <Layout cart={cart} setCart={setCart} onLogout={handleLogout} removeOrderFromCart={removeOrderFromCart}>
              <HalalDrinks cart={cart} addOrderToCart={addOrderToCart} addItemToCart={addItemToCart} />
            </Layout>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
