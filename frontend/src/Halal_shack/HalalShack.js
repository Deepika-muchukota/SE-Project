import React, { useState } from "react";
import "./halalshack.css";
import { useNavigate } from "react-router-dom";
import bowlImg from "./Halal_img/bowl.png";
import wrapsImg from "./Halal_img/wraps.png";
import drinksImg from "./Halal_img/drinks.jpg";

function HalalShack() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const categories = [
    { name: "Bowls", path: "/foodstalls/halalshack/base", image: bowlImg },
    { name: "Wraps", path: "/foodstalls/halalshack/base", image: wrapsImg },
    { name: "Drinks", path: "/foodstalls/halalshack/drinks", image: drinksImg },
  ];

  const handleCategoryClick = (category) => {
    // Store the selected category type (bowl or wrap) in sessionStorage
    if (category.name === "Bowls") {
      sessionStorage.setItem('mealType', 'bowl');
    } else if (category.name === "Wraps") {
      sessionStorage.setItem('mealType', 'wrap');
    }
    
    setSelectedCategory(category);
    // Navigate to the appropriate path
    navigate(category.path);
  };

  // Function to start a new order
  const startNewOrder = () => {
    // Clear any existing selections
    sessionStorage.removeItem('mealType');
    sessionStorage.removeItem('selectedBase');
    sessionStorage.removeItem('selectedProtein');
    sessionStorage.removeItem('selectedToppings');
    sessionStorage.removeItem('selectedSauces');
    sessionStorage.removeItem('halalShackOrder');
    
    // Navigate to first step
    navigate("/foodstalls/halalshack/base");
  };

  return (
    <div className="halal-container">
      <div className="overlay"></div> 
      <h1 className="halal-title">Halal Shack</h1>
      
      <div className="category-grid">
        {categories.map((category, index) => (
          <button 
            key={index} 
            className="category-button" 
            onClick={() => handleCategoryClick(category)}
          >
            <img 
              src={category.image}
              alt={category.name} 
              className="category-image" 
            />
            <p className="category-name">{category.name}</p>
          </button>
        ))}
      </div>
      
      <button 
        className="start-order-btn"
        onClick={startNewOrder}
      >
        Start New Order
      </button>
    </div>
  );
}

export default HalalShack;