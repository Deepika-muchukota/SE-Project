import React, { useState, useEffect } from "react";
import "./sauces.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { addItemToCart } from "../services/api";
import mayoImg from "./subway_img/mayo.jpeg";
import mustardImg from "./subway_img/mustartd.jpeg";
import ranchImg from "./subway_img/ranch.jpeg";
import oilVinegarImg from "./subway_img/oil&vinegar.jpeg";

const sauceOptions = [
  { id: 280, name: "Mayonnaise", price: 0.00, image: mayoImg },
  { id: 281, name: "Mustard", price: 0.00, image: mustardImg },
  { id: 282, name: "Ranch", price: 0.00, image: ranchImg },
  { id: 283, name: "Oil & Vinegar", price: 0.00, image: oilVinegarImg }
];

function Sauces() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedSauces, setSelectedSauces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedSauces = sessionStorage.getItem('selectedSauces');
    if (savedSauces) {
      try {
        const parsedSauces = JSON.parse(savedSauces);
        setSelectedSauces(parsedSauces);
      } catch (error) {
        console.error("Error loading saved sauces:", error);
      }
    }
  }, []);

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
      navigate("/signin");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Store the selected sauces in sessionStorage
      sessionStorage.setItem('selectedSauces', JSON.stringify(selectedSauces));

      // Get the existing order from sessionStorage
      const orderJson = sessionStorage.getItem('subwayOrder');
      const orderData = orderJson ? JSON.parse(orderJson) : {};
      
      // Update the order with selected sauces
      const updatedOrder = {
        ...orderData,
        sauces: selectedSauces
      };
      
      // Save the updated order back to sessionStorage
      sessionStorage.setItem('subwayOrder', JSON.stringify(updatedOrder));

      // Navigate to toppings page
      navigate("/foodstalls/subway/toppings");
    } catch (error) {
      console.error("Error saving sauces:", error);
      setError("Failed to save your sauce selections. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
              className="sauce-image"
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
          onClick={() => navigate("/foodstalls/subway/protein")}
        >
          Back to Protein
        </button>
        <button 
          className="continue-btn" 
          onClick={handleContinue}
          disabled={loading}
        >
          {loading ? "Saving..." : "Continue to Toppings"}
        </button>
      </div>
    </div>
  );
}

export default Sauces;
