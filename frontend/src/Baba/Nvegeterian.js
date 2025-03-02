import React from "react";
import "./vegp.css"; 
import pepperoni from "./Baba_images/pepperoni.jpeg";
import margherita from "./Baba_images/margherita.jpeg";
import med_veg from "./Baba_images/med_veg.jpeg";
import mushroom from "./Baba_images/mushroom.jpeg";
import supreme from "./Baba_images/supreme.jpeg";
import veggie_lovers from "./Baba_images/veggie_lovers.jpeg"


const categories = [
    { name: "Pepperoni", image: pepperoni, price:"$12.99" },
    { name: "Margherita", image: margherita, price:"$11.99" },
    { name: "Veggie Supreme", image: supreme, price:"$13.49" },
    { name: "Mushroom & Spinach", image: mushroom, price:"$12.49" },
    { name: "Mediterranean Veggie", image: med_veg, price:"$13.29" },
    { name: "Veggie Lovers", image: veggie_lovers, price:"$13.99" }
  ];
  

function Nvegeterian() {
  return (
    <div className="veg-opt-container">
      <div className="overlay"></div> 
      <div className="vcategory-grid">
        {categories.map((category, index) => (
          <button key={index} className="vcategory-button" >
            <img src={category.image} alt={category.name} className="vcategory-image" />
            <p className="vcategory-name">{category.name}<br/> {category.price}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Nvegeterian;
