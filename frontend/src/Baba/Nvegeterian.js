import React from "react";
import "./vegp.css"; 
import pepperoni from "./Baba_images/pepperoni.jpeg";
import tikka from "./Baba_images/tikka.jpeg";
import bbq from "./Baba_images/bbq.jpeg";
import hawaian from "./Baba_images/hawaian.jpeg";
import meat_feast from "./Baba_images/meat_feast.jpeg";
import bacon from "./Baba_images/bacon.jpeg"


const categories = [
    { name: "Pepperoni", image: pepperoni, price: "$12.99" },
    { name: "Chicken Tikka", image: tikka, price: "$11.99" },
    { name: "BBQ Chicken", image: bbq, price: "$13.49" },
    { name: "Hawaiian", image: hawaian, price: "$12.49" },
    { name: "Meat Feast", image: meat_feast, price: "$13.29" },
    { name: "Sausage & Bacon", image: bacon, price: "$13.99" }
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
