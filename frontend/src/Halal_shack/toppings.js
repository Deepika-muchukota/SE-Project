import React, { useState, useEffect } from "react";
import "./toppings.css";
import { useNavigate } from "react-router-dom";
import lettuceImg from "./Halal_img/lettuce.jpeg";
import tomatoImg from "./Halal_img/tomato.jpeg";
import cucumberImg from "./Halal_img/cucumber.jpeg";
import onionsImg from "./Halal_img/onions.jpeg";
import olivesImg from "./Halal_img/olives.jpeg";

function Toppings({ cart, addItemToCart }) {
  const navigate = useNavigate();
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [mealType, setMealType] = useState('bowl'); // Default to bowl if not set
  
  const categories = [
    { name: "Lettuce", price: 0.00, image: lettuceImg },
    { name: "Tomatoes", price: 0.00, image: tomatoImg },
    { name: "Cucumbers", price: 0.00, image: cucumberImg },
    { name: "Onions", price: 0.00, image: onionsImg },
    { name: "Olives", price: 0.00, image: olivesImg }
  ];
  
  // Load meal type and existing selections from sessionStorage on component mount
  useEffect(() => {
    const savedMealType = sessionStorage.getItem('mealType');
    if (savedMealType) {
      setMealType(savedMealType);
    }

    // Check if there are existing topping selections
    const savedToppings = sessionStorage.getItem('selectedToppings');
    if (savedToppings) {
      try {
        const toppingsData = JSON.parse(savedToppings);
        if (Array.isArray(toppingsData)) {
          setSelectedToppings(toppingsData);
        }
      } catch (e) {
        console.error("Error parsing saved toppings:", e);
      }
    }
  }, []);

  const toggleTopping = (item) => {
    let updatedToppings;
    
    if (selectedToppings.includes(item.name)) {
      // Remove the topping
      updatedToppings = selectedToppings.filter(name => name !== item.name);
    } else {
      // Add the topping
      updatedToppings = [...selectedToppings, item.name];
    }
    
    // Update state
    setSelectedToppings(updatedToppings);
    
    // Store in sessionStorage
    sessionStorage.setItem('selectedToppings', JSON.stringify(updatedToppings));
  };

  const handleContinue = () => {
    // Navigate to the sauces page
    navigate("/foodstalls/halalshack/sauces");
  };

  return (
    <div className="toppings-container">
      <div className="overlay"></div> 
      <h2 className="page-title">Select Your Toppings for {mealType === 'bowl' ? 'Bowl' : 'Wrap'}</h2>
      
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
        <h3 className="order-summary-title">Selected Toppings</h3>
        {selectedToppings.length > 0 ? (
          <ul className="selected-items">
            {selectedToppings.map(name => (
              <li key={name} className="selected-item">{name}</li>
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
        >
          Continue to Sauces
        </button>
      </div>
    </div>
  );
}

export default Toppings;