import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './nav.css'; 

function NavBar({ cart, setCart, onLogout, removeOrderFromCart }) {
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);

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

  const toggleCart = () => {
    setShowCart(!showCart);
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
          <button onClick={toggleCart} className="view-cart-btn">
            {showCart ? 'Hide Cart' : 'View Cart'}
          </button>
        </div>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {showCart && (
        <div className="cart-dropdown">
          <div className="cart-container">
            <h3>Your Cart</h3>
            {!Array.isArray(cart) || cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                {cart.map((order, index) => (
                  <div key={order.orderId || index} className="cart-order">
                    <div className="order-header">
                      <h4>{order.stall} {order.mealType ? `- ${order.mealType}` : ''}</h4>
                      {removeOrderFromCart && (
                        <button 
                          className="remove-order-btn"
                          onClick={() => removeOrderFromCart(order.orderId)}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    
                    <div className="order-items">
                      {order.items && order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="cart-item">
                          <span className="item-name">
                            {item.type ? `${item.type}: ` : ''}{item.name} {item.quantity && item.quantity > 1 ? `x${item.quantity}` : ''}
                          </span>
                          <span className="item-price">
                            ${typeof item.price === 'number' && !isNaN(item.price) ? 
                              (item.quantity ? (item.price * item.quantity).toFixed(2) : item.price.toFixed(2)) : 
                              '0.00'}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="order-total">
                      <span>Order Total:</span>
                      <span>${typeof order.totalPrice === 'number' && !isNaN(order.totalPrice) ? 
                        order.totalPrice.toFixed(2) : '0.00'}</span>
                    </div>
                  </div>
                ))}
                
                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <button className="checkout-btn" onClick={finalizeOrder}>
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;