import React, { useState, useEffect } from "react";
import "./toppings.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { addItemToCart, deleteItemFromCart } from "../services/api";
import lettuceImg from "./subway_img/lettuce.jpeg";
import tomatoImg from "./subway_img/tomato.jpeg";
import cucumberImg from "./subway_img/cucumber.jpeg";
import onionImg from "./subway_img/onions.jpeg";
import picklesImg from "./subway_img/pickles.jpeg";

function Toppings() {
  const navigate = useNavigate();
  const { addToCart, removeFromCart, cartItems } = useCart();
  const { user } = useAuth();
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toppings = [
    { id: 238, name: "Lettuce", price: 0, image: lettuceImg },
    { id: 239, name: "Tomato", price: 0, image: tomatoImg },
    { id: 240, name: "Cucumber", price: 0, image: cucumberImg },
    { id: 241, name: "Onion", price: 0, image: onionImg },
    { id: 242, name: "Pickles", price: 0, image: picklesImg }
  ];

  // Load previously selected toppings from sessionStorage
  useEffect(() => {
    const orderJson = sessionStorage.getItem('subwayOrder');
    const orderData = orderJson ? JSON.parse(orderJson) : null;
    
    if (orderData) {
      setOrder(orderData);
      if (orderData.toppings) {
        setSelectedToppings(orderData.toppings);
      }
    }
  }, []);

  const toggleTopping = async (topping) => {
    if (!user) {
      navigate('/signin');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const isSelected = selectedToppings.includes(topping.name);
      let updatedToppings;

      if (isSelected) {
        // Remove topping
        updatedToppings = selectedToppings.filter(t => t !== topping.name);
        setSelectedToppings(updatedToppings);
        
        // Remove from cart
        const cartItem = cartItems.find(ci => ci.name === `Halal Shack - ${topping.name}`);
        if (cartItem) {
          await deleteItemFromCart(cartItem.menu_id);
          removeFromCart(cartItem.menu_id);
        }
      } else {
        // Add topping
        updatedToppings = [...selectedToppings, topping.name];
        setSelectedToppings(updatedToppings);
        
        // Add to cart
        const cartItem = {
          user_id: Number(user.id),
          menu_id: Number(topping.id),
          quantity: 1,
          name: `Halal Shack - ${topping.name}`,
          price: Number(topping.price)
        };
        
        await addItemToCart(cartItem);
        addToCart({
          menu_id: topping.id,
          name: `Halal Shack - ${topping.name}`,
          price: topping.price,
          quantity: 1
        });
      }

      // Update order in sessionStorage
      const orderJson = sessionStorage.getItem('subwayOrder');
      if (orderJson) {
        const orderData = JSON.parse(orderJson);
        orderData.toppings = updatedToppings;
        sessionStorage.setItem('subwayOrder', JSON.stringify(orderData));
      }
    } catch (error) {
      console.error('Error toggling topping:', error);
      setError('Failed to update topping selection');
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    navigate("/foodstalls/subway/drinks");
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="toppings-container">
      <div className="overlay"></div>
      <h2 className="page-title">Add Toppings</h2>
      
      <div className="toppings-grid">
        {toppings.map((topping, index) => (
          <div 
            key={index} 
            className={`topping-card ${selectedToppings.includes(topping.name) ? 'selected' : ''}`}
            onClick={() => toggleTopping(topping)}
          >
            <img 
              src={topping.image} 
              alt={topping.name} 
              className="topping-image"
            />
            <p className="topping-name">{topping.name}</p>
            <p className="topping-price">{topping.price > 0 ? `$${topping.price.toFixed(2)}` : 'Free'}</p>
          </div>
        ))}
      </div>
      
      <div className="order-summary">
        <h3 className="order-summary-title">Selected Toppings</h3>
        {selectedToppings.length > 0 ? (
          <ul className="selected-items">
            {selectedToppings.map((topping, index) => (
              <li key={index} className="selected-item">
                {topping}
              </li>
            ))}
          </ul>
        ) : (
          <p>No toppings selected yet.</p>
        )}
      </div>
      
      {order && (
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
              {selectedToppings.length > 0 ? (
                <div>
                  {selectedToppings.join(', ')} (Free)
                </div>
              ) : (
                <p>No toppings selected</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="navigation-buttons">
        <button 
          className="back-btn"
          onClick={() => navigate("/foodstalls/subway/sauces")}
        >
          Back to Sauces
        </button>
        <button 
          className="continue-btn"
          onClick={handleContinue}
          disabled={loading}
        >
          {loading ? "Processing..." : "Continue to Drinks"}
        </button>
      </div>
    </div>
  );
}

export default Toppings;