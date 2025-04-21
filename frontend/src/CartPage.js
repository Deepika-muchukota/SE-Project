import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';
import { useCart } from './context/CartContext';
import { useAuth } from './context/AuthContext';

function CartPage() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, removeFromCart } = useCart();
  const { user } = useAuth();

  const handleBackToFoodStalls = () => {
    navigate('/foodstalls');
  };

  const handleProceedToPayment = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }
    navigate('/payment');
  };

  return (
    <div className="cart-wrapper">
      <div className="cart-page">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button
              className="go-to-stalls-btn"
              onClick={handleBackToFoodStalls}
            >
              Go to Food Stalls
            </button>
          </div>
        ) : (
          <>
            <div className="cart-content">
              <div className="cart-items-list">
                {cartItems.map((item, index) => (
                  <div key={index} className="cart-item-row">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-qty">x{item.quantity}</span>
                    <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                    <button className="remove-item-btn" onClick={() => removeFromCart(item.menu_id)}>
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
                  <button className="proceed-to-payment-btn" onClick={handleProceedToPayment}>
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
