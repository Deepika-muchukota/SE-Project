import React from "react";
import "./baba_pizza.css"; 
import veg from "./Baba_images/vegeterian_images.jpg";
import non_veg from "./Baba_images/non-veg.jpg";

const categories = [
  { name: "Veg Options", image: veg },
  { name: "Non-Veg Options", image:non_veg  },
];

function Babas() {
  return (
    <div className="baba-container">
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

export default Babas;