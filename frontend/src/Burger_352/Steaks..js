import React from "react";
import "./steaks.css"; 
import philly from "./burger352_images/philly.jpeg";
import chicken_philly from "./burger352_images/chicken_philly.jpeg";


const categories = [
  { name: "Philly", image: philly , price: "$10.99" },
  { name: "Chicken Philly", image:chicken_philly , price: "$10.99"  }
];

function Steaks() {
  return (
    <div className="steeak-opt-container">
      <div className="overlay"></div> 
      <div className="category-grid">
        {categories.map((category, index) => (
          <button key={index} className="category-button">
            <img src={category.image} alt={category.name} className="category-image" />
            <p className="category-name">{category.name} <br/> {category.price}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Steaks;
