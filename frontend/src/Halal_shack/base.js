import React, { useState, useEffect } from "react";
import "./base.css";
import { useNavigate } from "react-router-dom";
import riceImg from "./Halal_img/white-rice.png";
import saladImg from "./Halal_img/salad.jpeg";
import quinoaImg from "./Halal_img/quinoa.jpeg";

function Base({ cart, addItemToCart }) {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [mealType, setMealType] = useState('bowl'); // Default to bowl if not set
  
  const categories = [
    { name: "Rice", price: 0.00, image: riceImg },
    { name: "Salad", price: 0.00, image: saladImg },
    { name: "Quinoa", price: 1.50, image: quinoaImg }
  ];
  
  // Load meal type and existing selection from sessionStorage on component mount
  useEffect(() => {
    const savedMealType = sessionStorage.getItem('mealType');
    if (savedMealType) {
      setMealType(savedMealType);
    }

    // Check if there's an existing base selection
    const savedBase = sessionStorage.getItem('selectedBase');
    if (savedBase) {
      try {
        const baseData = JSON.parse(savedBase);
        const foundItem = categories.find(item => item.name === baseData.name);
        if (foundItem) {
          setSelectedItem(foundItem);
        }
      } catch (e) {
        console.error("Error parsing saved base:", e);
      }
    }
  }, []);

  const handleItemClick = (item) => {
    // If this item is already selected, deselect it
    if (selectedItem && selectedItem.name === item.name) {
      setSelectedItem(null);
      sessionStorage.removeItem('selectedBase');
    } else {
      // Select the new item
      setSelectedItem(item);
      // Store selected item in sessionStorage for later reference
      sessionStorage.setItem('selectedBase', JSON.stringify(item));
    }
  };

  const handleContinue = () => {
    // Navigate to the protein page
    navigate("/foodstalls/halalshack/protein");
  };

  return (
    <div className="base-container">
      <div className="overlay"></div> 
      <h2 className="page-title">Select Your {mealType === 'bowl' ? 'Bowl' : 'Wrap'} Base</h2>
      
      <div className="category-grid">
        {categories.map((category, index) => (
          <div key={index} className="item-card">
            <img 
              src={category.image}
              alt={category.name} 
              className={`category-image ${selectedItem && selectedItem.name === category.name ? 'selected-image' : ''}`}
              onClick={() => handleItemClick(category)}
            />
            <p className="category-name">{category.name}</p>
            <p className="item-price">
              {category.price === 0 ? 'Free' : `$${category.price.toFixed(2)}`}
            </p>
            <div className="selection-indicator">
              {selectedItem && selectedItem.name === category.name ? 
                <span className="selected-mark">✓ Selected</span> : 
                <button 
                  className="select-btn"
                  onClick={() => handleItemClick(category)}
                >
                  Select
                </button>
              }
            </div>
          </div>
        ))}
      </div>
      
      <div className="navigation-buttons">
        <button 
          className={`continue-btn ${!selectedItem ? 'disabled' : ''}`}
          onClick={handleContinue}
          disabled={!selectedItem}
        >
          Continue to Protein
        </button>
      </div>
    </div>
  );
}

export default Base;