import React, { useState, useEffect } from "react";
import "./drinks.css";
import { useNavigate } from "react-router-dom";
import waterImg from "./Halal_img/water.png";
import sodaImg from "./Halal_img/soda.png";
import fantaImg from "./Halal_img/fanta.png";
import spriteImg from "./Halal_img/sprite.png";

function Drinks() {
  const navigate = useNavigate();
  const [itemQuantities, setItemQuantities] = useState({});
  const [order, setOrder] = useState({
    mealType: '',
    base: null,
    protein: {},
    toppings: [],
    sauces: []
  });
  
  const categories = [
    { name: "Water", price: 1.99, image: waterImg },
    { name: "Soda", price: 2.49, image: sodaImg },
    { name: "Fanta", price: 2.49, image: fantaImg },
    { name: "Sprite", price: 2.49, image: spriteImg }
  ];
  
  // Load previously selected items from sessionStorage
  useEffect(() => {
    // Get complete order details
    const orderJson = sessionStorage.getItem('halalShackOrder');
    const orderData = orderJson ? JSON.parse(orderJson) : null;
    
    if (orderData) {
      setOrder(orderData);
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

  // Calculate subtotal for drinks
  const drinksSubtotal = Object.entries(itemQuantities).reduce((total, [name, quantity]) => {
    const item = categories.find(cat => cat.name === name);
    return total + (item ? item.price * quantity : 0);
  }, 0);

  // Calculate price for proteins
  const proteinsSubtotal = order.protein && typeof order.protein === 'object' && !Array.isArray(order.protein) 
    ? order.protein.price || 0 
    : 0;

  // Calculate price for base
  const basePrice = order.base ? (order.base.price || 0) : 0;

  // Calculate total
  const total = basePrice + proteinsSubtotal + drinksSubtotal;

  const handlePlaceOrder = () => {
    // Add drinks to order data
    const finalOrder = {
      ...order,
      drinks: itemQuantities
    };
    
    // Save complete order
    sessionStorage.setItem('halalShackOrder', JSON.stringify(finalOrder));
    
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
                className={`quantity-btn decrease ${!itemQuantities[category.name] ? 'disabled' : ''}`}
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
        <h3 className="order-summary-title">Drinks Selection</h3>
        {Object.keys(itemQuantities).length > 0 ? (
          <>
            <ul className="selected-items">
              {Object.entries(itemQuantities).map(([name, quantity]) => (
                <li key={name} className="selected-item">
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
        <h3 className="order-summary-title">Complete Order Summary</h3>
        <div className="order-details">
          {/* Meal Type Section */}
          <div className="order-section">
            <h4 className="section-title">Meal Type</h4>
            <p>{order.mealType === 'bowl' ? 'Bowl' : 'Wrap'}</p>
          </div>
          
          {/* Base Section */}
          <div className="order-section">
            <h4 className="section-title">Base</h4>
            {order.base ? (
              <p>{order.base.name} - ${order.base.price.toFixed(2)}</p>
            ) : (
              <p>No base selected</p>
            )}
          </div>
          
          {/* Protein Section */}
          <div className="order-section">
            <h4 className="section-title">Protein</h4>
            {order.protein && order.protein.name ? (
              <p>{order.protein.name} - ${order.protein.price.toFixed(2)}</p>
            ) : (
              <p>No protein selected</p>
            )}
          </div>
          
          {/* Toppings Section */}
          <div className="order-section">
            <h4 className="section-title">Toppings</h4>
            {order.toppings && order.toppings.length > 0 ? (
              <div>
                {order.toppings.join(', ')}
              </div>
            ) : (
              <p>No toppings selected</p>
            )}
          </div>
          
          {/* Sauces Section */}
          <div className="order-section">
            <h4 className="section-title">Sauces</h4>
            {order.sauces && order.sauces.length > 0 ? (
              <div>
                {order.sauces.join(', ')}
              </div>
            ) : (
              <p>No sauces selected</p>
            )}
          </div>
          
          {/* Drinks Section */}
          <div className="order-section">
            <h4 className="section-title">Drinks</h4>
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
          onClick={() => navigate("/foodstalls/halalshack/sauces")}
        >
          Back to Sauces
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