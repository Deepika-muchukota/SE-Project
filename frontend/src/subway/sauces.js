import React, { useState } from "react";
import "./sauces.css"; 
import { useNavigate } from "react-router-dom";
import mayo from "./subway_img/mayo.jpeg";
import ranch from "./subway_img/ranch.jpeg";
import mustard from "./subway_img/mustartd.jpeg";
import oilVinegar from "./subway_img/oil&vinegar.jpeg";

const categories = [
  { name: "Mayo", image: mayo, price: 0.00 },
  { name: "Ranch", image: ranch, price: 0.00 },
  { name: "Mustard", image: mustard, price: 0.00 },
  { name: "Oil & Vinegar", image: oilVinegar, price: 0.00 }
];

function Sauces() {
  const navigate = useNavigate();
  const [selectedSauces, setSelectedSauces] = useState([]);

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
    navigate("/foodstalls/subway/sides");
  };

  return (
    <div className="sauces-container">
      <div className="overlay"></div> 
      <h2 className="page-title">Select Your Sauces</h2>
      
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
          onClick={() => navigate("/foodstalls/subway/toppings")}
        >
          Back to Toppings
        </button>
        <button 
          className="continue-btn" 
          onClick={handleContinue}
        >
          Continue to Sides
        </button>
      </div>
    </div>
  );
}

export default Sauces;