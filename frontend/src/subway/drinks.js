import React, { useState, useEffect } from "react";
import "./drinks.css"; 
import { useNavigate } from "react-router-dom";
import coke from "./subway_img/coke.png";
import sprite from "./subway_img/sprite.png";
import fanta from "./subway_img/fanta.png";
import water from "./subway_img/water.png";

const categories = [
  { name: "Coca-Cola", image: coke, price: 2.19 },
  { name: "Sprite", image: sprite, price: 2.19 },
  { name: "Fanta", image: fanta, price: 2.19 },
  { name: "Water", image: water, price: 1.89 }
];

// All available items with prices for reference
const allItems = {
  // Breads
  "Italian": 0.00,
  "Wheat": 0.00,
  "Herbs & Cheese": 0.50,
  
  // Proteins
  "Turkey": 5.99,
  "Ham": 5.49,
  "Tuna": 5.99,
  "Veggie Delite": 4.99,
  
  // Sides
  "Chips": 1.59,
  "Cookie": 0.89,
  
  // Drinks
  "Coca-Cola": 2.19,
  "Sprite": 2.19,
  "Fanta": 2.19,
  "Water": 1.89
};

function Drinks() {
  const navigate = useNavigate();
  const [itemQuantities, setItemQuantities] = useState({});
  const [order, setOrder] = useState({
    bread: null,
    proteins: {},
    toppings: [],
    sauces: [],
    sides: {},
  });

  // Load previously selected items from sessionStorage
  useEffect(() => {
    // Get bread
    const breadJson = sessionStorage.getItem('selectedBread');
    const breadData = breadJson ? JSON.parse(breadJson) : null;
    
    // Get proteins
    const proteinsJson = sessionStorage.getItem('selectedProteins');
    const proteinsData = proteinsJson ? JSON.parse(proteinsJson) : {};
    
    // Get toppings
    const toppingsJson = sessionStorage.getItem('selectedToppings');
    const toppingsData = toppingsJson ? JSON.parse(toppingsJson) : [];
    
    // Get sauces
    const saucesJson = sessionStorage.getItem('selectedSauces');
    const saucesData = saucesJson ? JSON.parse(saucesJson) : [];
    
    // Get sides
    const sidesJson = sessionStorage.getItem('selectedSides');
    const sidesData = sidesJson ? JSON.parse(sidesJson) : {};
    
    // Set order state
    setOrder({
      bread: breadData,
      proteins: proteinsData,
      toppings: toppingsData,
      sauces: saucesData,
      sides: sidesData
    });
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

  // Calculate subtotal for drinks
  const drinksSubtotal = Object.entries(itemQuantities).reduce((total, [name, quantity]) => {
    const item = categories.find(cat => cat.name === name);
    return total + (item ? item.price * quantity : 0);
  }, 0);

  // Calculate price for bread
  const breadPrice = order.bread ? order.bread.price : 0;

  // Calculate price for proteins
  const proteinsSubtotal = Object.entries(order.proteins).reduce((total, [name, quantity]) => {
    return total + (allItems[name] || 0) * quantity;
  }, 0);

  // Calculate price for sides
  const sidesSubtotal = Object.entries(order.sides).reduce((total, [name, data]) => {
    return total + (data.price || 0) * (data.quantity || 0);
  }, 0);

  // Calculate total
  const total = breadPrice + proteinsSubtotal + sidesSubtotal + drinksSubtotal;

  const handlePlaceOrder = () => {
    // Add drinks to order data
    const finalOrder = {
      ...order,
      drinks: itemQuantities
    };
    
    // Save complete order
    sessionStorage.setItem('subwayOrder', JSON.stringify(finalOrder));
    
    alert(`Thank you for your order! Total: $${total.toFixed(2)}`);
    navigate("/foodstalls");
  };

  return (
    <div className="drinks-container">
      <div className="overlay"></div> 
      <h2 className="page-title">Add Drinks</h2>
      
      <div className="category-grid">
        {categories.map((category, index) => (
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
        <h3>Drinks Selection</h3>
        {Object.keys(itemQuantities).length > 0 ? (
          <>
            <ul className="selected-items">
              {Object.entries(itemQuantities).map(([name, quantity]) => (
                <li key={name}>
                  {name} x{quantity} - ${(categories.find(cat => cat.name === name)?.price * quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="subtotal">Subtotal: ${drinksSubtotal.toFixed(2)}</p>
          </>
        ) : (
          <p>No drinks selected yet.</p>
        )}
      </div>
      
      <div className="complete-order-summary">
        <h3>Complete Order Summary</h3>
        <div className="order-details">
          {/* Bread Section */}
          <div className="order-section">
            <h4>Bread</h4>
            {order.bread ? (
              <p>{order.bread.name} - ${order.bread.price.toFixed(2)}</p>
            ) : (
              <p>No bread selected</p>
            )}
          </div>
          
          {/* Protein Section */}
          <div className="order-section">
            <h4>Protein</h4>
            {Object.keys(order.proteins).length > 0 ? (
              <ul className="order-list">
                {Object.entries(order.proteins).map(([name, quantity]) => (
                  <li key={name}>
                    {name} x{quantity} - ${(allItems[name] * quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No proteins selected</p>
            )}
          </div>
          
          {/* Toppings Section */}
          <div className="order-section">
            <h4>Toppings</h4>
            {order.toppings.length > 0 ? (
              <div className="toppings-list">
                {order.toppings.join(', ')}
              </div>
            ) : (
              <p>No toppings selected</p>
            )}
          </div>
          
          {/* Sauces Section */}
          <div className="order-section">
            <h4>Sauces</h4>
            {order.sauces.length > 0 ? (
              <div className="sauces-list">
                {order.sauces.join(', ')}
              </div>
            ) : (
              <p>No sauces selected</p>
            )}
          </div>
          
          {/* Sides Section */}
          <div className="order-section">
            <h4>Sides</h4>
            {Object.keys(order.sides).length > 0 ? (
              <ul className="order-list">
                {Object.entries(order.sides).map(([name, data]) => (
                  <li key={name}>
                    {name} x{data.quantity} - ${(data.price * data.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No sides selected</p>
            )}
          </div>
          
          {/* Drinks Section */}
          <div className="order-section">
            <h4>Drinks</h4>
            {Object.keys(itemQuantities).length > 0 ? (
              <ul className="order-list">
                {Object.entries(itemQuantities).map(([name, quantity]) => (
                  <li key={name}>
                    {name} x{quantity} - ${(categories.find(cat => cat.name === name)?.price * quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No drinks selected</p>
            )}
          </div>
        </div>
        
        <div className="order-total">
          <p>Total: <strong>${total.toFixed(2)}</strong></p>
        </div>
      </div>
      
      <div className="navigation-buttons">
        <button 
          className="back-btn"
          onClick={() => navigate("/foodstalls/subway/sides")}
        >
          Back to Sides
        </button>
        <button 
          className="place-order-btn" 
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Drinks;