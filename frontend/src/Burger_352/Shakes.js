import React, { useState, useEffect } from "react";
import "./shakes.css"; 
import vanilla from "./burger352_images/vanilla.jpeg";
import chocolate from "./burger352_images/chocolate.jpeg";
import oreo from "./burger352_images/oreo.jpeg";
import snicker from "./burger352_images/snicker.jpeg";


const categories = [
  { name: "Vanilla Milk Shake", image: vanilla , price:"$4.69" },
  { name: "Chocolate Milk Shake", image:chocolate , price:"$4.69" },
  { name: "Oreo Milk Shake", image: oreo , price:"$5.09" },
  { name: "Snicker Doodle Milk Shake", image: snicker , price:"$5.09" }
];

function Shakes({ cart, addItemToCart }) {

   const [selectedItems, setSelectedItems] = useState([]);
  
    useEffect(() => {
      console.log("Shakes selection updated:", selectedItems);
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
    <div className="shakes-opt-container">
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

export default Shakes;
