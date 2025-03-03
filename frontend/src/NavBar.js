import React from 'react';
import { useNavigate } from 'react-router-dom';
import './nav.css'; 

function NavBar({ cart, setCart, onLogout  }) {
  const navigate = useNavigate();

  const finalizeOrder = async () => {
    // Replace with your actual backend endpoint
    const endpoint = 'https://your-backend.com/api/orders';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items: cart })
      });

      if (response.ok) {
        // Clear the cart after order is placed and navigate to confirmation
        setCart([]);
        navigate('/order-success');
        console.log("Order placed successfully");
      } else {
        console.error('Order failed');
      }
    } catch (error) {
      console.error('Error finalizing order:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Welcome to Reitz</div>
      <div className="navbar-content">
        <button onClick={finalizeOrder} className="finalize-order-btn">
          Finalize Order
        </button>
        <div className="navbar-cart">
          <span className="cart-count">{cart.length}</span> Items
        </div>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
