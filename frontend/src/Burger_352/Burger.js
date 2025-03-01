import React from "react";
import "./burger_opt.css"; 
import classic from "./burger352_images/classic.jpg";
import bacon from "./burger352_images/baconjam.jpg";
import cowboy from "./burger352_images/cowboy.jpeg";
import mushroom from "./burger352_images/mushroomswiss.jpeg";
import pizza from "./burger352_images/pizzaburger.jpg";

const categories = [
  { name: "The Classic", image: classic },
  { name: "The Bacon Jam", image:bacon  },
  { name: "The CowBoy", image:cowboy },
  { name: "The Mushroom Swiss", image: mushroom },
  { name: "The Pizza burger", image: pizza },
];

function Burger() {
  return (
    <div className="burger-opt-container">
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

export default Burger;
