import React from 'react';
import { useNavigate } from 'react-router-dom';
import './nav.css';
import { useCart } from './context/CartContext'; 
import ProfileDropdown from './ProfileDropdown'; 

function NavBar() {
  const navigate = useNavigate();
  const { getCartItemCount } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <ProfileDropdown /> {}
      </div>

      <div className="navbar-center">
        <div className="navbar-logo">Welcome to Reitz</div>
      </div>

      <div className="navbar-right">
        <div className="navbar-cart">
          <span className="cart-count">{getCartItemCount()}</span>
          <span>Items</span>
        </div>
        <button onClick={() => navigate('/cart')} className="view-cart-btn">
          View Cart
        </button>
        <button onClick={() => navigate('/orders')} className="orders-btn">
          Orders
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
