import React from "react";
import "./chicken.css"; 
import strips from "./burger352_images/strips.jpeg";
import wings from "./burger352_images/wings.jpeg";


const categories = [
  { name: "Chicken Strips", image: strips, price:"$10.79" },
  { name: "Chicken Wings", image:wings , price:"$10.99"  }
];

function Chicken() {
  return (
    <div className="chicken-opt-container">
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

export default Chicken;
