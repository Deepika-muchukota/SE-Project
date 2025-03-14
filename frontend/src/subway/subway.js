import React, { useState } from "react";
import "./subway.css";
import { useNavigate } from "react-router-dom";

// Import your images here
// Example:
// import footlong from "./subway_images/footlong.png";
// import sixinch from "./subway_images/sixinch.png";
// etc.

const categories = [
  { name: "Footlong", price: 8.99 },
  { name: "Six Inch", price: 5.99 },
  { name: "Sides", price: 2.49 },
  { name: "Drinks", price: 1.99 }
];

// Menu options for each category
const menuOptions = {
  "Footlong": {
    breads: ["Italian", "Wheat", "Herbs & Cheese"],
    proteins: ["Turkey", "Ham", "Tuna", "Veggie Delite"]
  },
  "Six Inch": {
    breads: ["Italian", "Wheat", "Herbs & Cheese"],
    proteins: ["Turkey", "Ham", "Tuna", "Veggie Delite"]
  },
  "Sides": {
    options: ["Chips", "Cookie"],
    sizes: ["Regular", "Large"],
    sizeMultipliers: {
      "Regular": 1,
      "Large": 1.5
    }
  },
  "Drinks": {
    options: ["Coca-Cola", "Diet Coke", "Sprite", "Water"],
    sizes: ["Small", "Medium", "Large"],
    sizeMultipliers: {
      "Small": 1,
      "Medium": 1.3,
      "Large": 1.6
    }
  }
};

// Simplified toppings
const toppings = [
  "Lettuce", "Tomato", "Cucumber", "Onion", "Pickles"
];

// Simplified sauces
const sauces = [
  "Mayo", "Ranch", "Mustard", "Oil & Vinegar"
];

