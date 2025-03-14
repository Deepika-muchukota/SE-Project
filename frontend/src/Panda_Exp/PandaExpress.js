import React, { useState } from "react";
import "./pandaexp.css";
import plate from "./panda_images/plate.png"; 
import bigger_plate from "./panda_images/bigger_plate.png";
import bowl from "./panda_images/bowl.png";
import carts from "./panda_images/carts.png";
import drinks from "./panda_images/drinks.png";
import appetizers from "./panda_images/appetizers.png";

// Sides
import whiteRice from './panda_images/white-rice.png';
import friedRice from './panda_images/fried-rice.png';
import chowMein from './panda_images/chow-mein.png';
import superGreens from './panda_images/super-greens.png';

// Entrees
import orangeChicken from './panda_images/orange-chicken.png';
import beijingBeef from './panda_images/beijing-beef.png';
import broccoliBeef from './panda_images/broccoli-beef.png';
import kungPaoChicken from './panda_images/kungpao-chicken.png';
import honeyWalnutShrimp from './panda_images/walnut-shrimp.png';
import blackPepperChicken from './panda_images/black-pepper-chicken.png';
import mushroomChicken from './panda_images/mushroom-chicken.png';
import stringBeanChicken from './panda_images/string-bean-chicken.png';

//Appetizers
import chickenEggRoll from './panda_images/egg-roll.png';
import creamCheeseRangoon from './panda_images/rangoon.png';
import applePie from './panda_images/egg-roll.png';
import vegetableSpringRoll from './panda_images/veg-spring-roll.png';

// Drinks
import cocaCola from './panda_images/coke.png';
import dietCoke from './panda_images/diet-coke.png';
import sprite from './panda_images/sprite.png';
import drPepper from './panda_images/dr-pepper.png';
import fantaOrange from './panda_images/fanta.png';
import Water from './panda_images/water.png';

const menuItemImages = {
  // Sides
  "White Rice": whiteRice,
  "Fried Rice": friedRice,
  "Chow Mein": chowMein,
  "Super Greens": superGreens,

  // Entrees
  "Orange Chicken": orangeChicken,
  "Beijing Beef": beijingBeef,
  "Broccoli Beef": broccoliBeef,
  "Kung Pao Chicken": kungPaoChicken,
  "Honey Walnut Shrimp": honeyWalnutShrimp,
  "Black Pepper Chicken": blackPepperChicken,
  "Mushroom Chicken": mushroomChicken,
  "String Bean Chicken Breast": stringBeanChicken,

  // Appetizers
  "Chicken Egg Roll": chickenEggRoll,
  "Cream Cheese Rangoon": creamCheeseRangoon,
  "Apple Pie": applePie,
  "Vegetable Spring Roll": vegetableSpringRoll,

  // Drinks
  "Coca-Cola": cocaCola,
  "Diet Coke": dietCoke,
  "Sprite": sprite,
  "Dr Pepper": drPepper,
  "Fanta Orange": fantaOrange,
  "Water": Water
};

const categories = [
  { name: "Plate", image: plate, price: 10.00 },
  { name: "Bigger Plate", image: bigger_plate, price: 11.50 },
  { name: "Bowl", image: bowl, price: 8.50 },
  { name: "Al a Carts", image: carts, price: 4.60 },
  { name: "Drinks", image: drinks, price: 2.10 },
  { name: "Appetizers", image: appetizers, price: 2.00 }
];

