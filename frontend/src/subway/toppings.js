import React, { useState } from "react";
import "./toppings.css"; 
import { useNavigate } from "react-router-dom";
import lettuce from "./subway_img/lettuce.jpeg";
import tomato from "./subway_img/tomato.jpeg";
import cucumber from "./subway_img/cucumber.jpeg";
import onions from "./subway_img/onions.jpeg";
import pickles from "./subway_img/pickles.jpeg";

const categories = [
  { name: "Lettuce", image: lettuce, price: 0.00 },
  { name: "Tomato", image: tomato, price: 0.00 },
  { name: "Cucumber", image: cucumber, price: 0.00 },
  { name: "Onions", image: onions, price: 0.00 },
  { name: "Pickles", image: pickles, price: 0.00 }
];

function Toppings() {
  const navigate = useNavigate();
  const [selectedToppings, setSelectedToppings] = useState([]);

  const toggleTopping = (item) => {
    if (selectedToppings.includes(item.name)) {
      // Remove the topping
      setSelectedToppings(prev => prev.filter(name => name !== item.name));
    } else {
      // Add the topping
      setSelectedToppings(prev => [...prev, item.name]);
    }
  };

  const handleContinue = () => {
    // Store selection in sessionStorage for later
    sessionStorage.setItem('selectedToppings', JSON.stringify(selectedToppings));
    navigate("/foodstalls/subway/sauces");
  };

  return (
    <div className="toppings-container">
      <div className="overlay"></div> 
      <h2 className="page-title">Select Your Toppings</h2>
      
      <div className="category-grid">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className={`item-card ${selectedToppings.includes(category.name) ? 'selected-card' : ''}`}
            onClick={() => toggleTopping(category)}
          >
            <img 
              src={category.image} 
              alt={category.name} 
              className="category-image"
            />
            <p className="category-name">{category.name}</p>
            <p className="item-price">Free</p>
            
            <div className="topping-selection">
              {selectedToppings.includes(category.name) ? 
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
          onClick={() => navigate("/foodstalls/subway/protien")}
        >
          Back to Protein
        </button>
        <button 
          className="continue-btn" 
          onClick={handleContinue}
        >
          Continue to Sauces
        </button>
      </div>
    </div>
  );
}

export default Toppings;