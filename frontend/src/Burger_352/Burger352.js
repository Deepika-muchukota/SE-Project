import React from "react";
import "./Burger35.css"; 
import { useNavigate } from "react-router-dom";
import burger from "./burger352_images/burger.jpeg";
import steaks from "./burger352_images/steaks.jpeg";
import chicken from "./burger352_images/chicken.jpeg";
import sides from "./burger352_images/sides.jpeg";
import shakes from "./burger352_images/shakes.jpeg";

const categories = [
  { name: "Burgers", image: burger, path: "/foodstalls/burger352/burger" },
  { name: "Cheese Steaks", image:steaks, path:"/foodstalls/burger352/steaks"  },
  { name: "Chicken Options", image:chicken, path:"/foodstalls/burger352/chicken" },
  { name: "Sides", image: sides, path:"/foodstalls/burger352/sides" ,  },
  { name: "Shakes", image: shakes, path:"/foodstalls/burger352/shakes" },
];

function Burger352() {
  const navigate = useNavigate();
  return (
    <div className="burger-container">
      <div className="overlay"></div> 
      <div className="b35-category-grid">
        {categories.map((category, index) => (
          <button key={index} className="b35-category-button" onClick={() => navigate(category.path)}>
            <img src={category.image} alt={category.name} className="b35-category-image" />
            <p className="b35-category-name">{category.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Burger352;