// Menu options for each category
const menuOptions = {
  "Plate": {
    sides: ["White Rice", "Fried Rice", "Chow Mein", "Super Greens"],
    entrees: ["Orange Chicken", "Beijing Beef", "Broccoli Beef", "Kung Pao Chicken", 
              "Honey Walnut Shrimp", "Black Pepper Chicken", "Mushroom Chicken", 
              "String Bean Chicken Breast"]
  },
  "Bigger Plate": {
    sides: ["White Rice", "Fried Rice", "Chow Mein", "Super Greens"],
    entrees: ["Orange Chicken", "Beijing Beef", "Broccoli Beef", "Kung Pao Chicken", 
              "Honey Walnut Shrimp", "Black Pepper Chicken", "Mushroom Chicken", 
              "String Bean Chicken Breast"]
  },
  "Bowl": {
    sides: ["White Rice", "Fried Rice", "Chow Mein", "Super Greens"],
    entrees: ["Orange Chicken", "Beijing Beef", "Broccoli Beef", "Kung Pao Chicken", 
              "Honey Walnut Shrimp", "Black Pepper Chicken", "Mushroom Chicken", 
              "String Bean Chicken Breast"]
  },
  "Al a Carts": {
    options: ["Orange Chicken", "Beijing Beef", "Broccoli Beef", "Kung Pao Chicken", 
              "Honey Walnut Shrimp", "Black Pepper Chicken", "Mushroom Chicken", 
              "String Bean Chicken Breast"],
    sizes: ["Small", "Medium", "Large"],
    sizeMultipliers: {
      "Small": 1,
      "Medium": 1.5,
      "Large": 2
    }
  },
  "Appetizers": {
    options: ["Chicken Egg Roll", "Cream Cheese Rangoon", 
              "Apple Pie", "Vegetable Spring Roll"]
  },
  "Drinks": {
    options: ["Coca-Cola", "Diet Coke", "Sprite", "Dr Pepper", "Fanta Orange", "Water"],
    sizes: ["Small", "Medium", "Large"],
    sizeMultipliers: {
      "Small": 1,
      "Medium": 1.3,
      "Large": 1.6
    }
  }
};

