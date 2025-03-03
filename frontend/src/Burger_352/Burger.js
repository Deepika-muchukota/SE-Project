import React, { useState, useEffect } from "react";
import "./burger_opt.css"; 
import classic from "./burger352_images/classic.jpg";
import bacon from "./burger352_images/baconjam.jpg";
import cowboy from "./burger352_images/cowboy.jpeg";
import mushroom from "./burger352_images/mushroomswiss.jpeg";
import pizza from "./burger352_images/pizzaburger.jpg";

const categories = [
  { name: "The Classic", image: classic, price:"$8.99" },
  { name: "The Bacon Jam", image: bacon, price:"$9.29"  },
  { name: "The CowBoy", image: cowboy, price:"$9.99" },
  { name: "The Mushroom Swiss", image: mushroom, price:"$8.59" },
  { name: "The Pizza burger", image: pizza, price:"$9.49" },
];

function Burger({ cart, addItemToCart }) {
  const [selectedItems, setSelectedItems] = useState([]);

  // This useEffect can be used to log or trigger side effects
  useEffect(() => {
    // Here we could perform actions whenever selectedItems change
    console.log("Burger selection updated:", selectedItems);
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
    <div className="burger-opt-container">
      <div className="overlay"></div> 
      <div className="category-grid">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-button ${cart.some(cartItem => cartItem.name === category.name) ? 'selected' : ''}`}
            onClick={() => handleItemClick(category)}
          >
            <img src={category.image} alt={category.name} className="category-image" />
            <p className="category-name">{category.name}<br/> {category.price}</p>
          </button>
        ))}
      </div>
      <button className="confirm-order-btn" onClick={() => console.log(cart)}>Confirm Order</button>
    </div>
  );
}

export default Burger;
