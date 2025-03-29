import React, { useState, useEffect, useRef } from "react";
import "./vegp.css"; 
import pepperoni from "./Baba_images/pepperoni.jpeg";
import tikka from "./Baba_images/tikka.jpeg";
import bbq from "./Baba_images/bbq.jpeg";
import hawaian from "./Baba_images/hawaian.jpeg";
import meat_feast from "./Baba_images/meat_feast.jpeg";
import bacon from "./Baba_images/bacon.jpeg"


const categories = [
    { name: "Pepperoni", image: pepperoni, price: "$12.99" },
    { name: "Chicken Tikka", image: tikka, price: "$11.99" },
    { name: "BBQ Chicken", image: bbq, price: "$13.49" },
    { name: "Hawaiian", image: hawaian, price: "$12.49" },
    { name: "Meat Feast", image: meat_feast, price: "$13.29" },
    { name: "Sausage & Bacon", image: bacon, price: "$13.99" }
  ];
  
  

function Nvegeterian({ cart, addItemToCart }) {
  const [selectedItems, setSelectedItems] = useState({});
  const prevSelectedRef = useRef(cart || {}); 
  
  // Define the stall name constant to use throughout the component
  const STALL_NAME = "Baba's Pizza";

  useEffect(() => {
    if (Object.keys(cart).length > 0 && Object.keys(selectedItems).length === 0) {
      setSelectedItems(cart);
      prevSelectedRef.current = cart;
    }
  }, [cart, selectedItems]);
  
  useEffect(() => {
    setTimeout(() => {
      const prev = prevSelectedRef.current;

      // For each item in the current selection, compute the delta.
      Object.keys(selectedItems).forEach((itemName) => {
        const newQty = selectedItems[itemName];
        const oldQty = prev[itemName] || 0;
        const delta = newQty - oldQty;
        const item = categories.find((cat) => cat.name === itemName);
        
        if (delta > 0 && item) {
          // If quantity increased, add the item delta times.
          for (let i = 0; i < delta; i++) {
            // Convert price from string to number by removing $ sign
            const itemWithNumberPrice = {
              ...item,
              price: parseFloat(item.price.replace('$', ''))
            };
            addItemToCart(itemWithNumberPrice, "add", STALL_NAME); // Add stall name
          }
        } else if (delta < 0 && item) {
          // If quantity decreased, remove the item abs(delta) times.
          for (let i = 0; i < -delta; i++) {
            // Convert price from string to number by removing $ sign
            const itemWithNumberPrice = {
              ...item,
              price: parseFloat(item.price.replace('$', ''))
            };
            addItemToCart(itemWithNumberPrice, "remove", STALL_NAME); // Add stall name
          }
        }
      });

      // Also handle items that were completely removed.
      Object.keys(prev).forEach((itemName) => {
        if (!(itemName in selectedItems)) {
          const removedQty = prev[itemName];
          const item = categories.find((cat) => cat.name === itemName);
          if (item) {
            for (let i = 0; i < removedQty; i++) {
              // Convert price from string to number by removing $ sign
              const itemWithNumberPrice = {
                ...item,
                price: parseFloat(item.price.replace('$', ''))
              };
              addItemToCart(itemWithNumberPrice, "remove", STALL_NAME); // Add stall name
            }
          }
        }
      });

      // Update the ref with the current selectedItems.
      prevSelectedRef.current = selectedItems;
    }, 0);
  }, [selectedItems, addItemToCart]);

  const handleSelectItem = (item) => {
    setSelectedItems((prev) => {
      const updated = { ...prev };
      updated[item.name] = (updated[item.name] || 0) + 1;
      return updated;
    });
  };
  
  const handleRemoveItem = (item) => {
    setSelectedItems((prev) => {
      const updated = { ...prev };
      if (updated[item.name] > 1) {
        updated[item.name] -= 1;
      } else {
        delete updated[item.name];
      }
      return updated;
    });
  };

  const handleConfirmOrder = () => {
    alert("Cart has been updated!");
    console.log(cart);
  }

  return (
    <div className="bab-opt-container">
      <div className="bab-grid">
        {categories.map((category, index) => (
          <div key={index} className="bab-grid-item">
            <img
              src={category.image}
              alt={category.name}
              className="bab-category-image"
            />
            <p className="bab-category-name">
              {category.name} - {category.price}
            </p>
            <div className="bab-quantity-controls">
              <button onClick={() => handleRemoveItem(category)}>-</button>
              <span>{selectedItems[category.name] || 0}</span>
              <button onClick={() => handleSelectItem(category)}>+</button>
            </div>
          </div>
        ))}
      </div>
  
      {Object.keys(selectedItems).length > 0 && (
        <button className="confirm-order-button" onClick={handleConfirmOrder}>
        Add to Cart
        </button>
      )}
    </div>
  );
}
    
export default Nvegeterian;