import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';
import { useCart } from './context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

function CartPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { cartItems, getCartTotal, clearCart, removeFromCart } = useCart();

  const finalizeOrder = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const stripe = await loadStripe("pk_test_51REKFG00Mz4anjn8ie9qIXkTEUgGRpFqCtXYi3rlU6O9xjm0yRwUmfUgp3TT27dJwMbHNh7myBxRIn0SyWfTgjD9000nx3pFfs"); 

  
      const response = await axios.post('http://localhost:8080/create-checkout-session', {
        items: cartItems.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity
        }))
      });
  
      const sessionId = response.data.sessionId;
  
      const result = await stripe.redirectToCheckout({ sessionId });
  
      if (result.error) {
        setError(result.error.message);
      }
    } catch (error) {
      console.error(error);
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleBackToFoodStalls = () => {
    navigate('/foodstalls');
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="cart-wrapper">
      <div className="cart-page">
        <h1>Your Cart</h1>
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button onClick={handleBackToFoodStalls}>Back to Food Stalls</button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items-list">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item-row">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-qty">x{item.quantity}</span>
                  <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  <button 
                    className="remove-item-btn"
                    onClick={() => removeFromCart(item.menu_id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-summary-box">
              <h3>Order Summary</h3>
              <div className="cart-summary-row">
                <span>Total Items:</span>
                <span>{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Total Price:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="cart-actions">
                <button className="back-to-stalls-btn" onClick={handleBackToFoodStalls}>
                  Back to Food Stalls
                </button>
                <button className="finalize-order-btn" onClick={finalizeOrder}>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;



