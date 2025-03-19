import React, { useState, useEffect, useRef } from "react";
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

   const [selectedItems, setSelectedItems] = useState({});
  
    const prevSelectedRef = useRef(cart || {}); // Ensure ref starts as an empty object
  
       useEffect(() => {
         if (Object.keys(cart).length > 0 && Object.keys(selectedItems).length === 0) {
           setSelectedItems(cart);
           prevSelectedRef.current = cart;
         }
       }, [cart, selectedItems]);
       
       
       
          useEffect(() => {
             setTimeout(() => {
               const prev = prevSelectedRef.current;
         
               // For each item in the current selection, compute the delta.
               Object.keys(selectedItems).forEach((itemName) => {
                 const newQty = selectedItems[itemName];
                 const oldQty = prev[itemName] || 0;
                 const delta = newQty - oldQty;
                 const item = categories.find((cat) => cat.name === itemName);
                 if (delta > 0) {
                   // If quantity increased, add the item delta times.
                   for (let i = 0; i < delta; i++) {
                     addItemToCart(item, "add");
                   }
                 } else if (delta < 0) {
                   // If quantity decreased, remove the item abs(delta) times.
                   for (let i = 0; i < -delta; i++) {
                     addItemToCart(item, "remove");
                   }
                 }
               });
         
               // Also handle items that were completely removed.
               Object.keys(prev).forEach((itemName) => {
                 if (!(itemName in selectedItems)) {
                   const removedQty = prev[itemName];
                   const item = categories.find((cat) => cat.name === itemName);
                   for (let i = 0; i < removedQty; i++) {
                     addItemToCart(item, "remove");
                   }
                 }
               });
         
               // Update the ref with the current selectedItems.
               prevSelectedRef.current = selectedItems;
             }, 0);
           }, [selectedItems, addItemToCart]);
       
       
           const handleSelectItem = (item) => {
             setSelectedItems((prev) => {
               const updated = { ...prev };
               updated[item.name] = (updated[item.name] || 0) + 1;
               return updated;
             });
           };
           
           const handleRemoveItem = (item) => {
             setSelectedItems((prev) => {
               const updated = { ...prev };
               if (updated[item.name] > 1) {
                 updated[item.name] -= 1;
               } else {
                 delete updated[item.name];
               }
               return updated;
             });
           };
       
         const handleConfirmOrder = () => {
           alert("Cart has been updated!");
           console.log(cart);
         };
       
     
         return (
          <div className="star-opt-container">
            <div className="star-grid">
              {categories.map((category, index) => (
                <div key={index} className="star-grid-item">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="star-category-image"
                  />
                  <p className="star-category-name">
                    {category.name} - {category.price}
                  </p>
                  <div className="star-quantity-controls">
                    <button onClick={() => handleRemoveItem(category)}>-</button>
                    <span>{selectedItems[category.name] || 0}</span>
                    <button onClick={() => handleSelectItem(category)}>+</button>
                  </div>
                </div>
              ))}
            </div>
        
            {Object.keys(selectedItems).length > 0 && (
              <button className="confirm-order-button" onClick={handleConfirmOrder}>
                Confirm Order
              </button>
            )}
          </div>
        );
        
   }
   
   export default StarBucksDrinks;