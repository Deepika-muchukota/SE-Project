import React, { useState, useEffect } from "react";
import "./nvegp.css"; 
import pepperoni from "./Baba_images/pepperoni.jpeg";
import tikka from "./Baba_images/tikka.jpeg";
import bbq from "./Baba_images/bbq.jpeg";
import hawaian from "./Baba_images/hawaian.jpeg";
import meat_feast from "./Baba_images/meat_feast.jpeg";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";


const categories = [
  { id: 197, name: "Pepperoni", image: pepperoni, price: 13.99 },
  { id: 198, name: "BBQ Chicken", image: bbq, price: 14.49 },
  { id: 199, name: "Chicken Tikka", image: tikka, price: 14.99 },
  { id: 200, name: "Meat Feast", image: meat_feast, price: 15.49 },
  { id: 201, name: "Hawaiian", image: hawaian, price: 13.99 }
];

function Nvegeterian() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart, removeFromCart, cartItems, loading: cartLoading } = useCart();
  const [selectedItems, setSelectedItems] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const STALL_NAME = "Baba's Pizza";
  const SESSION_STORAGE_KEY = "babas_nveg_selected_items";

  // Load selected items from session storage on mount
  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    
    const savedItems = sessionStorage.getItem('babas_nveg_selected_items');
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems);
        setSelectedItems(parsedItems);
      } catch (error) {
        console.error('Error parsing saved items:', error);
        sessionStorage.removeItem('babas_nveg_selected_items');
      }
    }
  }, [user, navigate]);

  // Save selected items to session storage whenever they change
  useEffect(() => {
    if (user && selectedItems.length > 0) {
      sessionStorage.setItem('babas_nveg_selected_items', JSON.stringify(selectedItems));
    }
  }, [selectedItems, user]);

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

      // Log the types to verify conversion
      console.log("Adding to cart - item types:", {
        menu_id: typeof cartItem.menu_id,
        price: typeof cartItem.price,
        quantity: typeof cartItem.quantity
      });

      // Use the cart context's addToCart function
      const success = await addToCart(cartItem);
      
      if (success) {
        // Update local state only after successful cart update
        setSelectedItems(prev => ({
          ...prev,
          [item.name]: newQuantity
        }));
        
        // Save to session storage
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
          ...selectedItems,
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
      
      // Save to session storage
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updatedItems));

      if (newQuantity === 0) {
        // Remove item from cart using cart context with menu_id
        // Convert menuId to string to match backend expectation
        const menuId = String(item.id);
        console.log("Removing from cart with menuId:", menuId, "type:", typeof menuId);
        await removeFromCart(menuId);
      } else {
        // Update quantity using cart context with proper type conversion
        const cartItem = {
          menu_id: Number(item.id),
          name: `${STALL_NAME} - ${item.name}`,
          price: Number(item.price),
          quantity: Number(newQuantity)
        };

        // Log the types to verify conversion
        console.log("Updating cart - item types:", {
          menu_id: typeof cartItem.menu_id,
          price: typeof cartItem.price,
          quantity: typeof cartItem.quantity
        });

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
      
      // Revert session storage
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
        ...selectedItems,
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
    <div className="bab-opt-container">
      <h1>Non-Vegetarian Pizzas</h1>
      <div className="bab-grid">
        {categories.map((item, index) => (
          <div key={index} className="bab-grid-item">
            <img
              src={item.image}
              alt={item.name}
              className="bab-category-image"
            />
            <p className="bab-category-name">
              {item.name} - ${item.price.toFixed(2)}
            </p>
            <div className="bab-quantity-controls">
              <button 
                onClick={() => handleRemoveItem(item)}
                disabled={loading || cartLoading || !selectedItems[item.name]}
              >
                -
              </button>
              <span>{selectedItems[item.name] || 0}</span>
              <button 
                onClick={() => handleSelectItem(item)}
                disabled={loading || cartLoading}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
          
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
     
export default Nvegeterian;