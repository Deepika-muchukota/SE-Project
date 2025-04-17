import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CartPage.css';
import { useCart } from './context/CartContext';
import { useAuth } from './context/AuthContext';

function CartPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const { cartItems, getCartTotal, clearCart, removeFromCart } = useCart();

  // Sync cart with backend
  const syncCartWithBackend = async () => {
    if (!user || !user.id) {
      console.warn("No user logged in, skipping backend sync");
      return;
    }

    try {
      setLoading(true);
      
      // First, empty the user's cart in the backend
      await axios.delete(`http://localhost:5000/api/cart/empty/${user.id}`);
      
      // Then add each item to the cart
      for (const item of cartItems) {
        // Find the menu item ID by name
        const menuResponse = await axios.get(`http://localhost:5000/api/menu/item/${encodeURIComponent(item.name)}`);
        const menuId = menuResponse.data.menuItem.id;
        
        // Add item to cart
        await axios.post('http://localhost:5000/api/cart/add', {
          user_id: user.id,
          menu_id: menuId,
          quantity: item.quantity || 1,
          name: item.name,
          price: item.price
        });
      }
      
      console.log("Cart synced with backend successfully");
    } catch (error) {
      console.error("Error syncing cart with backend:", error);
      setError("Failed to sync cart with server. Your order may not be saved.");
    } finally {
      setLoading(false);
    }
  };

  const finalizeOrder = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      setLoading(true);
      
      // Sync cart with backend before finalizing
      await syncCartWithBackend();
      
      // For now, we'll just clear the cart and navigate back
      // In a real app, you would process payment and create an order
      console.log("Order placed successfully:", cartItems);
      alert(`Order placed successfully! Total: $${getCartTotal().toFixed(2)}`);
      clearCart();
      navigate('/foodstalls');
    } catch (error) {
      console.error('Error finalizing order:', error);
      setError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToFoodStalls = () => {
    navigate('/foodstalls');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button onClick={handleBackToFoodStalls}>Back to Food Stalls</button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button 
                  className="remove-item"
                  onClick={() => removeFromCart(item)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <p>Total Items: {cartItems.reduce((total, item) => total + item.quantity, 0)}</p>
            <p>Total Price: ${getCartTotal().toFixed(2)}</p>
            <button className="finalize-order" onClick={finalizeOrder}>
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

