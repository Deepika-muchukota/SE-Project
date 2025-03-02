import React, { useState, useEffect } from "react";
import "./baba_pizza.css";
import veg from "./Baba_images/vegeterian_images.jpg";
import non_veg from "./Baba_images/non-veg.jpg";

// Sample pizza data - you can replace with your actual data
const pizzaOptions = {
  veg: [
    { id: "v1", name: "Margherita", price: 12, image: "./Baba_images/vegetarian/margherita.jpeg", description: "Classic cheese pizza with tomato sauce and fresh basil" },
    { id: "v2", name: "Garden Veggie", price: 14, image: "./Baba_images/vegetarian/garden_veggie.jpeg", description: "Fresh vegetables including bell peppers, onions, and mushrooms" },
    { id: "v3", name: "Spinach & Feta", price: 15, image: "./Baba_images/vegetarian/spinach_feta.jpeg", description: "Creamy feta cheese with fresh spinach and garlic" },
    { id: "v4", name: "Mushroom Supreme", price: 14, image: "./Baba_images/vegetarian/mushroom.jpeg", description: "Assorted mushrooms with garlic and herbs" }
  ],
  nonVeg: [
    { id: "nv1", name: "Pepperoni", price: 14, image: "./Baba_images/non-veg/pepperoni.jpeg", description: "Classic pepperoni pizza with extra cheese" },
    { id: "nv2", name: "Meat Lover's", price: 16, image: "./Baba_images/non-veg/meat_lovers.jpeg", description: "Loaded with pepperoni, sausage, bacon, and ham" },
    { id: "nv3", name: "BBQ Chicken", price: 15, image: "./Baba_images/non-veg/bbq_chicken.jpeg", description: "Grilled chicken with onions and BBQ sauce" },
    { id: "nv4", name: "Supreme", price: 16, image: "./Baba_images/non-veg/supreme.jpeg", description: "Pepperoni, sausage, bell peppers, onions, and olives" }
  ]
};

const categories = [
  { name: "Veg Options", image: veg, type: "veg", icon: "🌱", color: "#4CAF50" },
  { name: "Non-Veg Options", image: non_veg, type: "nonVeg", icon: "🍗", color: "#D32F2F" },
];