function PandaExpress() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSide, setSelectedSide] = useState(null);
  const [selectedEntrees, setSelectedEntrees] = useState([]);
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [cart, setCart] = useState([]);
  const [selectedALaCarteItems, setSelectedALaCarteItems] = useState([]);

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSide(null);
    setSelectedEntrees([]);
    setSelectedSize("Medium");
    setSelectedALaCarteItems([]);
  };

  // Handle side selection
  const handleSideSelect = (side) => {
    setSelectedSide(side);
  };

  // Handle entree selection
  const handleEntreeSelect = (entree) => {
    // For Plate: max 2 entrees, for Bigger Plate: max 3 entrees, for Bowl: max 1 entree
    let maxEntrees = 1;
    if (selectedCategory.name === "Plate") maxEntrees = 2;
    if (selectedCategory.name === "Bigger Plate") maxEntrees = 3;

    if (selectedEntrees.includes(entree)) {
      // Remove if already selected
      setSelectedEntrees(selectedEntrees.filter(item => item !== entree));
    } else if (selectedEntrees.length < maxEntrees) {
      // Add if under the maximum
      setSelectedEntrees([...selectedEntrees, entree]);
    }
  };

  // Handle a la carte item selection
  const handleALaCarteSelect = (item) => {
    const existingItemIndex = selectedALaCarteItems.findIndex(i => i.name === item);
    
    if (existingItemIndex >= 0) {
      // If item exists, update its quantity
      const updatedItems = [...selectedALaCarteItems];
      updatedItems[existingItemIndex].quantity += 1;
      setSelectedALaCarteItems(updatedItems);
    } else {
      // Add new item
      setSelectedALaCarteItems([...selectedALaCarteItems, { 
        name: item, 
        size: selectedSize,
        quantity: 1,
        price: calculateItemPrice(item)
      }]);
    }
  };

  // Calculate price based on item and size
  const calculateItemPrice = (item) => {
    const basePrice = selectedCategory.price;
    const sizeMultiplier = menuOptions[selectedCategory.name]?.sizeMultipliers?.[selectedSize] || 1;
    return basePrice * sizeMultiplier;
  };

  // Handle size selection
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    
    // Update prices of selected items
    if (selectedALaCarteItems.length > 0) {
      const updatedItems = selectedALaCarteItems.map(item => ({
        ...item,
        size: size,
        price: selectedCategory.price * (menuOptions[selectedCategory.name]?.sizeMultipliers?.[size] || 1)
      }));
      setSelectedALaCarteItems(updatedItems);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (selectedCategory.name === "Al a Carts" || selectedCategory.name === "Drinks") {
      // Add a la carte items to cart
      setCart([...cart, ...selectedALaCarteItems]);
    } else if (selectedCategory.name === "Appetizers") {
      // Add appetizer to cart
      selectedALaCarteItems.forEach(item => {
        setCart([...cart, {
          category: selectedCategory.name,
          item: item.name,
          price: selectedCategory.price,
          quantity: item.quantity
        }]);
      });
    } else {
      // Add meal to cart
      setCart([...cart, {
        category: selectedCategory.name,
        side: selectedSide,
        entrees: [...selectedEntrees],
        price: selectedCategory.price
      }]);
    }
    
    // Reset selection
    setSelectedALaCarteItems([]);
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      if (item.quantity) {
        return total + (item.price * item.quantity);
      }
      return total + item.price;
    }, 0);
  };

  // Handle back to categories
  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedSide(null);
    setSelectedEntrees([]);
    setSelectedALaCarteItems([]);
  };

  // Remove item from cart
  const handleRemoveFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // Render based on current state
  if (selectedCategory) {
    const options = menuOptions[selectedCategory.name];
    
    return (
      <div className="panda-container">
        <div className="background-image"></div>
        
        <div className="content-container">
          <div className="menu-container">
            <h2>{selectedCategory.name} Options</h2>
            
            <button className="back-button" onClick={handleBackToCategories}>
              Back to Categories
            </button>
            
            {(selectedCategory.name === "Al a Carts" || selectedCategory.name === "Drinks") && (
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
            
            {(selectedCategory.name === "Plate" || selectedCategory.name === "Bigger Plate" || selectedCategory.name === "Bowl") && (
              <div className="menu-section">
                <h3>Select a Side</h3>
                <div className="menu-items-grid">
                  {options.sides.map((side, index) => (
                    <div 
                      key={index}
                      className={`menu-item ${selectedSide === side ? 'selected' : ''}`}
                      onClick={() => handleSideSelect(side)}
                    >
                      <div className="menu-item-image-container">
                        <img 
                          src={menuItemImages[side] || "/images/menu/placeholder.jpg"}
                          alt={side} 
                          className="menu-item-image" 
                        />
                      </div>
                      <div className="menu-item-name">{side}</div>
                    </div>
                  ))}
                </div>
                
                <h3>
                  Select {selectedCategory.name === "Plate" ? "2" : 
                        selectedCategory.name === "Bigger Plate" ? "3" : "1"} Entree
                  {(selectedCategory.name === "Plate" || selectedCategory.name === "Bigger Plate") ? "s" : ""}
                </h3>
                <div className="menu-items-grid">
                  {options.entrees.map((entree, index) => (
                    <div 
                      key={index}
                      className={`menu-item ${selectedEntrees.includes(entree) ? 'selected' : ''}`}
                      onClick={() => handleEntreeSelect(entree)}
                    >
                      <div className="menu-item-image-container">
                        <img 
                          src={menuItemImages[entree] || "/images/menu/placeholder.jpg"}
                          alt={entree} 
                          className="menu-item-image" 
                        />
                      </div>
                      <div className="menu-item-name">{entree}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {(selectedCategory.name === "Al a Carts" || selectedCategory.name === "Drinks" || selectedCategory.name === "Appetizers") && (
              <div className="menu-section">
                <h3>Select Items</h3>
                <div className="menu-items-grid">
                  {options.options.map((option, index) => (
                    <div 
                      key={index}
                      className="menu-item"
                      onClick={() => handleALaCarteSelect(option)}
                    >
                      <div className="menu-item-image-container">
                        <img 
                          src={menuItemImages[option] || "/images/menu/placeholder.jpg"}
                          alt={option} 
                          className="menu-item-image" 
                        />
                      </div>
                      <div className="menu-item-name">{option}</div>
                      <div className="menu-item-price">
                        ${selectedCategory.name === "Al a Carts" || selectedCategory.name === "Drinks" 
                          ? (selectedCategory.price * (options.sizeMultipliers?.[selectedSize] || 1)).toFixed(2)
                          : selectedCategory.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Right side order summary section */}
          <div className="order-summary">
            <h3>Your Order</h3>
            
            {/* Current selection summary */}
            {(selectedCategory.name === "Plate" || selectedCategory.name === "Bigger Plate" || selectedCategory.name === "Bowl") && (
              <div className="current-selection">
                <h4>Current Selection</h4>
                <p><strong>Side:</strong> {selectedSide || "None selected"}</p>
                <p><strong>Entrees:</strong> {selectedEntrees.length > 0 ? selectedEntrees.join(", ") : "None selected"}</p>
                {selectedSide && selectedEntrees.length > 0 && (
                  <p><strong>Price:</strong> ${selectedCategory.price.toFixed(2)}</p>
                )}
              </div>
            )}
            
            {/* A La Carte selection summary */}
            {(selectedCategory.name === "Al a Carts" || selectedCategory.name === "Drinks" || selectedCategory.name === "Appetizers") && (
              <div className="current-selection">
                <h4>Current Selection</h4>
                {selectedALaCarteItems.length > 0 ? (
                  <div>
                    <p><strong>Size:</strong> {selectedSize}</p>
                    <ul className="selected-items-list">
                      {selectedALaCarteItems.map((item, index) => (
                        <li key={index}>
                          {item.quantity}x {item.name} - ${(item.price * item.quantity).toFixed(2)}
                        </li>
                      ))}
                    </ul>
                    <p><strong>Subtotal:</strong> ${selectedALaCarteItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</p>
                  </div>
                ) : (
                  <p>No items selected</p>
                )}
              </div>
            )}
            
            {/* Add to order button */}
            <button 
              className={`add-to-order-button ${
                ((selectedCategory.name === "Plate" || selectedCategory.name === "Bigger Plate" || selectedCategory.name === "Bowl") && 
                  (!selectedSide || selectedEntrees.length === 0)) || 
                ((selectedCategory.name === "Al a Carts" || selectedCategory.name === "Drinks" || selectedCategory.name === "Appetizers") && 
                  selectedALaCarteItems.length === 0) 
                ? 'disabled' : ''}`}
              disabled={
                ((selectedCategory.name === "Plate" || selectedCategory.name === "Bigger Plate" || selectedCategory.name === "Bowl") && 
                  (!selectedSide || selectedEntrees.length === 0)) || 
                ((selectedCategory.name === "Al a Carts" || selectedCategory.name === "Drinks" || selectedCategory.name === "Appetizers") && 
                  selectedALaCarteItems.length === 0)
              }
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
                      {item.category === "Plate" || item.category === "Bigger Plate" || item.category === "Bowl" ? (
                        <div>
                          <p>
                            <strong>{item.category}:</strong> {item.side}, {item.entrees.join(", ")}
                          </p>
                          <p className="item-price">${item.price.toFixed(2)}</p>
                        </div>
                      ) : (
                        <div>
                          <p>
                            <strong>{item.size || ""} {item.name || item.item}:</strong>
                            {" "}${(item.price * (item.quantity || 1)).toFixed(2)}
                            {item.quantity > 1 && ` (${item.quantity}x)`}
                          </p>
                        </div>
                      )}
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
    <div className="panda-container">
      <div className="background-image"></div>
      <div className="content-container">
        <h1>Panda Express</h1>
        <p className="tagline">American Chinese Kitchen</p>
        <div className="category-grid">
          {categories.map((category, index) => (
            <button 
              key={index} 
              className="category-button" 
              onClick={() => handleCategoryClick(category)}
            >
              <img src={category.image} alt={category.name} className="category-image" />
              <p className="category-name">{category.name}</p>
              <p className="category-price">${category.price.toFixed(2)}</p>
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

export default PandaExpress;