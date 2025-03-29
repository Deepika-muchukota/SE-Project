import React from "react";
import { useNavigate } from "react-router-dom";
import "./subway.css";

// Import only the images we need for the main page
import breadImg from "./subway_img/wheat_bread.jpeg";
import drinksImg from "./subway_img/coke.png";

function Subway() {
  const navigate = useNavigate();

  // Keep only Bread and Drinks on the main page
  const categories = [
    { name: "Bread", image: breadImg, path: "/foodstalls/subway/bread", price: "$6.49" },
    { name: "Drinks", image: drinksImg, path: "/foodstalls/subway/drinks", price: "From $1.99" }
  ];

  // Numeric prices for calculations
  const numericPrices = {
    "Bread": 6.49,
    "Drinks": 1.99
  };

  // Check if there's a saved order
  const savedOrderJson = sessionStorage.getItem('subwayOrder');
  const savedOrder = savedOrderJson ? JSON.parse(savedOrderJson) : null;

  // Function to start a new order - keep all the original sessionStorage items
  const startNewOrder = () => {
    // Clear any existing selections
    sessionStorage.removeItem('selectedBread');
    sessionStorage.removeItem('basePrice');
    sessionStorage.removeItem('selectedProteins');
    sessionStorage.removeItem('selectedToppings');
    sessionStorage.removeItem('selectedSauces');
    sessionStorage.removeItem('selectedSides');
    sessionStorage.removeItem('subwayOrder');
    sessionStorage.removeItem('subwayDrinks');
    
    // Store base price for calculations
    sessionStorage.setItem('basePrice', numericPrices.Bread.toString());
    
    // Navigate to first step - bread (original flow)
    navigate("/foodstalls/subway/bread");
  };

  // Function to handle category button clicks
  const handleCategoryClick = (category) => {
    // If selecting Bread, store base price and start sandwich flow
    if (category.name === "Bread") {
      sessionStorage.setItem('basePrice', numericPrices.Bread.toString());
      navigate(category.path);
    }
    // For Drinks, pass state to indicate direct order
    else if (category.name === "Drinks") {
      navigate(category.path, { state: { directDrinkOrder: true } });
    }
    else {
      navigate(category.path);
    }
  };

  return (
    <div className="subway-container">
      <div className="overlay"></div>
      <h1 className="subway-title">Subway</h1>
      
      <div className="category-grid">
        {categories.map((category, index) => (
          <button 
            key={index} 
            className="category-button" 
            onClick={() => handleCategoryClick(category)}
          >
            <img src={category.image} alt={category.name} className="category-image" />
            <p className="category-name">{category.name}</p>
            <p className="category-price">{category.price}</p>
          </button>
        ))}
      </div>
      
      <div className="order-actions">
        <button 
          className="start-order-btn"
          onClick={startNewOrder}
        >
          Start New Order
        </button>
      </div>
      
      {savedOrder && (
        <div className="saved-order">
          <h2>Your Last Order</h2>
          <p>Bread: {savedOrder.bread?.name || "None"}</p>
          <p>Proteins: {Object.keys(savedOrder.proteins || {}).length > 0 ? 
            Object.entries(savedOrder.proteins)
              .map(([name, qty]) => `${name} (${qty})`)
              .join(", ") : 
            "None"}
          </p>
          <p>Toppings: {savedOrder.toppings && savedOrder.toppings.length > 0 ? savedOrder.toppings.join(", ") : "None"}</p>
          <p>Sauces: {savedOrder.sauces && savedOrder.sauces.length > 0 ? savedOrder.sauces.join(", ") : "None"}</p>
          <button 
            className="reorder-btn"
            onClick={() => alert("Reordering functionality would go here!")}
          >
            Reorder
          </button>
        </div>
      )}
    </div>
  );
}

export default Subway;