import React, { useState } from "react";
import "./bread.css"; 
import { useNavigate } from "react-router-dom";
import italianBread from "./subway_img/italian_bread.jpg";
import wheatBread from "./subway_img/wheat_bread.jpeg";
import herbsCheeseBread from "./subway_img/herbs&cheese_bread.jpeg";

const categories = [
  { name: "Italian", image: italianBread, price: 0.00 },
  { name: "Wheat", image: wheatBread, price: 0.00 },
  { name: "Herbs & Cheese", image: herbsCheeseBread, price: 0.50 }
];

function Bread() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    // If this item is already selected, deselect it
    if (selectedItem && selectedItem.name === item.name) {
      setSelectedItem(null);
    } else {
      // Select the new item
      setSelectedItem(item);
    }
  };

  const handleContinue = () => {
    // Store selected item in sessionStorage for later reference if needed
    if (selectedItem) {
      sessionStorage.setItem('selectedBread', JSON.stringify(selectedItem));
    }
    navigate("/foodstalls/subway/protien");
  };

  return (
    <div className="breads-container">
      <div className="overlay"></div> 
      <h2 className="page-title">Select Your Bread</h2>
      
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
      
      {selectedItem && (
        <div className="selection-summary">
          <h3>Your Selection</h3>
          <p>{selectedItem.name} - ${selectedItem.price.toFixed(2)}</p>
        </div>
      )}
      
      <div className="navigation-buttons">
        <button 
          className="continue-btn" 
          onClick={handleContinue}
          disabled={!selectedItem}
        >
          Continue to Protein
        </button>
      </div>
    </div>
  );
}

export default Bread;