import React from "react";
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

function Shakes() {
  return (
    <div className="shakes-opt-container">
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

export default Shakes;
