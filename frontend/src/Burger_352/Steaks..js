import React, { useState, useEffect } from "react";
import "./steaks.css"; 
import philly from "./burger352_images/philly.jpeg";
import chicken_philly from "./burger352_images/chicken_philly.jpeg";


const categories = [
  { name: "Philly", image: philly , price: "$10.99" },
  { name: "Chicken Philly", image:chicken_philly , price: "$10.99"  }
];

function Steaks({ cart, addItemToCart }) {

  const [selectedItems, setSelectedItems] = useState([]);
      
        useEffect(() => {
          console.log("Steaks selection updated:", selectedItems);
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
    <div className="steeak-opt-container">
      <div className="overlay"></div> 
      <div className="category-grid">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-button ${cart.some(cartItem => cartItem.name === category.name) ? 'selected' : ''}`}
            onClick={() => handleItemClick(category)}
          >
            <img src={category.image} alt={category.name} className="category-image" />
            <p className="category-name">{category.name} <br/> {category.price}</p>
          </button>
        ))}
      </div>
      <button className="confirm-order-btn" onClick={() => console.log(cart)} >Confirm Order</button>
    </div>
  );
}

export default Steaks;
