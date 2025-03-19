import React, { useState, useEffect, useRef } from "react";
import "./vegp.css"; 
import cheese from "./Baba_images/cheese.jpeg";
import margherita from "./Baba_images/margherita.jpeg";
import med_veg from "./Baba_images/med_veg.jpeg";
import mushroom from "./Baba_images/mushroom.jpeg";
import supreme from "./Baba_images/supreme.jpeg";
import veggie_lovers from "./Baba_images/veggie_lovers.jpeg"


const categories = [
    { name: "Four Cheese", image: cheese, price:"$12.99" },
    { name: "Margherita", image: margherita, price:"$11.99" },
    { name: "Veggie Supreme", image: supreme, price:"$13.49" },
    { name: "Mushroom & Spinach", image: mushroom, price:"$12.49" },
    { name: "Mediterranean Veggie", image: med_veg, price:"$13.29" },
    { name: "Veggie Lovers", image: veggie_lovers, price:"$13.99" }
  ];
  

function Vegeterian({ cart, addItemToCart }) {

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
            <div className="bab-opt-container">
              <div className="bab-grid">
                {categories.map((category, index) => (
                  <div key={index} className="bab-grid-item">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="bab-category-image"
                    />
                    <p className="bab-category-name">
                      {category.name} - {category.price}
                    </p>
                    <div className="bab-quantity-controls">
                      <button onClick={() => handleRemoveItem(category)}>-</button>
                      <span>{selectedItems[category.name] || 0}</span>
                      <button onClick={() => handleSelectItem(category)}>+</button>
                    </div>
                  </div>
                ))}
              </div>
          
              {Object.keys(selectedItems).length > 0 && (
                <button className="confirm-order-button" onClick={handleConfirmOrder}>
                Add to Cart
                </button>
              )}
            </div>
          );
          
     }
     
     export default Vegeterian;
