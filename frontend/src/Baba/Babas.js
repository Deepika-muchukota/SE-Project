import React from "react";
import "./baba_pizza.css"; 
import veg from "./Baba_images/vegeterian_images.jpg";
import non_veg from "./Baba_images/non-veg.jpg";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Veg Options", image: veg, path:'/foodstalls/Babas/ve' },
  { name: "Non-Veg Options", image:non_veg, path: '/foodstalls/Babas/nve' },
];

function Babas() {
  const navigate = useNavigate();
  return (
    <div className="baba-container">
      <div className="overlay"></div> 
      <div className="category-grid">
        {categories.map((category, index) => (
          <button key={index} className="category-button" onClick={() => navigate(category.path)}>
            <img src={category.image} alt={category.name} className="category-image" />
            <p className="category-name">{category.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Babas;