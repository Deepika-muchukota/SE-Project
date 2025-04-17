import React, { useState, useEffect } from "react";
import "./sauces.css";
import { useNavigate } from "react-router-dom";
import { addItemToCart } from "../services/api";
import whiteSauceImg from "./Halal_img/white_sauce.jpeg";
import hotSauceImg from "./Halal_img/hot_sauce.jpeg";
import tahiniImg from "./Halal_img/tahini.jpeg";
import redSauceImg from "./Halal_img/red_sauce.jpeg";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const sauceOptions = [
  { id: 223, name: "White Sauce", price: 0.00, image: whiteSauceImg },
  { id: 224, name: "Hot Sauce", price: 0.00, image: hotSauceImg },
  { id: 225, name: "Tahini", price: 0.00, image: tahiniImg },
  { id: 226, name: "Red Sauce", price: 0.00, image: redSauceImg }
];

function Sauces() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedSauces, setSelectedSauces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if user is logged in on component mount
  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    
    const savedSauces = sessionStorage.getItem('selectedSauces');
    if (savedSauces) {
      try {
        const parsedSauces = JSON.parse(savedSauces);
        setSelectedSauces(parsedSauces);
      } catch (error) {
        console.error("Error loading saved sauces:", error);
      }
    }
    
    // Cleanup function to clear session storage when component unmounts
    return () => {
      // Only clear if user is not logged in
      if (!user) {
        sessionStorage.removeItem('selectedSauces');
      }
    };
  }, [user, navigate]);

  const toggleSauce = (item) => {
    setSelectedSauces(prev => {
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

      // Store the selected sauces in sessionStorage
      sessionStorage.setItem('selectedSauces', JSON.stringify(selectedSauces));

      // Add each selected sauce to the cart individually
      for (const sauceName of selectedSauces) {
        const sauceItem = sauceOptions.find(s => s.name === sauceName);
        if (sauceItem) {
          const cartItem = {
            user_id: Number(user.id),
            menu_id: Number(sauceItem.id),
            name: `Halal Shack - ${sauceItem.name}`,
            price: Number(sauceItem.price),
            quantity: 1
          };
          
          await addItemToCart(cartItem);
        }
      }

      navigate("/foodstalls/halalshack/drinks");
    } catch (error) {
      console.error("Error saving sauces:", error);
      setError(error.message || "Failed to save sauces. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // If user is not logged in, don't render the component
  if (!user) {
    return null;
  }

  return (
    <div className="sauces-container">
      <div className="overlay"></div>
      <h2 className="page-title">Select Your Sauces</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="category-grid">
        {sauceOptions.map((sauce, index) => (
          <div 
            key={index} 
            className={`item-card ${selectedSauces.includes(sauce.name) ? 'selected-card' : ''}`}
            onClick={() => toggleSauce(sauce)}
          >
            <img 
              src={sauce.image} 
              alt={sauce.name} 
              className="category-image"
            />
            <p className="category-name">{sauce.name}</p>
            <p className="item-price">Free</p>
            
            <div className="sauce-selection">
              {selectedSauces.includes(sauce.name) ? 
                <span className="selected-mark">✓</span> : 
                <span className="add-mark">+</span>
              }
            </div>
          </div>
        ))}
      </div>
      
      <div className="order-summary">
        <h3>Selected Sauces</h3>
        {selectedSauces.length > 0 ? (
          <ul className="selected-items">
            {selectedSauces.map(name => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        ) : (
          <p>No sauces selected yet.</p>
        )}
      </div>
      
      <div className="navigation-buttons">
        <button 
          className="back-btn"
          onClick={() => navigate("/foodstalls/halalshack/toppings")}
        >
          Back to Toppings
        </button>
        <button 
          className="continue-btn" 
          onClick={handleContinue}
          disabled={loading}
        >
          {loading ? "Saving..." : "Continue to Drinks"}
        </button>
      </div>
    </div>
  );
}

export default Sauces;