import React from "react";
import "./pandaexp.css"; 
import plate from "./panda_images/plate.jpg";
import bigger_plate from "./panda_images/bigger_plate.jpeg";
import bowl from "./panda_images/bowl.jpeg";
import carts from "./panda_images/carts.jpg";
import drinks from "./panda_images/drinks.jpeg";

const categories = [
  { name: "Plate", image: plate },
  { name: "Bigger Plate", image:bigger_plate  },
  { name: "Bowl", image:bowl },
  { name: "Al a Carts", image: carts },
  { name: "Drinks", image: drinks },
];

function Panda() {
  return (
    <div className="panda-container">
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

export default Panda;
