import React from "react";
import { useNavigate } from "react-router-dom";
import "./subway.css";

// Import images
import breadImg from "./subway_img/wheat_bread.jpeg";
import proteinImg from "./subway_img/turkey.jpeg";
import toppingsImg from "./subway_img/lettuce.jpeg";
import saucesImg from "./subway_img/mayo.jpeg";
import sidesImg from "./subway_img/chips.jpeg";
import drinksImg from "./subway_img/coke.png";

function Subway() {
  const navigate = useNavigate();

  const categories = [
    { name: "Bread", image: breadImg, path: "/foodstalls/subway/bread" },
    { name: "Protein", image: proteinImg, path: "/foodstalls/subway/protien" },
    { name: "Toppings", image: toppingsImg, path: "/foodstalls/subway/toppings" },
    { name: "Sauces", image: saucesImg, path: "/foodstalls/subway/sauces" },
    { name: "Sides", image: sidesImg, path: "/foodstalls/subway/sides" },
    { name: "Drinks", image: drinksImg, path: "/foodstalls/subway/drinks" }
  ];

  // Check if there's a saved order
  const savedOrderJson = sessionStorage.getItem('subwayOrder');
  const savedOrder = savedOrderJson ? JSON.parse(savedOrderJson) : null;

  // Function to start a new order
  const startNewOrder = () => {
    // Clear any existing selections
    sessionStorage.removeItem('selectedBread');
    sessionStorage.removeItem('selectedProteins');
    sessionStorage.removeItem('selectedToppings');
    sessionStorage.removeItem('selectedSauces');
    sessionStorage.removeItem('selectedSides');
    sessionStorage.removeItem('subwayOrder');
    
    // Navigate to first step
    navigate("/foodstalls/subway/bread");
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
            onClick={() => navigate(category.path)}
          >
            <img src={category.image} alt={category.name} className="category-image" />
            <p className="category-name">{category.name}</p>
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
          <p>Proteins: {Object.keys(savedOrder.proteins).length > 0 ? 
            Object.entries(savedOrder.proteins)
              .map(([name, qty]) => `${name} (${qty})`)
              .join(", ") : 
            "None"}
          </p>
          <p>Toppings: {savedOrder.toppings.length > 0 ? savedOrder.toppings.join(", ") : "None"}</p>
          <p>Sauces: {savedOrder.sauces.length > 0 ? savedOrder.sauces.join(", ") : "None"}</p>
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