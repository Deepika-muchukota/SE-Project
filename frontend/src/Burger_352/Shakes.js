import React from "react";
import "./shakes.css"; 
import vanilla from "./burger352_images/vanilla.jpeg";
import chocolate from "./burger352_images/chocolate.jpeg";
import oreo from "./burger352_images/oreo.jpeg";
import snicker from "./burger352_images/snicker.jpeg";


const categories = [
  { name: "Vanilla Milk Shake", image: vanilla },
  { name: "Chocolate Milk Shake", image:chocolate  },
  { name: "Oreo Milk Shake", image: oreo },
  { name: "Snicker Doodle Milk Shake", image: snicker }
];

function Shakes() {
  return (
    <div className="shakes-opt-container">
      <div className="overlay"></div> 
      <div className="category-grid">
        {categories.map((category, index) => (
          <button key={index} className="category-button">
            <img src={category.image} alt={category.name} className="category-image" />
            <p className="category-name">{category.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Shakes;
