import React, { useState, useEffect } from "react";
import "./chicken.css"; 
import strips from "./burger352_images/strips.jpeg";
import wings from "./burger352_images/wings.jpeg";

const categories = [
  { name: "Chicken Strips", image: strips, price:"$10.79" },
  { name: "Chicken Wings", image: wings, price:"$10.99"  }
];

function Chicken({ cart, addItemToCart }) {
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    console.log("Chicken selection updated:", selectedItems);
  }, [selectedItems]);

  const handleItemClick = (item) => {
    if (selectedItems.some(i => i.name === item.name)) {
      setSelectedItems(prev => prev.filter(i => i.name !== item.name));
      addItemToCart(item, "remove");
    } else {
      setSelectedItems(prev => [...prev, item]);
      addItemToCart(item, "add");
    }
  };

  return (
    <div className="chicken-opt-container">
      <div className="overlay"></div> 
      <div className="category-grid">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-button ${cart.some(cartItem => cartItem.name === category.name) ? 'selected' : ''}`}
            onClick={() => handleItemClick(category)}
          >
            <img src={category.image} alt={category.name} className="category-image" />
            <p className="category-name">{category.name}<br/>{category.price}</p>
          </button>
        ))}
      </div>
      <button className="confirm-order-btn" onClick={() => console.log(cart)}>Confirm Order</button>
    </div>
  );
}

export default Chicken;
