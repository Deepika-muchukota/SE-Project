import React from 'react';
import { useNavigate } from 'react-router-dom';
import './nav.css'; 

function NavBar({ cart, setCart, onLogout, removeOrderFromCart }) {
  const navigate = useNavigate();

  // Calculate total items across all orders
  const totalItems = Array.isArray(cart) ? cart.reduce((total, order) => {
    // Sum up quantities from all items in the order
    const orderItemCount = order.items ? order.items.reduce((count, item) => {
      return count + (item.quantity || 1); // Default to 1 if quantity not specified
    }, 0) : 0;
    return total + orderItemCount;
  }, 0) : 0;

  // Calculate total price across all orders
  const totalPrice = Array.isArray(cart) ? cart.reduce((total, order) => {
    return total + (order.totalPrice || 0);
  }, 0) : 0;

  const navigateToCartPage = () => {
    navigate('/cart');
  };

  const finalizeOrder = async () => {
    if (!Array.isArray(cart) || cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      // For testing without a backend
      console.log("Order placed successfully:", cart);
      alert(`Order placed successfully! Total: $${totalPrice.toFixed(2)}`);
      setCart([]);
      navigate('/foodstalls');
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
          <span className="cart-count">{totalItems}</span> Items
          <button onClick={navigateToCartPage} className="view-cart-btn">
            View Cart
          </button>
        </div>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
