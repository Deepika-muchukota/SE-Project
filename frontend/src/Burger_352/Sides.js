import React, { useState, useEffect } from "react";
import "./sides.css"; 
import fries from "./burger352_images/fries.jpeg";
import sweet_fries from "./burger352_images/sweet_fries.jpeg";
import onion_rings from "./burger352_images/onion_rings.jpeg";

const categories = [
  { name: "Fries", image: fries , price:"$2.49"},
  { name: "sweet_fries", image:sweet_fries , price:"$2.49"  },
  { name: "onion_rings", image: onion_rings , price: "$3.09"}
];

function Sides({ cart, addItemToCart }) {

  const [selectedItems, setSelectedItems] = useState([]);
    
      useEffect(() => {
        console.log("Sides selection updated:", selectedItems);
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
    <div className="sides-opt-container">
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

export default Sides;
