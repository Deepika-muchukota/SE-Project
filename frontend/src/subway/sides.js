import React, { useState, useEffect } from "react";
import "./sides.css"; 
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { getFoodStalls, getFoodMenu } from "../services/api";

import chips from "./subway_img/chips.jpeg";
import cookies from "./subway_img/cookies.jpeg";

const defaultCategories = [
  { name: "Chips", image: chips, price: 1.59 },
  { name: "Cookie", image: cookies, price: 0.89 }
];

// Map of side names to images
const sideImages = {
  "Chips": chips,
  "Cookie": cookies
};

const sideOptions = [
  { id: 273, name: "Chips", price: 1.59, image: chips },
  { id: 274, name: "Cookie", price: 0.89, image: cookies }
];

function Sides({ cart, addItemToCart }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { addToCart, loading: cartLoading } = useCart();
  const [itemQuantities, setItemQuantities] = useState({});
  const [isDirectOrder, setIsDirectOrder] = useState(false);
  const [categories, setCategories] = useState(defaultCategories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stallId, setStallId] = useState(null);
  
  // Define the stall name constant to use throughout the component
  const STALL_NAME = "Subway";
  
  // Fetch sides menu items on component mount
  useEffect(() => {
    const fetchSidesMenu = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Get all food stalls
        console.log("Fetching food stalls...");
        const stalls = await getFoodStalls();
        console.log("Food stalls response:", stalls);

        if (!stalls || !Array.isArray(stalls)) {
          console.error("Invalid food stalls response:", stalls);
          setError("Invalid response from server");
          return;
        }
        
        // Find the Subway stall
        const subwayStall = stalls.find(stall => 
          stall.Name?.toLowerCase() === 'subway' || 
          stall.name?.toLowerCase() === 'subway'
        );
        
        console.log("Found Subway stall:", subwayStall);
        
        if (subwayStall) {
          const stallId = subwayStall.ID || subwayStall.id;
          setStallId(stallId);
          console.log("Using stall ID:", stallId);
          
          // Get menu items for Subway
          console.log("Fetching menu for stall ID:", stallId);
          const menu = await getFoodMenu(stallId);
          console.log("Menu response:", menu);
          
          if (!menu || !Array.isArray(menu)) {
            console.error("Invalid menu response:", menu);
            setError("Invalid menu response from server");
            return;
          }
          
          // Filter sides items from the menu
          const sidesItems = menu.filter(item => {
            const itemName = (item.Name || item.name || '').toLowerCase();
            const isSideItem = itemName.includes('chips') || 
                             itemName.includes('cookie');
            console.log(`Checking item ${itemName}: ${isSideItem ? 'is' : 'is not'} a side item`);
            return isSideItem;
          });
          
          console.log("Filtered side items:", sidesItems);
          
          if (sidesItems.length > 0) {
            // Map API data to our format
            const formattedSidesItems = sidesItems.map(item => ({
              id: item.ID || item.id,
              name: item.Name || item.name,
              price: item.Price || item.price || 0,
              image: sideImages[item.Name || item.name] || chips
            }));
            
            console.log("Formatted side items:", formattedSidesItems);
            setCategories(formattedSidesItems);
          } else {
            console.log("No side items found in menu, using defaults");
            setCategories(defaultCategories);
          }
        } else {
          console.error("Available stalls:", stalls);
          setError("Subway stall not found in the available food stalls");
        }
      } catch (err) {
        console.error("Error fetching sides menu:", err);
        setError(err.message || "Failed to load sides menu");
        // Use default categories on error
        console.log("Using default categories due to error");
        setCategories(defaultCategories);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSidesMenu();
  }, []);
  
  // Check if we're coming from the sandwich flow
  useEffect(() => {
    // Detect if this is standalone or part of a meal order
    const hasExistingSandwich = sessionStorage.getItem('selectedBread') || 
                               sessionStorage.getItem('selectedProteins') ||
                               sessionStorage.getItem('selectedSauces');
    
    // Check if we came directly from the main subway menu
    const fromMainMenu = location.state?.fromMainMenu || false;
    
    setIsDirectOrder(fromMainMenu || !hasExistingSandwich);
    
    // Load any previously selected sides from sessionStorage
    const savedSides = sessionStorage.getItem('selectedSides');
    if (savedSides) {
      try {
        const parsedSides = JSON.parse(savedSides);
        const quantities = {};
        
        // Convert from the stored format to our quantities format
        Object.entries(parsedSides).forEach(([name, details]) => {
          quantities[name] = details.quantity;
        });
        
        setItemQuantities(quantities);
      } catch (e) {
        console.error("Error parsing saved sides:", e);
      }
    }
  }, [location]);

  const increaseQuantity = (item) => {
    setItemQuantities(prev => ({
      ...prev,
      [item.name]: (prev[item.name] || 0) + 1
    }));
  };

  const decreaseQuantity = (item) => {
    if (!itemQuantities[item.name] || itemQuantities[item.name] <= 0) return;
    
    setItemQuantities(prev => {
      const newState = { ...prev };
      newState[item.name] = prev[item.name] - 1;
      
      if (newState[item.name] <= 0) {
        delete newState[item.name];
      }
      
      return newState;
    });
  };

  const handlePlaceOrder = async () => {
    try {
      // Add selected sides to cart
      for (const [name, quantity] of Object.entries(itemQuantities)) {
        const side = sideOptions.find(s => s.name === name);
        if (side && quantity > 0) {
          await addToCart({
            menu_id: side.id,
            name: side.name,
            price: side.price,
            quantity
          });
        }
      }
      
      // Store the selected sides in sessionStorage
      sessionStorage.setItem('selectedSides', JSON.stringify(itemQuantities));
      
      // Navigate to cart page
      navigate("/cart");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an error placing your order. Please try again.");
    }
  };

  // Calculate subtotal for sides
  const subtotal = Object.entries(itemQuantities).reduce((total, [name, quantity]) => {
    const item = categories.find(cat => cat.name === name);
    return total + (item ? item.price * quantity : 0);
  }, 0);

  // Add this function to get all selected items from sessionStorage
  const getOrderSummary = () => {
    const bread = sessionStorage.getItem('selectedBread') ? JSON.parse(sessionStorage.getItem('selectedBread')) : null;
    const proteins = sessionStorage.getItem('selectedProteins') ? JSON.parse(sessionStorage.getItem('selectedProteins')) : {};
    const toppings = sessionStorage.getItem('selectedToppings') ? JSON.parse(sessionStorage.getItem('selectedToppings')) : [];
    const sauces = sessionStorage.getItem('selectedSauces') ? JSON.parse(sessionStorage.getItem('selectedSauces')) : [];
    
    // Only include items with quantity > 0
    const sides = {};
    Object.entries(itemQuantities).forEach(([name, qty]) => {
      if (qty && qty > 0) {
        sides[name] = qty;
      }
    });
    
    return { bread, proteins, toppings, sauces, sides };
  };

  const handleContinue = async () => {
    for (const [name, quantity] of Object.entries(itemQuantities)) {
      const side = sideOptions.find(s => s.name === name);
      if (side && quantity > 0) {
        await addToCart({
          menu_id: side.id,
          name: side.name,
          price: side.price,
          quantity
        });
      }
    }
    // Store the selected sides in sessionStorage
    sessionStorage.setItem('selectedSides', JSON.stringify(itemQuantities));
    // Navigate to drinks
    navigate("/foodstalls/subway/drinks");
  };

  if (loading) {
    return <div className="loading">Loading sides options...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <p>Using default side options</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="sides-container">
      <div className="overlay"></div> 
      <h2 className="page-title">Select Your Sides</h2>
      
      <div className="category-grid">
        {sideOptions.map((category, index) => (
          <div key={index} className="item-card">
            <img 
              src={category.image} 
              alt={category.name} 
              className="category-image"
            />
            <p className="category-name">{category.name}</p>
            <p className="item-price">${category.price.toFixed(2)}</p>
            
            <div className="quantity-controls">
              <button 
                className="quantity-btn decrease" 
                onClick={() => decreaseQuantity(category)}
                disabled={!itemQuantities[category.name]}
              >
                -
              </button>
              <span className="quantity-display">
                {itemQuantities[category.name] || 0}
              </span>
              <button 
                className="quantity-btn increase" 
                onClick={() => increaseQuantity(category)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="order-summary">
        <h3>Sides Selection</h3>
        {Object.keys(itemQuantities).length > 0 ? (
          <>
            <ul className="selected-items">
              {Object.entries(itemQuantities).map(([name, quantity]) => (
                <li key={name}>
                  {name} x{quantity} - ${(sideOptions.find(s => s.name === name)?.price * quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="subtotal">Subtotal: ${subtotal.toFixed(2)}</p>
          </>
        ) : (
          <p>No sides selected yet.</p>
        )}
      </div>
      
      <div className="navigation-buttons">
        <button 
          className="back-btn"
          onClick={() => navigate("/foodstalls/subway/toppings")}
        >
          Back to Toppings
        </button>
        <button 
          className="continue-btn" 
          onClick={handleContinue}
          disabled={Object.keys(itemQuantities).length === 0}
        >
          Continue to Drinks
        </button>
      </div>
    </div>
  );
}

export default Sides;