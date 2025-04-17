import React, { useState, useEffect } from "react";
import "./base.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import riceImg from "./Halal_img/white-rice.png";
import saladImg from "./Halal_img/salad.jpeg";
import quinoaImg from "./Halal_img/quinoa.jpeg";

function Base() {
  const navigate = useNavigate();
  const { addToCart, removeFromCart, cartItems } = useCart();
  const { user } = useAuth();
  const [selectedItem, setSelectedItem] = useState(null);
  const [mealType, setMealType] = useState('bowl');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Load meal type and existing selection from sessionStorage on component mount
  useEffect(() => {
    const savedMealType = sessionStorage.getItem('mealType');
    if (savedMealType) {
      setMealType(savedMealType);
    }

    // Check if there's an existing base selection
    const savedBase = sessionStorage.getItem('selectedBase');
    if (savedBase) {
      try {
        const baseData = JSON.parse(savedBase);
        const foundItem = menuItems.find(item => item.name === baseData.name);
        if (foundItem) {
          setSelectedItem(foundItem);
        }
      } catch (e) {
        console.error("Error parsing saved base:", e);
      }
    }
  }, [menuItems]);

  // Fetch menu items from backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const stallsResponse = await axios.get('http://localhost:5000/api/foodstalls');
        const halalStall = stallsResponse.data.foodstalls.find(stall => 
          stall.name.toLowerCase() === 'halal shack'
        );
        
        if (halalStall) {
          const menuResponse = await axios.get(`http://localhost:5000/api/foodstalls/${halalStall.id}/menu`);
          
          if (menuResponse.data.menu && menuResponse.data.menu.length > 0) {
            // Filter only base items (Rice, Salad, Quinoa)
            const baseItems = menuResponse.data.menu.filter(item => 
              ['Rice', 'Salad', 'Quinoa'].includes(item.name)
            ).map(item => ({
              ...item,
              image: getImageForItem(item.name)
            }));
            setMenuItems(baseItems);
          }
        }
      } catch (err) {
        console.error("Error fetching menu items:", err);
        setError("Failed to load menu items");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const getImageForItem = (itemName) => {
    switch(itemName.toLowerCase()) {
      case 'rice': return riceImg;
      case 'salad': return saladImg;
      case 'quinoa': return quinoaImg;
      default: return riceImg;
    }
  };

  const handleItemClick = async (item) => {
    if (!user) {
      navigate('/signin');
      return;
    }

    // If this item is already selected, deselect it
    if (selectedItem && selectedItem.name === item.name) {
      setSelectedItem(null);
      sessionStorage.removeItem('selectedBase');
      
      // Remove from cart if it exists
      const cartItem = cartItems.find(ci => ci.menu_id === item.id);
      if (cartItem) {
        try {
          await axios.delete(`http://localhost:5000/api/cart/delete/${user.id}/${item.id}`);
          removeFromCart(item.id);
        } catch (error) {
          console.error('Error removing item from cart:', error);
          setError('Failed to remove item from cart');
        }
      }
    } else {
      // Select the new item
      setSelectedItem(item);
      // Store selected item in sessionStorage
      sessionStorage.setItem('selectedBase', JSON.stringify(item));

      try {
        // Add to cart
        await axios.post('http://localhost:5000/api/cart/add', {
          user_id: user.id,
          menu_id: item.id,
          quantity: 1,
          name: `Halal Shack - ${item.name}`,
          price: item.price
        });

        addToCart({
          menu_id: item.id,
          name: `Halal Shack - ${item.name}`,
          price: item.price,
          quantity: 1
        });
      } catch (error) {
        console.error('Error adding item to cart:', error);
        setError('Failed to add item to cart');
        // Revert selection if cart update fails
        setSelectedItem(null);
        sessionStorage.removeItem('selectedBase');
      }
    }
  };

  const handleContinue = () => {
    navigate("/foodstalls/halalshack/protein");
  };

  if (loading) return <div className="loading">Loading menu items...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="base-container">
      <div className="overlay"></div> 
      <h2 className="page-title">Select Your {mealType === 'bowl' ? 'Bowl' : 'Wrap'} Base</h2>
      
      <div className="category-grid">
        {menuItems.map((item, index) => (
          <div key={index} className="item-card">
            <img 
              src={item.image}
              alt={item.name} 
              className={`category-image ${selectedItem && selectedItem.name === item.name ? 'selected-image' : ''}`}
              onClick={() => handleItemClick(item)}
            />
            <p className="category-name">{item.name}</p>
            <p className="item-price">
              {item.price === 0 ? 'Free' : `$${item.price.toFixed(2)}`}
            </p>
            <div className="selection-indicator">
              {selectedItem && selectedItem.name === item.name ? 
                <span className="selected-mark">✓ Selected</span> : 
                <button 
                  className="select-btn"
                  onClick={() => handleItemClick(item)}
                >
                  Select
                </button>
              }
            </div>
          </div>
        ))}
      </div>
      
      <div className="navigation-buttons">
        <button 
          className={`continue-btn ${!selectedItem ? 'disabled' : ''}`}
          onClick={handleContinue}
          disabled={!selectedItem}
        >
          Continue to Protein
        </button>
      </div>
    </div>
  );
}

export default Base;