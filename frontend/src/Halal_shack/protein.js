import React, { useState, useEffect } from "react";
import "./protein.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import chickenImg from "./Halal_img/chicken.png";
import beefImg from "./Halal_img/beef.png";
import falafelImg from "./Halal_img/falafel.png";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Protein() {
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

    // Check if there's an existing protein selection
    const savedProtein = sessionStorage.getItem('selectedProtein');
    if (savedProtein) {
      try {
        const proteinData = JSON.parse(savedProtein);
        const foundItem = menuItems.find(item => item.name === proteinData.name);
        if (foundItem) {
          setSelectedItem(foundItem);
        }
      } catch (e) {
        console.error("Error parsing saved protein:", e);
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
            // Filter only protein items (Chicken, Beef, Falafel)
            const proteinItems = menuResponse.data.menu.filter(item => 
              ['Chicken', 'Beef', 'Falafel'].includes(item.name)
            ).map(item => ({
              ...item,
              image: getImageForItem(item.name)
            }));
            setMenuItems(proteinItems);
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
      case 'chicken': return chickenImg;
      case 'beef': return beefImg;
      case 'falafel': return falafelImg;
      default: return chickenImg;
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
      sessionStorage.removeItem('selectedProtein');
      
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
      sessionStorage.setItem('selectedProtein', JSON.stringify(item));

      try {
        // Add to cart
        const cartItem = {
          user_id: Number(user.id),
          menu_id: Number(item.id),
          quantity: 1,
          name: `Halal Shack - ${item.name}`,
          price: Number(item.price)
        };
        
        await axios.post('http://localhost:5000/api/cart/add', cartItem);
        
        // Also update the local cart state
        addToCart({
          menu_id: item.id,
          name: `Halal Shack - ${item.name}`,
          price: item.price,
          quantity: 1
        });
        
        console.log(`Added ${item.name} to cart with ID ${item.id}`);
      } catch (error) {
        console.error('Error adding item to cart:', error);
        setError('Failed to add item to cart');
        // Revert selection if cart update fails
        setSelectedItem(null);
        sessionStorage.removeItem('selectedProtein');
      }
    }
  };

  const handleContinue = () => {
    navigate("/foodstalls/halalshack/toppings");
  };

  if (loading) return <div className="loading">Loading menu items...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="protein-container">
      <div className="overlay"></div> 
      <h2 className="page-title">Select Your Protein for {mealType === 'bowl' ? 'Bowl' : 'Wrap'}</h2>
      
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
            <p className="item-price">${item.price.toFixed(2)}</p>
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
      
      <div className="order-summary">
        <h3 className="order-summary-title">Protein Selection</h3>
        {selectedItem ? (
          <p>{selectedItem.name} - ${selectedItem.price.toFixed(2)}</p>
        ) : (
          <p>No proteins selected yet.</p>
        )}
      </div>
      
      <div className="navigation-buttons">
        <button 
          className="back-btn"
          onClick={() => navigate("/foodstalls/halalshack/base")}
        >
          Back to Base
        </button>
        <button 
          className={`continue-btn ${!selectedItem ? 'disabled' : ''}`}
          onClick={handleContinue}
          disabled={!selectedItem}
        >
          Continue to Toppings
        </button>
      </div>
    </div>
  );
}

export default Protein;