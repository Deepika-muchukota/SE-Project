import React, { useState, useEffect } from "react";
import "./toppings.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { addItemToCart } from "../services/api";
import lettuceImg from "./Halal_img/lettuce.jpeg";
import tomatoImg from "./Halal_img/tomato.jpeg";
import cucumberImg from "./Halal_img/cucumber.jpeg";
import onionsImg from "./Halal_img/onions.jpeg";
import olivesImg from "./Halal_img/olives.jpeg";

const toppingOptions = [
  { id: 227, name: "Lettuce", price: 0.00, image: lettuceImg },
  { id: 228, name: "Tomatoes", price: 0.00, image: tomatoImg },
  { id: 229, name: "Cucumbers", price: 0.00, image: cucumberImg },
  { id: 230, name: "Onions", price: 0.00, image: onionsImg },
  { id: 231, name: "Olives", price: 0.00, image: olivesImg }
];

function Toppings() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if user is logged in on component mount
  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    
    const savedToppings = sessionStorage.getItem('selectedToppings');
    if (savedToppings) {
      try {
        const parsedToppings = JSON.parse(savedToppings);
        setSelectedToppings(parsedToppings);
      } catch (error) {
        console.error("Error loading saved toppings:", error);
      }
    }
    
    // Cleanup function to clear session storage when component unmounts
    return () => {
      // Only clear if user is not logged in
      if (!user) {
        sessionStorage.removeItem('selectedToppings');
      }
    };
  }, [user, navigate]);

  const toggleTopping = (item) => {
    setSelectedToppings(prev => {
      if (prev.includes(item.name)) {
        return prev.filter(name => name !== item.name);
      } else {
        return [...prev, item.name];
      }
    });
  };

  const handleContinue = async () => {
    if (!user) {
      alert("Please log in to continue");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Store the selected toppings in sessionStorage
      sessionStorage.setItem('selectedToppings', JSON.stringify(selectedToppings));

      // Add each selected topping to the cart individually
      for (const toppingName of selectedToppings) {
        const toppingItem = toppingOptions.find(t => t.name === toppingName);
        if (toppingItem) {
          const cartItem = {
            user_id: Number(user.id),
            menu_id: Number(toppingItem.id),
            name: `Halal Shack - ${toppingItem.name}`,
            price: Number(toppingItem.price),
            quantity: 1
          };
          
          await addItemToCart(cartItem);
        }
      }

      navigate("/foodstalls/halalshack/sauces");
    } catch (error) {
      console.error("Error saving toppings:", error);
      setError(error.message || "Failed to save toppings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // If user is not logged in, don't render the component
  if (!user) {
    return null;
  }

  return (
    <div className="toppings-container">
      <div className="overlay"></div>
      <h2 className="page-title">Select Your Toppings</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="category-grid">
        {toppingOptions.map((topping, index) => (
          <div 
            key={index} 
            className={`item-card ${selectedToppings.includes(topping.name) ? 'selected-card' : ''}`}
            onClick={() => toggleTopping(topping)}
          >
            <img 
              src={topping.image} 
              alt={topping.name} 
              className="category-image"
            />
            <p className="category-name">{topping.name}</p>
            <p className="item-price">Free</p>
            
            <div className="topping-selection">
              {selectedToppings.includes(topping.name) ? 
                <span className="selected-mark">✓</span> : 
                <span className="add-mark">+</span>
              }
            </div>
          </div>
        ))}
      </div>
      
      <div className="order-summary">
        <h3>Selected Toppings</h3>
        {selectedToppings.length > 0 ? (
          <ul className="selected-items">
            {selectedToppings.map(name => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        ) : (
          <p>No toppings selected yet.</p>
        )}
      </div>
      
      <div className="navigation-buttons">
        <button 
          className="back-btn"
          onClick={() => navigate("/foodstalls/halalshack/protein")}
        >
          Back to Protein
        </button>
        <button 
          className="continue-btn" 
          onClick={handleContinue}
          disabled={loading}
        >
          {loading ? "Saving..." : "Continue to Sauces"}
        </button>
      </div>
    </div>
  );
}

export default Toppings;