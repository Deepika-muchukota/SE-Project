import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar({ cart, setCart }) {
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
        // Optionally clear the cart after order is placed
        setCart([]);
        // Navigate to an order confirmation page or display a success message
        navigate('/order-success');
        console.log("order placed");
      } else {
        console.error('Order failed');
        // Handle error case (show error message, etc.)
      }
    } catch (error) {
      console.error('Error finalizing order:', error);
      // Handle error case
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* You can add more navigation links or branding here */}
        <button onClick={finalizeOrder} className="finalize-order-btn">
          Finalize Order
        </button>
        <span>{cart.length} Items</span>
      </div>
    </nav>
  );
}

export default NavBar;
