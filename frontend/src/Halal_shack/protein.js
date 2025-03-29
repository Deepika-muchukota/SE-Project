import React, { useState, useEffect } from "react";
import "./protein.css";
import { useNavigate } from "react-router-dom";
import chickenImg from "./Halal_img/chicken.png";
import beefImg from "./Halal_img/beef.png";
import falafelImg from "./Halal_img/falafel.png";

function Protein({ cart, addItemToCart }) {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [mealType, setMealType] = useState('bowl'); // Default to bowl if not set
  
  const categories = [
    { name: "Chicken", price: 5.99, image: chickenImg },
    { name: "Beef", price: 6.99, image: beefImg },
    { name: "Falafel", price: 4.99, image: falafelImg }
  ];
  
  // Load meal type and existing selection from sessionStorage on component mount
  useEffect(() => {
    const savedMealType = sessionStorage.getItem('mealType');
    if (savedMealType) {
      setMealType(savedMealType);
    }

    // Check if there's an existing protein selection
    const savedProtein = sessionStorage.getItem('selectedProtein');
    if (savedProtein) {
      try {
        const proteinData = JSON.parse(savedProtein);
        const foundItem = categories.find(item => item.name === proteinData.name);
        if (foundItem) {
          setSelectedItem(foundItem);
        }
      } catch (e) {
        console.error("Error parsing saved protein:", e);
      }
    }
  }, []);

  const handleItemClick = (item) => {
    // If this item is already selected, deselect it
    if (selectedItem && selectedItem.name === item.name) {
      setSelectedItem(null);
      sessionStorage.removeItem('selectedProtein');
    } else {
      // Select the new item
      setSelectedItem(item);
      // Store selected item in sessionStorage for later reference
      sessionStorage.setItem('selectedProtein', JSON.stringify(item));
    }
  };

  const handleContinue = () => {
    // Navigate to the next page
    navigate("/foodstalls/halalshack/toppings");
  };

  return (
    <div className="protein-container">
      <div className="overlay"></div> 
      <h2 className="page-title">Select Your Protein for {mealType === 'bowl' ? 'Bowl' : 'Wrap'}</h2>
      
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
            <p className="item-price">${category.price.toFixed(2)}</p>
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
      
      <div className="order-summary">
        <h3 className="order-summary-title">Protein Selection</h3>
        {selectedItem ? (
          <p>{selectedItem.name} - ${selectedItem.price.toFixed(2)}</p>
        ) : (
          <p>No proteins selected yet.</p>
        )}
      </div>
      
      <div className="navigation-buttons">
        <button 
          className="back-btn"
          onClick={() => navigate("/foodstalls/halalshack/base")}
        >
          Back to Base
        </button>
        <button 
          className={`continue-btn ${!selectedItem ? 'disabled' : ''}`}
          onClick={handleContinue}
          disabled={!selectedItem}
        >
          Continue to Toppings
        </button>
      </div>
    </div>
  );
}

export default Protein;