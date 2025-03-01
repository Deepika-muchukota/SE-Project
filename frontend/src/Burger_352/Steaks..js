import React from "react";
import "./steaks.css"; 
import philly from "./burger352_images/philly.jpeg";
import chicken_philly from "./burger352_images/chicken_philly.jpeg";


const categories = [
  { name: "Philly", image: philly },
  { name: "Chicken Philly", image:chicken_philly  }
];

function Steaks() {
  return (
    <div className="steeak-opt-container">
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

export default Steaks;
