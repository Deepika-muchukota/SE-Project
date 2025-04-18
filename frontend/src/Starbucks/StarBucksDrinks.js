import React, { useState, useEffect } from "react";
import "./star.css";
import brew_milk from "./starbucks_images/bew&milk.jpeg";
import caramel_macchito from "./starbucks_images/caramel_macchito.jpeg";
import caramel from "./starbucks_images/caramel.jpeg";
import coffee_frappacino from "./starbucks_images/coffee_frappacino.jpeg";
import flat_white from "./starbucks_images/flat_white.jpeg";
import honey_almondmilk from "./starbucks_images/honey_almondmilk.jpeg";
import ice_coffee from "./starbucks_images/ice_coffee.jpeg";
import ice_shake from "./starbucks_images/ice_shake.jpeg";
import java from "./starbucks_images/java.jpeg";
import latte from "./starbucks_images/latte.jpg";
import matcha_latte from "./starbucks_images/matcha_latte.jpeg";
import mocha from "./starbucks_images/mocha.jpeg";
import mango from "./starbucks_images/mango.jpeg";
import pumpkin_latte from "./starbucks_images/pumpkin_lattee.jpeg";
import pumpkin_frappacino from "./starbucks_images/pumpkin_frappacino.jpeg";
import refreshers from "./starbucks_images/refreshers.jpeg";
import salted_caramel from "./starbucks_images/salted_caramel.jpeg";
import vanilla_nitro from "./starbucks_images/vanilla_nitro.jpg";
import vanilla_oatmilk from "./starbucks_images/vanilla_oatmilk.jpeg";
import double_choco_chip from "./starbucks_images/double_choco_chip.jpeg";

const categories = [
  { name: "Vanilla Sweet Cream Nitro", image: vanilla_nitro , price:"$7.89"  },
  { name: "Vanilla Oat Milk", image: vanilla_oatmilk, price: "$6.49" },
  { name: "Iced Caffe Latte", image: latte, price: "$5.29" },
  { name: "Iced Caffe Mocha", image: mocha, price: "$5.79" },
  { name: "Iced Matcha Latte", image: matcha_latte, price: "$6.59" },
  { name: "Cold Brew With Milk", image: brew_milk, price: "$5.99" },
  { name: "Iced Coffee With Milk", image: ice_coffee, price: "$4.99" },
  { name: "Iced Flat White", image: flat_white, price: "$5.89" },
  { name: "Pumpkin Spice Latte", image: pumpkin_latte, price: "$6.29" },
  { name: "Iced Shaken Espresso", image: ice_shake, price: "$5.49" },
  { name: "Coffee Frappuccino", image: coffee_frappacino, price: "$5.99" },
  { name: "Salted Caramel Brew", image: salted_caramel, price: "$6.19" },
  { name: "Honey Almond Milk", image: honey_almondmilk, price: "$5.79" },
  { name: "Caramel Frappuccino", image: caramel, price: "$5.89" },
  { name: "Caramel Macchiato", image: caramel_macchito, price: "$5.69" },
  { name: "Refreshers", image: refreshers, price: "$4.89" },
  { name: "Pumpkin Spice Frappuccino", image: pumpkin_frappacino, price: "$6.49" },
  { name: "Double Choco Chip", image: double_choco_chip, price: "$5.99" },
  { name: "Mango Espresso", image: mango, price: "$5.69" },
  { name: "Java Chip", image: java, price: "$6.29" }
];


function StarBucksDrinks({ cart, addItemToCart }) {

   const [selectedItems, setSelectedItems] = useState([]);
      
        useEffect(() => {
          console.log("Starbucks selection updated:", selectedItems);
        }, [selectedItems]);
      
        const handleItemClick = (item) => {
          if (selectedItems.some(i => i.name === item.name)) {
            setSelectedItems(prev => prev.filter(i => i.name !== item.name));
            addItemToCart(item, "remove");
          } else {
            setSelectedItems(prev => [...prev, item]);
            addItemToCart(item, "add");
          }
        };
      
  return (
    <div className="drinks-opt-container">
      <div className="star-overlay"></div> 
      <div className="star-category-grid">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-button ${cart.some(cartItem => cartItem.name === category.name) ? 'selected' : ''}`}
            onClick={() => handleItemClick(category)}
          >
            <img src={category.image} alt={category.name} className="category-image" />
            <p className="star-category-name">{category.name}<br/>{category.price}</p>
          </button>
        ))}
      </div>
      <button className="confirm-order-btn" onClick={() => console.log(cart)}>Confirm Order</button>
    </div>
  );
}

export default StarBucksDrinks;