function Baba() {
  // State to track the current view and selected pizza type
  const [currentView, setCurrentView] = useState("categories");
  const [selectedPizzaType, setSelectedPizzaType] = useState(null);
  const [cart, setCart] = useState([]);
  const [sliceSelections, setSliceSelections] = useState({});
  const [animate, setAnimate] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  
  useEffect(() => {
    // Set animation on initial load
    setAnimate(true);
    
    // Initialize slice selections for all pizzas
    const initialSelections = {};
    Object.values(pizzaOptions).flat().forEach(pizza => {
      initialSelections[pizza.id] = 2; // Default to 2 slices
    });
    setSliceSelections(initialSelections);
  }, []);

  // Handle category selection
  const handleCategorySelect = (type) => {
    setAnimate(false);
    setTimeout(() => {
      setSelectedPizzaType(type);
      setCurrentView("pizzaMenu");
      setAnimate(true);
    }, 300);
  };

  // Go back to main menu
  const handleBackToCategories = () => {
    setAnimate(false);
    setTimeout(() => {
      setCurrentView("categories");
      setSelectedPizzaType(null);
      setAnimate(true);
    }, 300);
  };

  // Handle slice count change
  const handleSliceChange = (pizzaId, increment) => {
    setSliceSelections(prev => {
      const currentSlices = prev[pizzaId] || 2;
      const newSlices = increment 
        ? Math.min(8, currentSlices + 1) 
        : Math.max(1, currentSlices - 1);
      
      return { ...prev, [pizzaId]: newSlices };
    });
  };

  // Calculate price based on slices
  const calculateSlicePrice = (basePrice, slices) => {
    return Math.round(basePrice * (slices / 8) * 10) / 10;
  };

  // Add pizza to cart
  const addToCart = (pizza, size) => {
    const slices = size === "slices" ? sliceSelections[pizza.id] : null;
    const price = size === "whole" ? pizza.price : calculateSlicePrice(pizza.price, slices);
    
    const newItem = {
      id: `${pizza.id}-${Date.now()}`, // Unique ID for each cart item
      name: pizza.name,
      size: size,
      slices: slices,
      price: price,
      imageUrl: pizza.image
    };
    
    // Add with animation
    setCart(prev => [...prev, newItem]);
    
    // Show cart on mobile after adding
    if (window.innerWidth <= 768) {
      setCartOpen(true);
    }
    
    // Show add confirmation
    const pizzaCard = document.getElementById(`pizza-card-${pizza.id}`);
    if (pizzaCard) {
      const badge = document.createElement('div');
      badge.className = 'added-badge';
      badge.textContent = 'Added!';
      pizzaCard.appendChild(badge);
      
      setTimeout(() => {
        if (pizzaCard.contains(badge)) {
          pizzaCard.removeChild(badge);
        }
      }, 1500);
    }
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  // Calculate total cart price
  const cartTotal = cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  
  // Toggle mobile cart
  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  // Render the categories view (first screen)
  const renderCategories = () => (
    <div className="baba-container">
      <div className="overlay"></div>
      
      <div className={`logo-container ${animate ? 'fade-in' : 'fade-out'}`}>
        <div className="logo">
          <h1>BABA<span>PIZZA</span></h1>
        </div>
      </div>
      
      <div className={`tagline ${animate ? 'fade-in' : 'fade-out'}`}>
        Authentic flavors, crafted with love since 1985
      </div>
      
      <div className="category-grid">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className={`category-button ${animate ? 'fade-in' : 'fade-out'}`}
            style={{ animationDelay: `${0.3 + (index * 0.2)}s` }}
            onClick={() => handleCategorySelect(category.type)}
          >
            <div className="pizza-decoration">
              <span>{category.icon}</span>
            </div>
            <div className="category-image-container">
              <img src={category.image} alt={category.name} className="category-image" />
            </div>
            <p className="category-name" style={{ backgroundColor: category.color }}>
              {category.name}
            </p>
          </div>
        ))}
      </div>
      
      
    </div>
  );

  // Render Cart component
  const renderCart = () => (
    <div className={`cart-container ${cartOpen ? 'cart-open' : ''}`}>
      <div className="cart-header">
        <h2>Your Order</h2>
        {window.innerWidth <= 768 && (
          <button className="cart-close" onClick={toggleCart}>×</button>
        )}
      </div>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <p>Your cart is empty</p>
          <p className="empty-cart-hint">Add some delicious pizzas!</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={item.id} className={`cart-item fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="cart-item-details">
                  <div className="cart-item-image">
                    <img src={item.imageUrl} alt={item.name} />
                  </div>
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p>{item.size === "whole" ? "Whole Pizza" : `${item.slices} Slices`}</p>
                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <button 
                  className="remove-button" 
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="cart-total">
              <span>Total:</span>
              <span>${cartTotal}</span>
            </div>
            
            <button className="checkout-button">
              <span>Proceed to Checkout</span>
              <span className="checkout-icon">→</span>
            </button>
          </div>
        </>
      )}
    </div>
  );

  // Render the pizza menu (second screen)
  const renderPizzaMenu = () => {
    const pizzaList = pizzaOptions[selectedPizzaType];
    const pageTitle = selectedPizzaType === "veg" ? "Vegetarian Pizzas" : "Non-Vegetarian Pizzas";
    const categoryColor = selectedPizzaType === "veg" ? "#4CAF50" : "#D32F2F";
    
    return (
      <div className="pizza-menu-page">
        <div className={`pizza-menu-container ${animate ? 'fade-in' : 'fade-out'}`}>
          <div className="menu-header" style={{ borderBottomColor: categoryColor }}>
            <button className="back-button" onClick={handleBackToCategories} style={{ backgroundColor: categoryColor }}>
              <span className="back-icon">←</span>
              <span>Back</span>
            </button>
            <h1 style={{ color: categoryColor }}>{pageTitle}</h1>
            
            {window.innerWidth <= 768 && (
              <button 
                className="cart-toggle-button" 
                onClick={toggleCart}
                style={{ backgroundColor: categoryColor }}
              >
                <span className="cart-icon">🛒</span>
                <span className="cart-count">{cart.length}</span>
              </button>
            )}
          </div>
          
          <div className="pizza-grid">
            {pizzaList.map((pizza, index) => (
              <div 
                id={`pizza-card-${pizza.id}`}
                key={pizza.id} 
                className={`pizza-card ${animate ? 'fade-in' : 'fade-out'}`}
                style={{ animationDelay: `${0.2 + (index * 0.1)}s` }}
              >
                <div className="pizza-image-container">
                  <img src={pizza.image} alt={pizza.name} className="pizza-image" />
                  <div className="pizza-badge" style={{ backgroundColor: categoryColor }}>
                    {selectedPizzaType === "veg" ? "Veg" : "Non-Veg"}
                  </div>
                </div>
                <div className="pizza-details">
                  <h3>{pizza.name}</h3>
                  <p className="pizza-description">{pizza.description}</p>
                  <p className="pizza-price">${pizza.price}</p>
                  
                  <div className="pizza-options">
                    <div className="option-group">
                      <h4>Whole Pizza</h4>
                      <button 
                        className="add-button"
                        onClick={() => addToCart(pizza, "whole")}
                        style={{ backgroundColor: categoryColor }}
                      >
                        Add to Cart - ${pizza.price}
                      </button>
                    </div>
                    
                    <div className="option-group">
                      <h4>By Slice</h4>
                      <div className="slice-selector">
                        <button 
                          className="slice-control"
                          onClick={() => handleSliceChange(pizza.id, false)}
                          disabled={sliceSelections[pizza.id] <= 1}
                        >
                          -
                        </button>
                        <div className="slice-count-container">
                          <span className="slice-count">{sliceSelections[pizza.id]}</span>
                          <span className="slice-label">slices</span>
                        </div>
                        <button 
                          className="slice-control"
                          onClick={() => handleSliceChange(pizza.id, true)}
                          disabled={sliceSelections[pizza.id] >= 8}
                        >
                          +
                        </button>
                      </div>
                      <button 
                        className="add-button slice-add"
                        onClick={() => addToCart(pizza, "slices")}
                        style={{ backgroundColor: "#ff9800" }}
                      >
                        Add to Cart - ${calculateSlicePrice(pizza.price, sliceSelections[pizza.id])}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Cart displayed on the side or bottom depending on screen size */}
        {renderCart()}
        
        {/* Mobile cart toggle */}
        {window.innerWidth <= 768 && !cartOpen && (
          <button className="floating-cart-button" onClick={toggleCart}>
            <span className="cart-icon">🛒</span>
            <span className="cart-count">{cart.length}</span>
          </button>
        )}
      </div>
    );
  };

  // Determine which view to render
  return currentView === "categories" ? renderCategories() : renderPizzaMenu();
}

export default Baba;