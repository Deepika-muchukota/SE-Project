import React from "react";
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
  { name: "Vanilla Sweet Cream Nitro", image:vanilla_nitro  },
  { name: "Vanilla Oat Milk", image:vanilla_oatmilk },
  { name: "Iced Caffe Latte", image: latte },
  { name: "Iced Caffe Mocha", image: mocha },
  { name: "Iced Matcha Latte", image: matcha_latte },
  { name: "Cold Brew With Milk", image: brew_milk },
  { name: "Iced Coffee With Milk", image: ice_coffee },
  { name: "Iced Flat White", image: flat_white },
  { name: "Pumpkin Spice Latte", image: pumpkin_latte },
  { name: "Iced Shaken Expresso", image: ice_shake },
  { name: "Coffee frappuccino", image: coffee_frappacino },
  { name: "Salted Cramel Brew", image: salted_caramel },
  { name: "Honey Almond milk", image: honey_almondmilk },
  { name: "Caramel Frappuccino", image: caramel },
  { name: "Caramel Macchiato", image: caramel_macchito },
  { name: "Refreshers", image: refreshers },
  { name: "Pumpkin Spice Frappuccino", image: pumpkin_frappacino },
  { name: "Double Choco Chip", image: double_choco_chip },
  { name: "Mango Expresso", image: mango },
  { name: "Java Chip", image: java }
];

function StarBucksDrinks() {
  return (
    <div className="drinks-opt-container">
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

export default StarBucksDrinks;