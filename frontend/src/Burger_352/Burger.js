import React from "react";
import "./burger_opt.css"; 
import classic from "./burger352_images/classic.jpg";
import bacon from "./burger352_images/baconjam.jpg";
import cowboy from "./burger352_images/cowboy.jpeg";
import mushroom from "./burger352_images/mushroomswiss.jpeg";
import pizza from "./burger352_images/pizzaburger.jpg";

const categories = [
  { name: "The Classic", image: classic, price:"$8.99" },
  { name: "The Bacon Jam", image:bacon, price:"$9.29"  },
  { name: "The CowBoy", image:cowboy, price:"$9.99" },
  { name: "The Mushroom Swiss", image: mushroom, price:"$8.59" },
  { name: "The Pizza burger", image: pizza, price:"$9.49" },
];

function Burger() {
  return (
    <div className="burger-opt-container">
      <div className="overlay"></div> 
      <div className="category-grid">
        {categories.map((category, index) => (
          <button key={index} className="category-button">
            <img src={category.image} alt={category.name} className="category-image" />
            <p className="category-name">{category.name}<br/> {category.price}</p>
          </button>
        ))}
      </div>
      
      {/* Confirm Order Button */}
      <button className="confirm-order-btn">Confirm Order</button>

    </div>
  );
}

export default Burger;
