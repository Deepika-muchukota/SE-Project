import React, { useState, useEffect } from "react";
import "./sauces.css";
import { useNavigate } from "react-router-dom";
import whiteSauceImg from "./Halal_img/white_sauce.jpeg";
import hotSauceImg from "./Halal_img/hot_sauce.jpeg";
import tahiniImg from "./Halal_img/tahini.jpeg";
import redSauceImg from "./Halal_img/red_sauce.jpeg";

function Sauces() {
  const navigate = useNavigate();
  const [selectedSauces, setSelectedSauces] = useState([]);
  const [mealType, setMealType] = useState('bowl'); // Default to bowl if not set
  
  const categories = [
    { name: "White Sauce", price: 0.00, image: whiteSauceImg },
    { name: "Hot Sauce", price: 0.00, image: hotSauceImg },
    { name: "Tahini", price: 0.00, image: tahiniImg },
    { name: "Red Sauce", price: 0.00, image: redSauceImg }
  ];
  
  // Load meal type from sessionStorage on component mount
  useEffect(() => {
    const savedMealType = sessionStorage.getItem('mealType');
    if (savedMealType) {
      setMealType(savedMealType);
    }
  }, []);

  const toggleSauce = (item) => {
    if (selectedSauces.includes(item.name)) {
      // Remove the sauce
      setSelectedSauces(prev => prev.filter(name => name !== item.name));
    } else {
      // Add the sauce
      setSelectedSauces(prev => [...prev, item.name]);
    }
  };

  const handleContinue = () => {
    // Store selection in sessionStorage for later
    sessionStorage.setItem('selectedSauces', JSON.stringify(selectedSauces));
    
    // Create the complete order before drinks
    const completeOrder = {
      mealType: mealType,
      base: JSON.parse(sessionStorage.getItem('selectedBase') || '{}'),
      protein: JSON.parse(sessionStorage.getItem('selectedProtein') || '{}'),
      toppings: JSON.parse(sessionStorage.getItem('selectedToppings') || '[]'),
      sauces: selectedSauces
    };
    
    // Save complete order
    sessionStorage.setItem('halalShackOrder', JSON.stringify(completeOrder));
    
    // Navigate to drinks page
    navigate("/foodstalls/halalshack/drinks");
  };

  return (
    <div className="sauces-container">
      <div className="overlay"></div> 
      <h2 className="page-title">Select Your Sauces for {mealType === 'bowl' ? 'Bowl' : 'Wrap'}</h2>
      
      <div className="category-grid">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className={`item-card ${selectedSauces.includes(category.name) ? 'selected-card' : ''}`}
            onClick={() => toggleSauce(category)}
          >
            <img 
              src={category.image}
              alt={category.name} 
              className="category-image"
            />
            <p className="category-name">{category.name}</p>
            <p className="item-price">Free</p>
            
            <div className="sauce-selection">
              {selectedSauces.includes(category.name) ? 
                <span className="selected-mark">✓</span> : 
                <span className="add-mark">+</span>
              }
            </div>
          </div>
        ))}
      </div>
      
      <div className="order-summary">
        <h3 className="order-summary-title">Selected Sauces</h3>
        {selectedSauces.length > 0 ? (
          <ul className="selected-items">
            {selectedSauces.map(name => (
              <li key={name} className="selected-item">{name}</li>
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
        >
          Continue to Drinks
        </button>
      </div>
    </div>
  );
}

export default Sauces;