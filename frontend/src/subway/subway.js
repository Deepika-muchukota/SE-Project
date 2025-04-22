import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./subway.css";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { getFoodStalls, getFoodMenu } from "../services/api";

// Import only the images we need for the main page
import breadImg from "./subway_img/wheat_bread.jpeg";
import drinksImg from "./subway_img/coke.png";

function Subway() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart, loading: cartLoading } = useCart();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stallId, setStallId] = useState(null);

  // Keep only Bread and Drinks on the main page
  const categories = [
    { name: "Bread", image: breadImg, path: "/foodstalls/subway/bread", price: "$6.49" },
    { name: "Drinks", image: drinksImg, path: "/foodstalls/subway/drinks", price: "From $1.99" }
  ];

  // Numeric prices for calculations
  const numericPrices = {
    "Bread": 6.49,
    "Drinks": 1.99
  };

  // Fetch Subway stall ID and menu items on component mount
  useEffect(() => {
    const fetchSubwayData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Get all food stalls
        const stalls = await getFoodStalls();
        console.log("Food stalls response:", stalls); // Debug log
        
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
        
        console.log("Found Subway stall:", subwayStall); // Debug log
        
        if (subwayStall) {
          const stallId = subwayStall.ID || subwayStall.id;
          setStallId(stallId);
          console.log("Using stall ID:", stallId); // Debug log
          
          // Get menu items for Subway
          const menu = await getFoodMenu(stallId);
          console.log("Menu response:", menu); // Debug log
          
          if (menu) {
            setMenuItems(menu);
          } else {
            setError("No menu items found");
          }
        } else {
          console.error("Available stalls:", stalls); // Debug log
          setError("Subway stall not found in the available food stalls");
        }
      } catch (err) {
        console.error("Error fetching Subway data:", err);
        setError(err.message || "Failed to load Subway menu");
      } finally {
        setLoading(false);
      }
    };
    
    fetchSubwayData();
  }, []);

  // Check if there's a saved order
  const savedOrderJson = sessionStorage.getItem('subwayOrder');
  const savedOrder = savedOrderJson ? JSON.parse(savedOrderJson) : null;

  // Function to start a new order - keep all the original sessionStorage items
  const startNewOrder = () => {
    // Clear any existing selections
    sessionStorage.removeItem('selectedBread');
    sessionStorage.removeItem('basePrice');
    sessionStorage.removeItem('selectedProteins');
    sessionStorage.removeItem('selectedToppings');
    sessionStorage.removeItem('selectedSauces');
    sessionStorage.removeItem('selectedSides');
    sessionStorage.removeItem('subwayOrder');
    sessionStorage.removeItem('subwayDrinks');
    
    // Store base price for calculations
    sessionStorage.setItem('basePrice', numericPrices.Bread.toString());
    
    // Navigate to first step - bread (original flow)
    navigate("/foodstalls/subway/bread");
  };

  // Function to handle category button clicks
  const handleCategoryClick = (category) => {
    // If selecting Bread, store base price and start sandwich flow
    if (category.name === "Bread") {
      sessionStorage.setItem('basePrice', numericPrices.Bread.toString());
      navigate(category.path);
    }
    // For Drinks, pass state to indicate direct order
    else if (category.name === "Drinks") {
      navigate(category.path, { state: { directDrinkOrder: true } });
    }
    else {
      navigate(category.path);
    }
  };

  // Function to handle reorder
  const handleReorder = () => {
    if (!isAuthenticated()) {
      alert("Please log in to reorder");
      return;
    }
    
    if (savedOrder) {
      // Start a new order with the saved order data
      startNewOrder();
      
      // Set the saved order data in sessionStorage
      sessionStorage.setItem('selectedBread', JSON.stringify(savedOrder.bread));
      sessionStorage.setItem('selectedProteins', JSON.stringify(savedOrder.proteins));
      sessionStorage.setItem('selectedToppings', JSON.stringify(savedOrder.toppings));
      sessionStorage.setItem('selectedSauces', JSON.stringify(savedOrder.sauces));
      sessionStorage.setItem('selectedSides', JSON.stringify(savedOrder.sides));
      
      // Navigate to the bread page
      navigate("/foodstalls/subway/bread");
    }
  };

  if (loading) {
    return <div className="loading">Loading Subway menu...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="subway-container">
      <div className="overlay"></div>
      <h1 className="subway-title">Subway</h1>
      
      <div className="category-grid">
        {categories.map((category, index) => (
          <button 
            key={index} 
            className="category-button" 
            onClick={() => handleCategoryClick(category)}
          >
            <img src={category.image} alt={category.name} className="category-image" />
            <p className="category-name">{category.name}</p>
            <p className="category-price">{category.price}</p>
          </button>
        ))}
      </div>
      
      <div className="order-actions">
        <button 
          className="start-order-btn"
          onClick={startNewOrder}
        >
          Start New Order
        </button>
      </div>
      
      {savedOrder && (
        <div className="saved-order">
          <h2>Your Last Order</h2>
          <p>Bread: {savedOrder.bread?.name || "None"}</p>
          <p>Proteins: {Object.keys(savedOrder.proteins || {}).length > 0 ? 
            Object.entries(savedOrder.proteins)
              .map(([name, qty]) => `${name} (${qty})`)
              .join(", ") : 
            "None"}
          </p>
          <p>Toppings: {savedOrder.toppings && savedOrder.toppings.length > 0 ? savedOrder.toppings.join(", ") : "None"}</p>
          <p>Sauces: {savedOrder.sauces && savedOrder.sauces.length > 0 ? savedOrder.sauces.join(", ") : "None"}</p>
          <button 
            className="reorder-btn"
            onClick={handleReorder}
            disabled={cartLoading}
          >
            {cartLoading ? "Processing..." : "Reorder"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Subway;
