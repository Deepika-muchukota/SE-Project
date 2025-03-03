import React, { useState, useEffect } from "react";
import "./vegp.css"; 
import cheese from "./Baba_images/cheese.jpeg";
import margherita from "./Baba_images/margherita.jpeg";
import med_veg from "./Baba_images/med_veg.jpeg";
import mushroom from "./Baba_images/mushroom.jpeg";
import supreme from "./Baba_images/supreme.jpeg";
import veggie_lovers from "./Baba_images/veggie_lovers.jpeg"


const categories = [
    { name: "Four Cheese", image: cheese, price:"$12.99" },
    { name: "Margherita", image: margherita, price:"$11.99" },
    { name: "Veggie Supreme", image: supreme, price:"$13.49" },
    { name: "Mushroom & Spinach", image: mushroom, price:"$12.49" },
    { name: "Mediterranean Veggie", image: med_veg, price:"$13.29" },
    { name: "Veggie Lovers", image: veggie_lovers, price:"$13.99" }
  ];
  

function Vegeterian({ cart, addItemToCart }) {

  const [selectedItems, setSelectedItems] = useState([]);
  
    // This useEffect can be used to log or trigger side effects
    useEffect(() => {
      // Here we could perform actions whenever selectedItems change
      console.log("Vegeterian selection updated:", selectedItems);
      // Note: Do NOT include a cleanup that removes items on unmount
    }, [selectedItems]);
  
    const handleItemClick = (item) => {
      if (selectedItems.some(i => i.name === item.name)) {
        // Remove from local state and global cart
        setSelectedItems(prev => prev.filter(i => i.name !== item.name));
        addItemToCart(item, "remove");
      } else {
        // Add to both local state and global cart
        setSelectedItems(prev => [...prev, item]);
        addItemToCart(item, "add");
      }
    };
  
  return (
    <div className="veg-opt-container">
      <div className="overlay"></div> 
      <div className="vcategory-grid">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-button ${cart.some(cartItem => cartItem.name === category.name) ? 'selected' : ''}`}
            onClick={() => handleItemClick(category)}
          >
            <img src={category.image} alt={category.name} className="vcategory-image" />
            <p className="vcategory-name">{category.name}<br/> {category.price}</p>
          </button>
        ))}
      </div>
      <button className="confirm-order-btn" onClick={() => console.log(cart)}>Confirm Order</button>
    </div>
  );
}

export default Vegeterian;
