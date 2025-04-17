import React from 'react';
import { useNavigate } from 'react-router-dom';
import './nav.css'; 
import { useCart } from './context/CartContext';

function NavBar({ cartItemCount, onLogout, isAuthenticated }) {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();

  const navigateToCartPage = () => {
    navigate('/cart');
  };

  const finalizeOrder = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      // For testing without a backend
      console.log("Order placed successfully:", cartItems);
      alert(`Order placed successfully! Total: $${getCartTotal().toFixed(2)}`);
      clearCart();
      navigate('/foodstalls');
    } catch (error) {
      console.error('Error finalizing order:', error);
    }
  };

  const handleLogout = () => {
    // Call the logout function
    onLogout();
    // Navigate to the signin page
    navigate('/signin');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Welcome to Reitz</div>
      <div className="navbar-content">
        <button onClick={finalizeOrder} className="finalize-order-btn">
          Finalize Order
        </button>
        <div className="navbar-cart">
          <span className="cart-count">{cartItemCount}</span> Items
          <button onClick={navigateToCartPage} className="view-cart-btn">
            View Cart
          </button>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default NavBar;