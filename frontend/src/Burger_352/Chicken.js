import React from "react";
import "./chicken.css"; 
import strips from "./burger352_images/strips.jpeg";
import wings from "./burger352_images/wings.jpeg";


const categories = [
  { name: "Chicken Strips", image: strips },
  { name: "Chicken Wings", image:wings  }
];

function Chicken() {
  return (
    <div className="chicken-opt-container">
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

export default Chicken;
