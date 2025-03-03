import React, { useState, useEffect } from "react";
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

   const [selectedItems, setSelectedItems] = useState([]);
    
      // This useEffect can be used to log or trigger side effects
      useEffect(() => {
        // Here we could perform actions whenever selectedItems changedd .
        console.log("Non-Vegeterian Pizza selection updated:", selectedItems);
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

export default Nvegeterian;
