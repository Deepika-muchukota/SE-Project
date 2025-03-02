import React from "react";
import "./Burger35.css"; 
import burger from "./burger352_images/burger.jpeg";
import steaks from "./burger352_images/steaks.jpeg";
import chicken from "./burger352_images/chicken.jpeg";
import sides from "./burger352_images/sides.jpeg";
import shakes from "./burger352_images/shakes.jpeg";

const categories = [
  { name: "Burgers", image: burger },
  { name: "Cheese Steaks", image:steaks  },
  { name: "Chicken Options", image:chicken },
  { name: "Sides", image: sides },
  { name: "Shakes", image: shakes },
];

function Burger352() {
  return (
    <div className="burger-container">
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

export default Burger352;