import React, { useState, useEffect } from "react";
import "./star.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import brew_milk from "./starbucks_images/bew&milk.jpeg";
import caramel_macchito from "./starbucks_images/caramel_macchito.jpeg";
import caramel from "./starbucks_images/caramel.jpeg";
import coffee_frappacino from "./starbucks_images/coffee_frappacino.jpeg";
import flat_white from "./starbucks_images/flat_white.jpeg";
import honey_almondmilk from "./starbucks_images/honey_almondmilk.jpeg";
import ice_coffee from "./starbucks_images/ice_coffee.jpeg";
import ice_shake from "./starbucks_images/ice_shake.jpeg";
import java from "./starbucks_images/java.jpeg";
import latte from "./starbucks_images/latte.jpg";
import matcha_latte from "./starbucks_images/matcha_latte.jpeg";
import mocha from "./starbucks_images/mocha.jpeg";
import mango from "./starbucks_images/mango.jpeg";
import pumpkin_latte from "./starbucks_images/pumpkin_lattee.jpeg";
import pumpkin_frappacino from "./starbucks_images/pumpkin_frappacino.jpeg";
import refreshers from "./starbucks_images/refreshers.jpeg";
import salted_caramel from "./starbucks_images/salted_caramel.jpeg";
import vanilla_nitro from "./starbucks_images/vanilla_nitro.jpg";
import vanilla_oatmilk from "./starbucks_images/vanilla_oatmilk.jpeg";
import double_choco_chip from "./starbucks_images/double_choco_chip.jpeg";

const defaultCategories = [
  {
    id: 1,
    name: "Caramel Frappuccino",
    price: 5.95,
    image: "/images/starbucks/caramel-frappuccino.jpg"
  },
  {
    id: 2,
    name: "Mocha Frappuccino",
    price: 5.95,
    image: "/images/starbucks/mocha-frappuccino.jpg"
  },
  {
    id: 3,
    name: "Vanilla Bean Frappuccino",
    price: 5.95,
    image: "/images/starbucks/vanilla-frappuccino.jpg"
  },
  {
    id: 4,
    name: "Java Chip Frappuccino",
    price: 5.95,
    image: "/images/starbucks/java-chip-frappuccino.jpg"
  },
  {
    id: 5,
    name: "Espresso Frappuccino",
    price: 5.45,
    image: "/images/starbucks/espresso-frappuccino.jpg"
  },
  {
    id: 6,
    name: "Coffee Frappuccino",
    price: 5.45,
    image: "/images/starbucks/coffee-frappuccino.jpg"
  }
];

