import React, { useState, useEffect } from "react";
import "./drinks.css";
import { useNavigate } from "react-router-dom";
import waterImg from "./Halal_img/water.png";
import sodaImg from "./Halal_img/soda.png";
import fantaImg from "./Halal_img/fanta.png";
import spriteImg from "./Halal_img/sprite.png";

function Drinks({ cart = [], addOrderToCart, addItemToCart }) {
  const navigate = useNavigate();
  const [itemQuantities, setItemQuantities] = useState({});
  const [order, setOrder] = useState(null);
  const [isDirectDrinkOrder, setIsDirectDrinkOrder] = useState(false);
  
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
      setIsDirectDrinkOrder(false);
    } else {
      // No existing order means this is likely a direct drink order
      setIsDirectDrinkOrder(true);
    }

    // Load any previously selected drinks from sessionStorage
    const savedDrinks = sessionStorage.getItem('halalShackDrinks');
    if (savedDrinks) {
      setItemQuantities(JSON.parse(savedDrinks));
    }
  }, []);

  const increaseQuantity = (item) => {
    setItemQuantities(prev => {
      const updated = {
        ...prev,
        [item.name]: (prev[item.name] || 0) + 1
      };
      // Save to sessionStorage
      sessionStorage.setItem('halalShackDrinks', JSON.stringify(updated));
      return updated;
    });
  };

  const decreaseQuantity = (item) => {
    if (!itemQuantities[item.name] || itemQuantities[item.name] <= 0) return;
    
    setItemQuantities(prev => {
      const updated = { ...prev };
      updated[item.name] = prev[item.name] - 1;
      
      if (updated[item.name] <= 0) {
        delete updated[item.name];
      }
      
      // Save to sessionStorage
      sessionStorage.setItem('halalShackDrinks', JSON.stringify(updated));
      return updated;
    });
  };

  // Calculate subtotal for drinks
  const drinksSubtotal = Object.entries(itemQuantities).reduce((total, [name, quantity]) => {
    const item = categories.find(cat => cat.name === name);
    return total + (item ? item.price * quantity : 0);
  }, 0);

  // Calculate total based on whether this is a direct drink order or part of a meal
  let total = 0;
  
  if (isDirectDrinkOrder) {
    // If direct drink order, total is just the drinks
    total = drinksSubtotal;
  } else {
    // Otherwise, include the meal components
    const basePrice = parseFloat(sessionStorage.getItem('basePrice') || 0);
    const proteinsSubtotal = order && order.protein && order.protein.price ? order.protein.price : 0;
    const baseAddOnPrice = order && order.base && order.base.price ? order.base.price : 0;
    total = basePrice + baseAddOnPrice + proteinsSubtotal + drinksSubtotal;
  }

  // Handle place order action
  const handlePlaceOrder = () => {
    if (isDirectDrinkOrder) {
      // Handle direct drink order
      const drinkItems = Object.entries(itemQuantities).map(([name, quantity]) => {
        const drink = categories.find(item => item.name === name);
        return {
          type: "Drink",
          name,
          price: drink.price,
          quantity
        };
      });
      
      if (drinkItems.length > 0) {
        // Create a drink-only order
        const drinkOrder = {
          stall: "Halal Shack",
          orderType: "Drinks",
          items: drinkItems,
          totalPrice: drinksSubtotal,
          price: drinksSubtotal
        };
        
        // Add to cart
        if (typeof addOrderToCart === 'function') {
          addOrderToCart(drinkOrder);
        } else if (typeof addItemToCart === 'function') {
          addItemToCart({
            name: "Drinks - Halal Shack",
            orderType: "Drinks",
            items: drinkItems,
            totalPrice: drinksSubtotal,
            price: drinksSubtotal,
            stall: "Halal Shack"
          }, "add", "Halal Shack", true);
        }
      }
    } else {
      // Handle as part of a complete meal order
      const orderItems = [];
      let mealType = order && order.mealType === 'bowl' ? 'Bowl' : 'Wrap';
      
      // Base price
      const basePrice = parseFloat(sessionStorage.getItem('basePrice') || 0);
      
      // First, add the meal type with its price
      orderItems.push({
        type: "Meal Type",
        name: mealType,
        price: basePrice,
        isOrderType: true
      });
      
      // Add base
      if (order && order.base) {
        orderItems.push({
          type: "Base",
          name: order.base.name,
          price: order.base.price || 0
        });
      }
      
      // Add protein
      if (order && order.protein) {
        orderItems.push({
          type: "Protein",
          name: order.protein.name,
          price: order.protein.price || 0
        });
      }
      
      // Add toppings
      if (order && order.toppings) {
        order.toppings.forEach(topping => {
          orderItems.push({
            type: "Topping",
            name: topping,
            price: 0 // Toppings are free
          });
        });
      }
      
      // Add sauces
      if (order && order.sauces) {
        order.sauces.forEach(sauce => {
          orderItems.push({
            type: "Sauce",
            name: sauce,
            price: 0 // Sauces are free
          });
        });
      }
      
      // Add drinks
      Object.entries(itemQuantities).forEach(([name, quantity]) => {
        const drink = categories.find(cat => cat.name === name);
        if (drink) {
          orderItems.push({
            type: "Drink",
            name: drink.name,
            price: drink.price,
            quantity: quantity
          });
        }
      });
      
      // Create the complete order object
      const completeOrder = {
        stall: "Halal Shack",
        orderType: mealType,
        items: orderItems,
        totalPrice: total,
        price: total,
        mealType: mealType
      };
      
      // Add to cart
      if (typeof addOrderToCart === 'function') {
        addOrderToCart(completeOrder);
      } else if (typeof addItemToCart === 'function') {
        addItemToCart({
          name: `${mealType} - Halal Shack`,
          orderType: mealType,
          items: orderItems,
          totalPrice: total,
          price: total,
          stall: "Halal Shack"
        }, "add", "Halal Shack", true);
      }
    }
    
    alert(`Thank you for your order! Total: $${total.toFixed(2)}`);
    
    // Clear session storage
    sessionStorage.removeItem('mealType');
    sessionStorage.removeItem('basePrice');
    sessionStorage.removeItem('selectedBase');
    sessionStorage.removeItem('selectedProtein');
    sessionStorage.removeItem('selectedToppings');
    sessionStorage.removeItem('selectedSauces');
    sessionStorage.removeItem('halalShackOrder');
    sessionStorage.removeItem('halalShackDrinks');
    
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
      
      {!isDirectDrinkOrder && order && (
        <div className="complete-order-summary">
          <h3 className="order-summary-title">Complete Order Summary</h3>
          <div className="order-details">
            {/* Meal Type Section */}
            <div className="order-section">
              <h4 className="section-title">Meal Type</h4>
              <p>{order.mealType === 'bowl' ? 'Bowl' : 'Wrap'} - ${parseFloat(sessionStorage.getItem('basePrice') || 0).toFixed(2)}</p>
            </div>
            
            {/* Base Section */}
            <div className="order-section">
              <h4 className="section-title">Base</h4>
              {order.base ? (
                <p>{order.base.name} {order.base.price > 0 ? `- $${order.base.price.toFixed(2)}` : '(Included)'}</p>
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
                  {order.toppings.join(', ')} (Free)
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
                  {order.sauces.join(', ')} (Free)
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
      )}
      
      <div className="navigation-buttons">
        {!isDirectDrinkOrder ? (
          <button 
            className="back-btn"
            onClick={() => navigate("/foodstalls/halalshack/sauces")}
          >
            Back to Sauces
          </button>
        ) : (
          <button 
            className="back-btn"
            onClick={() => navigate("/foodstalls/halalshack")}
          >
            Back to Menu
          </button>
        )}
        <button 
          className="place-order-btn"
          onClick={handlePlaceOrder}
          disabled={Object.keys(itemQuantities).length === 0}
        >
          Place Order (${total.toFixed(2)})
        </button>
      </div>
    </div>
  );
}

export default Drinks;