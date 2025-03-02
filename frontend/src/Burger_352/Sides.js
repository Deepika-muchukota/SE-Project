import React from "react";
import "./sides.css"; 
import fries from "./burger352_images/fries.jpeg";
import sweet_fries from "./burger352_images/sweet_fries.jpeg";
import onion_rings from "./burger352_images/onion_rings.jpeg";

const categories = [
  { name: "Fries", image: fries , price:"$2.49"},
  { name: "sweet_fries", image:sweet_fries , price:"$2.49"  },
  { name: "onion_rings", image: onion_rings , price: "$3.09"}
];

function Sides() {
  return (
    <div className="sides-opt-container">
      <div className="overlay"></div> 
      <div className="category-grid">
        {categories.map((category, index) => (
          <button key={index} className="category-button">
            <img src={category.image} alt={category.name} className="category-image" />
            <p className="category-name">{category.name}<br/>{category.price}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sides;