function StarBucksDrinks() {
  const navigate = useNavigate();
  const { addToCart, removeFromCart, cartItems, getQuantity, updateQuantity } = useCart();
  const { user } = useAuth();
  const [selectedItems, setSelectedItems] = useState({});
  const [menuItems, setMenuItems] = useState(defaultCategories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removingItemId, setRemovingItemId] = useState(null);
  
  const STALL_NAME = "Starbucks";
  const SESSION_STORAGE_KEY = "starbucks_selected_items";

  // Load selected items from session storage on mount
  useEffect(() => {
    const loadSelectedItems = () => {
      try {
        if (!user) {
          navigate('/signin');
          return;
        }
        
        // First try to load from session storage
        const storedItems = sessionStorage.getItem(SESSION_STORAGE_KEY);
        if (storedItems) {
          setSelectedItems(JSON.parse(storedItems));
          return;
        }
        
        // If not in session storage, initialize from cart
        const starbucksItems = cartItems.filter(item => 
          item.name.toLowerCase().includes('starbucks')
        );
        
        const cartItemsMap = {};
        starbucksItems.forEach(item => {
          cartItemsMap[item.name] = item.quantity;
        });
        
        setSelectedItems(cartItemsMap);
        // Save to session storage
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(cartItemsMap));
      } catch (err) {
        console.error("Error loading selected items:", err);
        setError("Failed to load cart items");
      }
    };

    loadSelectedItems();
  }, [user, cartItems, navigate]);

  // Save selected items to session storage whenever they change
  useEffect(() => {
    if (Object.keys(selectedItems).length > 0) {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(selectedItems));
    }
  }, [selectedItems]);

  // Fetch menu items from the backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First, get the Starbucks food stall ID
        const stallsResponse = await axios.get('http://localhost:5000/api/foodstalls');
        const starbucksStall = stallsResponse.data.foodstalls.find(stall => 
          stall.name.toLowerCase() === 'starbucks'
        );
        
        if (starbucksStall) {
          // Then get the menu items for Starbucks
          const menuResponse = await axios.get(`http://localhost:5000/api/foodstalls/${starbucksStall.id}/menu`);
          
          if (menuResponse.data.menu && menuResponse.data.menu.length > 0) {
            // Map the backend data to our frontend format
            const formattedMenu = menuResponse.data.menu.map(item => ({
              id: item.id,
              name: item.name,
              price: item.price,
              // Use default images based on name matching
              image: getImageForMenuItem(item.name)
            }));
            setMenuItems(formattedMenu);
          } else {
            console.warn("No menu items found for Starbucks, using defaults");
          }
        } else {
          console.warn("Starbucks stall not found, using default menu");
        }
      } catch (err) {
        console.error("Error fetching menu items:", err);
        setError("Failed to load menu items. Using default items.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const getImageForMenuItem = (itemName) => {
    const name = itemName.toLowerCase();
    if (name.includes('brew') && name.includes('milk')) return brew_milk;
    if (name.includes('caramel') && name.includes('macchiato')) return caramel_macchito;
    if (name.includes('caramel')) return caramel;
    if (name.includes('coffee') && name.includes('frappuccino')) return coffee_frappacino;
    if (name.includes('flat') && name.includes('white')) return flat_white;
    if (name.includes('honey') && name.includes('almond')) return honey_almondmilk;
    if (name.includes('ice') && name.includes('coffee')) return ice_coffee;
    if (name.includes('ice') && name.includes('shake')) return ice_shake;
    if (name.includes('java')) return java;
    if (name.includes('latte') && !name.includes('matcha') && !name.includes('pumpkin')) return latte;
    if (name.includes('matcha')) return matcha_latte;
    if (name.includes('mocha')) return mocha;
    if (name.includes('mango')) return mango;
    if (name.includes('pumpkin') && name.includes('latte')) return pumpkin_latte;
    if (name.includes('pumpkin') && name.includes('frappuccino')) return pumpkin_frappacino;
    if (name.includes('refresher')) return refreshers;
    if (name.includes('salted') && name.includes('caramel')) return salted_caramel;
    if (name.includes('vanilla') && name.includes('nitro')) return vanilla_nitro;
    if (name.includes('vanilla') && name.includes('oat')) return vanilla_oatmilk;
    if (name.includes('double') && name.includes('choco')) return double_choco_chip;
    return latte; // Default image if no match is found
  };

  const handleSelectItem = async (item) => {
    try {
      if (!user) {
        navigate('/signin');
        return;
      }

      const newQuantity = (selectedItems[item.name] || 0) + 1;
      
      // Disable the button temporarily to prevent rapid clicks
      const button = document.querySelector(`button[data-item-id="${item.id}"][data-action="add"]`);
      if (button) button.disabled = true;
      
      try {
        // Create the cart item object
        const cartItem = {
          menu_id: Number(item.id),
          name: `${STALL_NAME} - ${item.name}`,
          price: Number(item.price),
          quantity: newQuantity
        };

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
      } catch (error) {
        console.error('Error updating cart:', error);
        setError('Failed to update cart. Please try again.');
      } finally {
        // Re-enable the button
        if (button) button.disabled = false;
      }
    } catch (error) {
      console.error('Error in handleSelectItem:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const handleRemoveItem = async (item) => {
    if (!user) {
      navigate('/signin');
      return;
    }

    const currentQuantity = selectedItems[item.name] || 0;
    if (currentQuantity <= 0) return;

    // Set removing state
    setRemovingItemId(item.id);

    try {
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
          quantity: newQuantity
        };
        await addToCart(cartItem);
      }

      // Update session storage
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updatedItems));
    } catch (error) {
      console.error('Error in handleRemoveItem:', error);
      // Revert local state on error
      setSelectedItems(prev => ({
        ...prev,
        [item.name]: currentQuantity
      }));
      setError('Failed to update cart. Please try again.');
    } finally {
      setRemovingItemId(null);
    }
  };

  if (loading) {
    return <div className="loading">Loading menu items...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="starbucks-container">
      <h1>Starbucks Menu</h1>
      <div className="menu-grid">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-item">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p className="price">${item.price.toFixed(2)}</p>
            <div className="quantity-controls">
              <button 
                className="quantity-btn decrease-btn"
                data-item-id={item.id}
                data-action="remove"
                onClick={() => handleRemoveItem(item)}
                disabled={!selectedItems[item.name] || removingItemId === item.id}
              >
                {removingItemId === item.id ? '...' : '-'}
              </button>
              <span className="quantity-display">{selectedItems[item.name] || 0}</span>
              <button 
                className="quantity-btn increase-btn"
                data-item-id={item.id}
                data-action="add"
                onClick={() => handleSelectItem(item)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StarBucksDrinks;
