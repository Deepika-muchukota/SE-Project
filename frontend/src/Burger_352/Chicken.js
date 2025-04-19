import React, { useState, useEffect } from "react";
import "./burger_opt.css";
import chicken from "./burger352_images/chicken.jpeg";
import wings from "./burger352_images/wings.jpeg";
import strips from "./burger352_images/strips.jpeg";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

// Updated menu items with correct IDs from the database
const categories = [
  { id: 202, name: "Chicken Strips", image: strips, price: 10.79 },
  { id: 203, name: "Chicken Wings", image: wings, price: 10.99 },
];

function Chicken() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart, removeFromCart, cartItems, loading: cartLoading } = useCart();
  const [selectedItems, setSelectedItems] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const STALL_NAME = "Burger 352";
  const SESSION_STORAGE_KEY = "burger352_chicken_selected_items";

  // Load selected items from session storage on mount
  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    
    const savedItems = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems);
        setSelectedItems(parsedItems);
      } catch (error) {
        console.error('Error parsing saved items:', error);
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
      }
    }
  }, [user, navigate]);

  // Save selected items to session storage whenever they change
  useEffect(() => {
    if (user && Object.keys(selectedItems).length > 0) {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(selectedItems));
    }
  }, [selectedItems, user]);

  // Clear session storage when component unmounts if user is not logged in
  useEffect(() => {
    return () => {
      if (!user) {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
      }
    };
  }, [user]);

  const handleSelectItem = async (item) => {
    if (!user) {
      navigate('/signin');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const newQuantity = (selectedItems[item.name] || 0) + 1;
      
      // Create the cart item object with proper type conversion
      const cartItem = {
        menu_id: Number(item.id),
        name: `${STALL_NAME} - ${item.name}`,
        price: Number(item.price),
        quantity: Number(newQuantity)
      };

      // Use the cart context's addToCart function
      const success = await addToCart(cartItem);
      
      if (success) {
        // Update local state only after successful cart update
        setSelectedItems(prev => ({
          ...prev,
          [item.name]: newQuantity
        }));
      } else {
        setError('Failed to add item to cart');
      }
    } catch (err) {
      setError('Failed to add item to cart');
      console.error('Error adding to cart:', err);
    } finally {
      setLoading(false);
    }
  };
             
  const handleRemoveItem = async (item) => {
    if (!user) {
      navigate('/signin');
      return;
    }

    const currentQuantity = selectedItems[item.name] || 0;
    if (currentQuantity <= 0) return;

    try {
      setLoading(true);
      setError(null);
      
      // Immediately update local state to prevent UI flicker
      const newQuantity = currentQuantity - 1;
      const updatedItems = { ...selectedItems };
      
      if (newQuantity === 0) {
        delete updatedItems[item.name];
      } else {
        updatedItems[item.name] = newQuantity;
      }
      
      setSelectedItems(updatedItems);

      if (newQuantity === 0) {
        // Remove item from cart using cart context
        await removeFromCart(item.id);
      } else {
        // Update quantity using cart context
        const cartItem = {
          menu_id: Number(item.id),
          name: `${STALL_NAME} - ${item.name}`,
          price: Number(item.price),
          quantity: Number(newQuantity)
        };
        await addToCart(cartItem);
      }
    } catch (err) {
      setError('Failed to remove item from cart');
      console.error('Error removing from cart:', err);
      // Revert local state on error
      setSelectedItems(prev => ({
        ...prev,
        [item.name]: currentQuantity
      }));
    } finally {
      setLoading(false);
    }
  };
         
  const handleConfirmOrder = () => {
    navigate('/cart');
  };
         
  if (!user) {
    return null;
  }

  if (loading || cartLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }
         
  return (
    <div className="chicken-opt-container">
      <table className="chicken-table">
        <tbody>
          {categories.reduce((rows, category, index) => {
            if (index % 3 === 0) rows.push([]);
            rows[rows.length - 1].push(category);
            return rows;
          }, []).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((category, colIndex) => (
                <td key={colIndex}>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="category-image"
                  />
                  <p className="category-name">
                    {category.name} - ${category.price.toFixed(2)}
                  </p>
                  <div className="c-quantity-controls">
                    <button 
                      onClick={() => handleRemoveItem(category)}
                      disabled={loading || cartLoading || !selectedItems[category.name]}
                    >
                      -
                    </button>
                    <span>{selectedItems[category.name] || 0}</span>
                    <button 
                      onClick={() => handleSelectItem(category)}
                      disabled={loading || cartLoading}
                    >
                      +
                    </button>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
  
      {Object.keys(selectedItems).length > 0 && (
        <button 
          className="confirm-order-button" 
          onClick={handleConfirmOrder}
          disabled={loading || cartLoading}
        >
          {loading || cartLoading ? 'Processing...' : 'Add to Cart'}
        </button>
      )}
    </div>
  );  
}


export default Chicken;
