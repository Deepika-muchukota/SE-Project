import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

function CartPage({ cart, setCart, removeOrderFromCart }) {
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

  const handleBackToFoodStalls = () => {
    navigate('/foodstalls');
  };

  return (
    <div className="cart-wrapper">
      <div className="cart-page">
        <div className="cart-header">
          <button onClick={handleBackToFoodStalls} className="back-button">
            ← Back to Food Stalls
          </button>
          <h1>Your Cart</h1>
          <div className="cart-summary">
            <span>{totalItems} Items</span>
            <span className="cart-total-price">Total: ${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="cart-content">
          {!Array.isArray(cart) || cart.length === 0 ? (
            <div className="empty-cart">
              <h2>Your cart is empty</h2>
              <p>Add items from our food stalls to get started</p>
              <button onClick={handleBackToFoodStalls} className="continue-shopping">
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-orders">
                {cart.map((order, index) => (
                  <div key={order.orderId || index} className="cart-order">
                    <div className="order-header">
                      <h3>{order.stall} {order.mealType ? `- ${order.mealType}` : ''}</h3>
                      {removeOrderFromCart && (
                        <button 
                          className="remove-order"
                          onClick={() => removeOrderFromCart(order.orderId)}
                          aria-label="Remove order"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    
                    <div className="order-items-list">
                      {order.items && order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="cart-item">
                          <div className="item-info">
                            <span className="item-name">
                              {item.type ? `${item.type}: ` : ''}{item.name}
                            </span>
                            {item.quantity && item.quantity > 1 && (
                              <span className="item-quantity">x{item.quantity}</span>
                            )}
                          </div>
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
              </div>
              
              <div className="cart-footer">
                <div className="cart-totals">
                  <div className="cart-subtotal">
                    <span>Subtotal:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="cart-grand-total">
                    <span>Grand Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="cart-actions">
                  <button className="continue-shopping" onClick={handleBackToFoodStalls}>
                    Continue Shopping
                  </button>
                  <button className="checkout" onClick={finalizeOrder}>
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartPage;