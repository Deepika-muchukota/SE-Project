import React, { useState, useEffect } from "react";
import "./bread.css"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { getFoodStalls, getFoodMenu } from "../services/api";

import italianBread from "./subway_img/italian_bread.jpg";
import wheatBread from "./subway_img/wheat_bread.jpeg";
import herbsCheeseBread from "./subway_img/herbs&cheese_bread.jpeg";

const defaultCategories = [
  { id: 258, name: "Italian", image: italianBread, price: 0.00 },
  { id: 259, name: "Wheat", image: wheatBread, price: 0.00 },
  { id: 260, name: "Herbs & Cheese", image: herbsCheeseBread, price: 0.50 }
];

const breadImages = {
  "Italian": italianBread,
  "Wheat": wheatBread,
  "Herbs & Cheese": herbsCheeseBread
};

function Bread() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart, loading: cartLoading } = useCart();
  const [selectedItem, setSelectedItem] = useState(null);
  const [categories, setCategories] = useState(defaultCategories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stallId, setStallId] = useState(null);

  // Fetch bread menu items on component mount
  useEffect(() => {
    const fetchBreadMenu = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Get all food stalls
        console.log("Fetching food stalls...");
        const stalls = await getFoodStalls();
        console.log("Food stalls response:", stalls);

        if (!stalls || !Array.isArray(stalls)) {
          console.error("Invalid food stalls response:", stalls);
          setError("Invalid response from server");
          return;
        }
        
        // Find the Subway stall
        const subwayStall = stalls.find(stall => 
          stall.Name?.toLowerCase() === 'subway' || 
          stall.name?.toLowerCase() === 'subway'
        );
        
        console.log("Found Subway stall:", subwayStall);
        
        if (subwayStall) {
          const stallId = subwayStall.ID || subwayStall.id;
          setStallId(stallId);
          console.log("Using stall ID:", stallId);
          
          // Get menu items for Subway
          console.log("Fetching menu for stall ID:", stallId);
          const menu = await getFoodMenu(stallId);
          console.log("Menu response:", menu);
          
          if (!menu || !Array.isArray(menu)) {
            console.error("Invalid menu response:", menu);
            setError("Invalid menu response from server");
            return;
          }
          
          // Filter bread items from the menu
          const breadItems = menu.filter(item => {
            const itemName = (item.Name || item.name || '').toLowerCase();
            const isBreadItem = itemName.includes('bread') || 
                              itemName.includes('italian') || 
                              itemName.includes('wheat') || 
                              itemName.includes('herbs');
            console.log(`Checking item ${itemName}: ${isBreadItem ? 'is' : 'is not'} bread`);
            return isBreadItem;
          });
          
          console.log("Filtered bread items:", breadItems);
          
          if (breadItems.length > 0) {
            // Map API data to our format
            const formattedBreadItems = breadItems.map(item => ({
              id: item.ID || item.id,
              name: item.Name || item.name,
              price: item.Price || item.price || 0,
              image: breadImages[item.Name || item.name] || italianBread
            }));
            
            console.log("Formatted bread items:", formattedBreadItems);
            setCategories(formattedBreadItems);
          } else {
            console.log("No bread items found in menu, using defaults");
            setCategories(defaultCategories);
          }
        } else {
          console.error("Available stalls:", stalls);
          setError("Subway stall not found in the available food stalls");
        }
      } catch (err) {
        console.error("Error fetching bread menu:", err);
        setError(err.message || "Failed to load bread menu");
        // Use default categories on error
        console.log("Using default categories due to error");
        setCategories(defaultCategories);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBreadMenu();
    
    // Check if there's a saved bread selection
    const savedBreadJson = sessionStorage.getItem('selectedBread');
    if (savedBreadJson) {
      try {
        const savedBread = JSON.parse(savedBreadJson);
        setSelectedItem(savedBread);
      } catch (e) {
        console.error("Error parsing saved bread:", e);
      }
    }
  }, []);

  const handleItemClick = (item) => {
    // If this item is already selected, deselect it
    if (selectedItem && selectedItem.name === item.name) {
      setSelectedItem(null);
    } else {
      // Select the new item
      setSelectedItem(item);
    }
  };

  const handleContinue = async () => {
    if (selectedItem) {
      sessionStorage.setItem('selectedBread', JSON.stringify(selectedItem));
      await addToCart({
        menu_id: selectedItem.id,
        name: selectedItem.name,
        price: selectedItem.price,
        quantity: 1
      });
    }
    navigate("/foodstalls/subway/protein");
  };

  if (loading) {
    return <div className="loading">Loading bread options...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <p>Using default bread options</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="breads-container">
      <div className="overlay"></div> 
      <h2 className="page-title">Select Your Bread</h2>
      
      <div className="category-grid">
        {categories.map((category, index) => (
          <div key={index} className="item-card">
            <img 
              src={category.image} 
              alt={category.name} 
              className={`category-image ${selectedItem && selectedItem.name === category.name ? 'selected-image' : ''}`}
              onClick={() => handleItemClick(category)}
            />
            <p className="category-name">{category.name}</p>
            <p className="item-price">${category.price.toFixed(2)}</p>
            <div className="selection-indicator">
              {selectedItem && selectedItem.name === category.name ? 
                <span className="selected-mark">✓ Selected</span> : 
                <button 
                  className="select-btn"
                  onClick={() => handleItemClick(category)}
                >
                  Select
                </button>
              }
            </div>
          </div>
        ))}
      </div>
      
      {selectedItem && (
        <div className="selection-summary">
          <h3>What You Selected</h3>
          <div className="selected-item-details">
            <img 
              src={selectedItem.image} 
              alt={selectedItem.name} 
              className="selected-item-image"
            />
            <div className="selected-item-info">
              <h4>{selectedItem.name} Bread</h4>
              <p className="selected-item-price">
                {selectedItem.price > 0 ? 
                  `Price: $${selectedItem.price.toFixed(2)}` : 
                  'Included in base price'}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="navigation-buttons">
        <button 
          className="continue-btn" 
          onClick={handleContinue}
          disabled={!selectedItem || cartLoading}
        >
          {cartLoading ? "Processing..." : "Continue to Protein"}
        </button>
      </div>
    </div>
  );
}

export default Bread;