function Subway() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBread, setSelectedBread] = useState(null);
  const [selectedProtein, setSelectedProtein] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedSauces, setSelectedSauces] = useState([]);
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [selectedSideOption, setSelectedSideOption] = useState(null);
  const [selectedDrinkOption, setSelectedDrinkOption] = useState(null);
  const [cart, setCart] = useState([]);

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedBread(null);
    setSelectedProtein(null);
    setSelectedToppings([]);
    setSelectedSauces([]);
    setSelectedSize("Medium");
    setSelectedSideOption(null);
    setSelectedDrinkOption(null);
  };

  // Handle bread selection
  const handleBreadSelect = (bread) => {
    setSelectedBread(bread);
  };

  // Handle protein selection
  const handleProteinSelect = (protein) => {
    setSelectedProtein(protein);
  };

  // Handle topping selection
  const handleToppingSelect = (topping) => {
    if (selectedToppings.includes(topping)) {
      setSelectedToppings(selectedToppings.filter(item => item !== topping));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  // Handle sauce selection
  const handleSauceSelect = (sauce) => {
    if (selectedSauces.includes(sauce)) {
      setSelectedSauces(selectedSauces.filter(item => item !== sauce));
    } else {
      setSelectedSauces([...selectedSauces, sauce]);
    }
  };

  // Handle size selection
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  // Handle side option selection
  const handleSideSelect = (option) => {
    setSelectedSideOption(option);
  };

  // Handle drink option selection
  const handleDrinkSelect = (option) => {
    setSelectedDrinkOption(option);
  };

  // Calculate price based on category and size
  const calculatePrice = () => {
    if (!selectedCategory) return 0;
    
    const basePrice = selectedCategory.price;
    
    if (selectedCategory.name === "Sides" || selectedCategory.name === "Drinks") {
      const multiplier = menuOptions[selectedCategory.name].sizeMultipliers[selectedSize] || 1;
      return basePrice * multiplier;
    }
    
    return basePrice;
  };

  // Handle add to cart
  const handleAddToCart = () => {
    let item = {
      category: selectedCategory.name,
      price: calculatePrice()
    };
    
    if (selectedCategory.name === "Footlong" || selectedCategory.name === "Six Inch") {
      item = {
        ...item,
        bread: selectedBread,
        protein: selectedProtein,
        toppings: [...selectedToppings],
        sauces: [...selectedSauces]
      };
    } else if (selectedCategory.name === "Sides") {
      item = {
        ...item,
        option: selectedSideOption,
        size: selectedSize
      };
    } else if (selectedCategory.name === "Drinks") {
      item = {
        ...item,
        option: selectedDrinkOption,
        size: selectedSize
      };
    }
    
    setCart([...cart, item]);
    
    // Reset selections
    setSelectedBread(null);
    setSelectedProtein(null);
    setSelectedToppings([]);
    setSelectedSauces([]);
    setSelectedSideOption(null);
    setSelectedDrinkOption(null);
  };

  // Calculate total cart price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  // Handle back to categories
  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  // Remove item from cart
  const handleRemoveFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // Check if user can add to cart
  const canAddToCart = () => {
    if (!selectedCategory) return false;
    
    if (selectedCategory.name === "Footlong" || selectedCategory.name === "Six Inch") {
      return selectedBread && selectedProtein;
    } else if (selectedCategory.name === "Sides") {
      return selectedSideOption;
    } else if (selectedCategory.name === "Drinks") {
      return selectedDrinkOption;
    }
    
    return false;
  };

  // Render detailed menu based on selected category
  if (selectedCategory) {
    const options = menuOptions[selectedCategory.name];
    
    return (
      <div className="subway-container">
        <div className="background-image"></div>
        
        <div className="content-container">
          <h2>{selectedCategory.name} Options</h2>
          
          <button className="back-button" onClick={handleBackToCategories}>
            Back to Categories
          </button>
          
          {/* Bread Selection (for Footlong and Six Inch) */}
          {(selectedCategory.name === "Footlong" || selectedCategory.name === "Six Inch") && (
            <div className="menu-section">
              <h3>Select Bread</h3>
              <div className="menu-items-grid">
                {options.breads.map((bread, index) => (
                  <div 
                    key={index}
                    className={`menu-item ${selectedBread === bread ? 'selected' : ''}`}
                    onClick={() => handleBreadSelect(bread)}
                  >
                    <div className="menu-item-name">{bread}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Protein Selection (for Sandwiches) */}
          {(selectedCategory.name === "Footlong" || selectedCategory.name === "Six Inch") && (
            <div className="menu-section">
              <h3>Select Protein</h3>
              <div className="menu-items-grid">
                {options.proteins.map((protein, index) => (
                  <div 
                    key={index}
                    className={`menu-item ${selectedProtein === protein ? 'selected' : ''}`}
                    onClick={() => handleProteinSelect(protein)}
                  >
                    <div className="menu-item-name">{protein}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Toppings Selection (for Sandwiches) */}
          {(selectedCategory.name === "Footlong" || selectedCategory.name === "Six Inch") && (
            <div className="menu-section">
              <h3>Select Toppings</h3>
              <div className="menu-items-grid">
                {toppings.map((topping, index) => (
                  <div 
                    key={index}
                    className={`menu-item ${selectedToppings.includes(topping) ? 'selected' : ''}`}
                    onClick={() => handleToppingSelect(topping)}
                  >
                    <div className="menu-item-name">{topping}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Sauce Selection (for Sandwiches) */}
          {(selectedCategory.name === "Footlong" || selectedCategory.name === "Six Inch") && (
            <div className="menu-section">
              <h3>Select Sauces</h3>
              <div className="menu-items-grid">
                {sauces.map((sauce, index) => (
                  <div 
                    key={index}
                    className={`menu-item ${selectedSauces.includes(sauce) ? 'selected' : ''}`}
                    onClick={() => handleSauceSelect(sauce)}
                  >
                    <div className="menu-item-name">{sauce}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Size Selection (for Sides and Drinks) */}
          {(selectedCategory.name === "Sides" || selectedCategory.name === "Drinks") && (
            <div className="size-selector">
              <h3>Select Size</h3>
              <div className="size-buttons">
                {options.sizes.map((size, index) => (
                  <button 
                    key={index}
                    className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size} (${(selectedCategory.price * (options.sizeMultipliers[size] || 1)).toFixed(2)})
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Options Selection (for Sides and Drinks) */}
          {(selectedCategory.name === "Sides" || selectedCategory.name === "Drinks") && (
            <div className="menu-section">
              <h3>Select {selectedCategory.name === "Sides" ? "Side" : "Drink"}</h3>
              <div className="menu-items-grid">
                {options.options.map((option, index) => (
                  <div 
                    key={index}
                    className={`menu-item ${
                      (selectedCategory.name === "Sides" && selectedSideOption === option) || 
                      (selectedCategory.name === "Drinks" && selectedDrinkOption === option) ? 'selected' : ''
                    }`}
                    onClick={() => {
                      if (selectedCategory.name === "Sides") {
                        handleSideSelect(option);
                      } else {
                        handleDrinkSelect(option);
                      }
                    }}
                  >
                    <div className="menu-item-name">{option}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Price and Add to Cart */}
          <div className="order-summary">
            <h3>Your Order</h3>
            
            <div className="current-selection">
              <h4>{selectedCategory.name} Selection</h4>
              
              {(selectedCategory.name === "Footlong" || selectedCategory.name === "Six Inch") && (
                <>
                  <p><strong>Bread:</strong> {selectedBread || "None selected"}</p>
                  <p><strong>Protein:</strong> {selectedProtein || "None selected"}</p>
                  <p><strong>Toppings:</strong> {selectedToppings.length > 0 ? selectedToppings.join(", ") : "None selected"}</p>
                  <p><strong>Sauces:</strong> {selectedSauces.length > 0 ? selectedSauces.join(", ") : "None selected"}</p>
                </>
              )}
              
              {selectedCategory.name === "Sides" && (
                <>
                  <p><strong>Side:</strong> {selectedSideOption || "None selected"}</p>
                  <p><strong>Size:</strong> {selectedSize}</p>
                </>
              )}
              
              {selectedCategory.name === "Drinks" && (
                <>
                  <p><strong>Drink:</strong> {selectedDrinkOption || "None selected"}</p>
                  <p><strong>Size:</strong> {selectedSize}</p>
                </>
              )}
              
              <p><strong>Price:</strong> ${calculatePrice().toFixed(2)}</p>
            </div>
            
            <button 
              className={`add-to-order-button ${!canAddToCart() ? 'disabled' : ''}`}
              disabled={!canAddToCart()}
              onClick={handleAddToCart}
            >
              Add to Order
            </button>
            
            {/* Cart items */}
            {cart.length > 0 && (
              <div className="cart-summary">
                <h4>Cart</h4>
                <div className="cart-items">
                  {cart.map((item, index) => (
                    <div key={index} className="cart-item">
                      <div>
                        <p>
                          <strong>{item.category}:</strong>
                          {item.category === "Footlong" || item.category === "Six Inch" ? 
                            ` ${item.bread}, ${item.protein}` : 
                            item.category === "Sides" || item.category === "Drinks" ? 
                              ` ${item.size} ${item.option}` : ''
                          }
                        </p>
                        <p className="item-price">${item.price.toFixed(2)}</p>
                      </div>
                      <button className="remove-item" onClick={() => handleRemoveFromCart(index)}>×</button>
                    </div>
                  ))}
                </div>
                <div className="cart-total">
                  <p><strong>Total:</strong> ${calculateTotal().toFixed(2)}</p>
                </div>
                <button className="checkout-button">Checkout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Main categories view
  return (
    <div className="subway-container">
      <div className="background-image"></div>
      <div className="content-container">
        <h1>Subway</h1>
        <p className="tagline">Eat Fresh</p>
        <div className="category-grid">
          {categories.map((category, index) => (
            <button 
              key={index} 
              className="category-button" 
              onClick={() => handleCategoryClick(category)}
            >
              <div className="category-name">{category.name}</div>
              <div className="category-price">${category.price.toFixed(2)}</div>
            </button>
          ))}
        </div>
        
        {/* Cart summary at the bottom for main page */}
        {cart.length > 0 && (
          <div className="cart-summary-mini">
            <p><strong>Cart Items:</strong> {cart.length} | <strong>Total:</strong> ${calculateTotal().toFixed(2)}</p>
            <button className="view-cart-button">View Cart</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Subway;