import React, { createContext, useState, useContext, useEffect } from 'react';
import { addItemToCart, fetchCartItems, deleteItemFromCart, emptyCart } from '../services/api';

// Create the context
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// Cart provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Get the current user ID from localStorage or sessionStorage
  const getCurrentUserId = () => {
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
    return user ? (user.ID || user.id) : null;
  };
  
  // Load cart items when the component mounts
  useEffect(() => {
    const userId = getCurrentUserId();
    if (userId) {
      loadCartItems(userId);
    } else {
      // Clear cart items if user is not logged in
      setCartItems([]);
    }
  }, []);
  
  // Load cart items from the API
  const loadCartItems = async (userId) => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const items = await fetchCartItems(userId);
      setCartItems(items || []);
    } catch (err) {
      setError('Failed to load cart items');
      console.error(err);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Add an item to the cart
  const addToCart = async (item) => {
    const userId = getCurrentUserId();
    console.log("CartContext addToCart called with:", item, "userId:", userId);
    if (!userId) {
      setError('You must be logged in to add items to cart');
      return false;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Ensure all numeric values are properly converted
      const cartItem = {
        user_id: Number(userId),
        menu_id: Number(item.menu_id),
        quantity: Number(item.quantity || 1),
        name: item.name,
        price: Number(item.price)
      };
      
      // Log the types to verify conversion
      console.log("Cart item types:", {
        user_id: typeof cartItem.user_id,
        menu_id: typeof cartItem.menu_id,
        quantity: typeof cartItem.quantity,
        price: typeof cartItem.price
      });
      
      console.log("Sending to backend:", cartItem);
      await addItemToCart(cartItem);
      await loadCartItems(userId);
      return true;
    } catch (err) {
      setError('Failed to add item to cart');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Remove an item from the cart
  const removeFromCart = async (menuId) => {
    const userId = getCurrentUserId();
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Ensure userId is a number and menuId is a string
      const numericUserId = Number(userId);
      const stringMenuId = String(menuId);
      
      console.log("Removing from cart - userId:", numericUserId, "type:", typeof numericUserId);
      console.log("Removing from cart - menuId:", stringMenuId, "type:", typeof stringMenuId);
      
      await deleteItemFromCart(numericUserId, stringMenuId);
      await loadCartItems(numericUserId);
    } catch (err) {
      setError('Failed to remove item from cart');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Clear the cart
  const clearCart = async () => {
    const userId = getCurrentUserId();
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await emptyCart(userId);
      setCartItems([]);
    } catch (err) {
      setError('Failed to clear cart');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Calculate the total price of the cart
  const getCartTotal = () => {
    return (cartItems || []).reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  // Calculate the total number of items in the cart
  const getCartItemCount = () => {
    return (cartItems || []).reduce((count, item) => count + item.quantity, 0);
  };
  
  // Context value
  const value = {
    cartItems,
    loading,
    error,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
    loadCartItems
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext; 