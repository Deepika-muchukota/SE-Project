import React, { useState, useEffect, useRef } from "react";
import "./shakes.css"; 
import vanilla from "./burger352_images/vanilla.jpeg";
import chocolate from "./burger352_images/chocolate.jpeg";
import oreo from "./burger352_images/oreo.jpeg";
import snicker from "./burger352_images/snicker.jpeg";


const categories = [
  { name: "Vanilla Milk Shake", image: vanilla , price:"$4.69" },
  { name: "Chocolate Milk Shake", image:chocolate , price:"$4.69" },
  { name: "Oreo Milk Shake", image: oreo , price:"$5.09" },
  { name: "Snicker Doodle Milk Shake", image: snicker , price:"$5.09" }
];

function Shakes({ cart={}, addItemToCart }) {
 const [selectedItems, setSelectedItems] = useState({});
 const prevSelectedRef = useRef(cart || {}); // Ensure ref starts as an empty object
 
 // Define the stall name constant to use throughout the component
 const STALL_NAME = "Burger 352";
    
 useEffect(() => {
   if (Object.keys(cart).length > 0 && Object.keys(selectedItems).length === 0) {
     setSelectedItems(cart);
     prevSelectedRef.current = cart;
   }
 }, [cart, selectedItems]);
    
    
 useEffect(() => {
   if (!addItemToCart || typeof addItemToCart !== 'function') {
     console.error("addItemToCart is not a function or is undefined");
     return;
   }
   
   setTimeout(() => {
     try {
       const prev = prevSelectedRef.current;
 
       // For each item in the current selection, compute the delta.
       Object.keys(selectedItems).forEach((itemName) => {
         const newQty = selectedItems[itemName];
         const oldQty = prev[itemName] || 0;
         const delta = newQty - oldQty;
         const item = categories.find((cat) => cat.name === itemName);
         if (delta > 0 && item) {
           // If quantity increased, add the item delta times.
           for (let i = 0; i < delta; i++) {
             // Convert price from string to number by removing $ sign
             const itemWithNumberPrice = {
               ...item,
               price: parseFloat(item.price.replace('$', ''))
             };
             addItemToCart(itemWithNumberPrice, "add", STALL_NAME);
           }
         } else if (delta < 0 && item) {
           // If quantity decreased, remove the item abs(delta) times.
           for (let i = 0; i < -delta; i++) {
             // Convert price from string to number by removing $ sign
             const itemWithNumberPrice = {
               ...item,
               price: parseFloat(item.price.replace('$', ''))
             };
             addItemToCart(itemWithNumberPrice, "remove", STALL_NAME);
           }
         }
       });
 
       // Also handle items that were completely removed.
       Object.keys(prev).forEach((itemName) => {
         if (!(itemName in selectedItems)) {
           const removedQty = prev[itemName];
           const item = categories.find((cat) => cat.name === itemName);
           if (item) {
             for (let i = 0; i < removedQty; i++) {
               // Convert price from string to number by removing $ sign
               const itemWithNumberPrice = {
                 ...item,
                 price: parseFloat(item.price.replace('$', ''))
               };
               addItemToCart(itemWithNumberPrice, "remove", STALL_NAME);
             }
           }
         }
       });
     } catch (error) {
       console.error("Error in useEffect:", error);
     }
 
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
   <div className="shakes-opt-container">
     <table className="shakes-table">
       <tbody>
         {categories.map((category, index) => (
           <tr key={index}>
             <td>
               <img
                 src={category.image}
                 alt={category.name}
                 className="shakes-category-image"
               />
               <p className="shakes-category-name">
                 {category.name} - {category.price}
               </p>
               <div className="shakes-quantity-controls">
                 <button onClick={() => handleRemoveItem(category)}>-</button>
                 <span>{selectedItems[category.name] || 0}</span>
                 <button onClick={() => handleSelectItem(category)}>+</button>
               </div>
             </td>
           </tr>
         ))}
       </tbody>
     </table>

     {Object.keys(selectedItems).length > 0 && (
       <button className="confirm-order-button" onClick={handleConfirmOrder}>
       Add to Cart
       </button>
     )}
   </div>
 );
}

export default Shakes;