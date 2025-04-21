import React, { useState } from "react";
import "./halalshack.css";
import { useNavigate } from "react-router-dom";
import bowlImg from "./Halal_img/bowl.png";
import wrapsImg from "./Halal_img/wraps.png";
import drinksImg from "./Halal_img/drinks.jpg";

function HalalShack({ cart, addItemToCart }) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // Updated categories with prices
  const categories = [
    { name: "Bowls", path: "/foodstalls/halalshack/base", image: bowlImg, price: "$9.48" },
    { name: "Wraps", path: "/foodstalls/halalshack/base", image: wrapsImg, price: "$8.99" },
    { name: "Drinks", path: "/foodstalls/halalshack/drinks", image: drinksImg, price: "From $1.99" },
  ];

  // For calculating actual prices (not displayed)
  const numericPrices = {
    "Bowls": 9.48,
    "Wraps": 8.99,
    "Drinks": 1.99
  };

  const handleCategoryClick = (category) => {
    // Store the selected category type (bowl or wrap) in sessionStorage
    if (category.name === "Bowls") {
      sessionStorage.setItem('mealType', 'bowl');
      // Store base price
      sessionStorage.setItem('basePrice', numericPrices.Bowls.toString());
    } else if (category.name === "Wraps") {
      sessionStorage.setItem('mealType', 'wrap');
      // Store base price
      sessionStorage.setItem('basePrice', numericPrices.Wraps.toString());
    }
    
    setSelectedCategory(category);
    // Navigate to the appropriate path
    navigate(category.path);
  };

  // Function to start a new order
  const startNewOrder = () => {
    // Clear any existing selections
    sessionStorage.removeItem('mealType');
    sessionStorage.removeItem('basePrice');
    sessionStorage.removeItem('selectedBase');
    sessionStorage.removeItem('selectedProtein');
    sessionStorage.removeItem('selectedToppings');
    sessionStorage.removeItem('selectedSauces');
    sessionStorage.removeItem('halalShackOrder');
    sessionStorage.removeItem('halalShackDrinks');
    
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
            <p className="category-price">{category.price}</p>
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
