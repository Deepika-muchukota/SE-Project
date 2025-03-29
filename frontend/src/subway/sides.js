import React, { useState, useEffect } from "react";
import "./sides.css"; 
import { useNavigate, useLocation } from "react-router-dom";
import chips from "./subway_img/chips.jpeg";
import cookies from "./subway_img/cookies.jpeg";

const categories = [
  { name: "Chips", image: chips, price: 1.59 },
  { name: "Cookie", image: cookies, price: 0.89 }
];

function Sides({ cart, addItemToCart }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [itemQuantities, setItemQuantities] = useState({});
  const [isDirectOrder, setIsDirectOrder] = useState(false);
  
  // Define the stall name constant to use throughout the component
  const STALL_NAME = "Subway";
  
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

  const handleContinue = () => {
    // Convert quantities to an object with item details for easier retrieval later
    const sidesWithDetails = {};
    Object.entries(itemQuantities).forEach(([name, quantity]) => {
      const item = categories.find(cat => cat.name === name);
      if (item && quantity > 0) {
        sidesWithDetails[name] = {
          quantity: quantity,
          price: item.price
        };
      }
    });
    
    // Store selection in sessionStorage for later
    sessionStorage.setItem('selectedSides', JSON.stringify(sidesWithDetails));
    
    // Check if this is a direct sides order or part of a meal
    if (isDirectOrder) {
      // Handle standalone side order
      if (Object.keys(itemQuantities).length > 0) {
        // Add each side as a separate item to the cart
        Object.entries(itemQuantities).forEach(([name, quantity]) => {
          const item = categories.find(cat => cat.name === name);
          if (item && quantity > 0) {
            for (let i = 0; i < quantity; i++) {
              // Use the addItemToCart function from props
              const sideItem = {
                name: name,
                price: item.price,
                orderType: "Side"
              };
              addItemToCart(sideItem, "add", STALL_NAME);
            }
          }
        });
        
        // Calculate subtotal for sides
        const subtotal = Object.entries(itemQuantities).reduce((total, [name, quantity]) => {
          const item = categories.find(cat => cat.name === name);
          return total + (item ? item.price * quantity : 0);
        }, 0);
        
        // Clear the session storage for sides since we're not continuing the flow
        sessionStorage.removeItem('selectedSides');
        
        alert(`Items added to cart! Total: $${subtotal.toFixed(2)}`);
        navigate("/foodstalls");
      } else {
        alert("Please select at least one item.");
      }
    } else {
      // Continue to drinks (part of sandwich flow)
      navigate("/foodstalls/subway/drinks");
    }
  };

  // Calculate subtotal for sides
  const subtotal = Object.entries(itemQuantities).reduce((total, [name, quantity]) => {
    const item = categories.find(cat => cat.name === name);
    return total + (item ? item.price * quantity : 0);
  }, 0);

  return (
    <div className="sides-container">
      <div className="overlay"></div> 
      <h2 className="page-title">Add Sides</h2>
      
      <div className="category-grid">
        {categories.map((category, index) => (
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
                  {name} x{quantity} - ${(categories.find(cat => cat.name === name)?.price * quantity).toFixed(2)}
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
          onClick={() => {
            if (isDirectOrder) {
              navigate("/foodstalls/subway");
            } else {
              navigate("/foodstalls/subway/sauces");
            }
          }}
        >
          {isDirectOrder ? "Back to Menu" : "Back to Sauces"}
        </button>
        <button 
          className={isDirectOrder ? "place-order-btn" : "continue-btn"} 
          onClick={handleContinue}
          disabled={isDirectOrder && Object.keys(itemQuantities).length === 0}
        >
          {isDirectOrder ? `Add to Cart ($${subtotal.toFixed(2)})` : "Continue to Drinks"}
        </button>
      </div>
    </div>
  );
}

export default Sides;