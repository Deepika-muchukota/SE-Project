import React, { useState, useEffect } from "react";
import "./protien.css"; 
import { useNavigate } from "react-router-dom";
import turkey from "./subway_img/turkey.jpeg";
import ham from "./subway_img/ham.jpeg";
import tuna from "./subway_img/tuna.jpeg";
import vegDelite from "./subway_img/veg_delite.jpeg";
import { useCart } from "../context/CartContext";

const proteinOptions = [
  { id: 265, name: "Turkey", price: 5.99, image: turkey },
  { id: 266, name: "Ham", price: 5.49, image: ham },
  { id: 267, name: "Tuna", price: 5.99, image: tuna },
  { id: 268, name: "Veggie Delite", price: 4.99, image: vegDelite }
];

function Protein() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [itemQuantities, setItemQuantities] = useState({});

  // Load saved protein selections when component mounts
  useEffect(() => {
    const savedProteins = sessionStorage.getItem('selectedProteins');
    if (savedProteins) {
      try {
        const parsedProteins = JSON.parse(savedProteins);
        setItemQuantities(parsedProteins);
      } catch (error) {
        console.error("Error loading saved proteins:", error);
      }
    }
  }, []);

  const increaseQuantity = (item) => {
    setItemQuantities(prev => ({
      ...prev,
      [item.name]: (prev[item.name] || 0) + 1
    }));
  };

  const decreaseQuantity = (item) => {
    if (!itemQuantities[item.name] || itemQuantities[item.name] <= 0) return;
    
    setItemQuantities(prev => {
      const newState = { ...prev };
      newState[item.name] = prev[item.name] - 1;
      
      if (newState[item.name] <= 0) {
        delete newState[item.name];
      }
      
      return newState;
    });
  };

  const handleContinue = async () => {
    for (const [name, quantity] of Object.entries(itemQuantities)) {
      const protein = proteinOptions.find(p => p.name === name);
      if (protein && quantity > 0) {
        await addToCart({
          menu_id: protein.id,
          name: protein.name,
          price: protein.price,
          quantity
        });
      }
    }
    // Store the selected proteins in sessionStorage
    sessionStorage.setItem('selectedProteins', JSON.stringify(itemQuantities));
    navigate("/foodstalls/subway/sauces");
  };

  // Calculate subtotal for proteins
  const subtotal = Object.entries(itemQuantities).reduce((total, [name, quantity]) => {
    const item = proteinOptions.find(cat => cat.name === name);
    return total + (item ? item.price * quantity : 0);
  }, 0);

  return (
    <div className="protien-container">
      <div className="overlay"></div> 
      <h2 className="page-title">Select Your Protein</h2>
      
      <div className="category-grid">
        {proteinOptions.map((category, index) => (
          <div key={index} className="item-card">
            <img 
              src={category.image} 
              alt={category.name} 
              className="category-image"
            />
            <p className="category-name">{category.name}</p>
            <p className="item-price">${category.price.toFixed(2)}</p>
            
            <div className="quantity-controls">
              <button 
                className="quantity-btn decrease" 
                onClick={() => decreaseQuantity(category)}
                disabled={!itemQuantities[category.name]}
              >
                -
              </button>
              <span className="quantity-display">
                {itemQuantities[category.name] || 0}
              </span>
              <button 
                className="quantity-btn increase" 
                onClick={() => increaseQuantity(category)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="order-summary">
        <h3>Protein Selection</h3>
        {Object.keys(itemQuantities).length > 0 ? (
          <>
            <ul className="selected-items">
              {Object.entries(itemQuantities).map(([name, quantity]) => (
                <li key={name}>
                  {name} x{quantity} - ${(proteinOptions.find(cat => cat.name === name)?.price * quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="subtotal">Subtotal: ${subtotal.toFixed(2)}</p>
          </>
        ) : (
          <p>No proteins selected yet.</p>
        )}
      </div>
      
      <div className="navigation-buttons">
        <button 
          className="back-btn"
          onClick={() => navigate("/foodstalls/subway/bread")}
        >
          Back to Bread
        </button>
        <button 
          className="continue-btn" 
          onClick={handleContinue}
          disabled={Object.keys(itemQuantities).length === 0}
        >
          Continue to Sauces
        </button>
      </div>
    </div>
  );
}

export default Protein;