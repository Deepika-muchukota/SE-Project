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

function Burger({cart, addItemToCart }) {
  // To store multiple selected items
  const [selectedItems, setSelectedItems] = useState([]);

  // Effect to update cart when selected items change
  useEffect(() => {
    selectedItems.forEach(item => {
      addItemToCart(item, "add"); // Add each selected item to cart
    });

    // Cleanup: remove items from cart when they are deselected
    return () => {
      selectedItems.forEach(item => {
        addItemToCart(item, "remove");
      });
    };
  }, [selectedItems]);

  // Update the selection logic for adding/removing items
  const handleItemClick = (item) => {
    setSelectedItems(prevItems => {
      // If item is already selected, remove it, otherwise add it
      return prevItems.includes(item)
        ? prevItems.filter(i => i !== item)  // Remove item
        : [...prevItems, item];  // Add item
    });
  };

  return (
    <div className="burger-opt-container">
      <div className="overlay"></div> 
      <div className="category-grid">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-button ${selectedItems.includes(category) ? 'selected' : ''}`}
            onClick={() => handleItemClick(category)}
          >
            <img src={category.image} alt={category.name} className="category-image" />
            <p className="category-name">{category.name}<br/> {category.price}</p>
          </button>
        ))}
      </div>
      <button className="confirm-order-btn" onClick={() => {console.log({cart})}}>Confirm Order</button>
    </div>
  );
}

export default Burger;
