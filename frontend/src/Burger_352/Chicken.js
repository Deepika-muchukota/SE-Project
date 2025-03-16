import React, { useState, useEffect, useRef } from "react";
import "./chicken.css";
import strips from "./burger352_images/strips.jpeg";
import wings from "./burger352_images/wings.jpeg";

const categories = [
  { name: "Chicken Strips", image: strips, price: "$10.79" },
  { name: "Chicken Wings", image: wings, price: "$10.99" },
];

function Chicken({ cart={}, addItemToCart }) {

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
    <div className="chicken-opt-container">
      <table className="chicken-table">
        <tbody>
          {categories.map((category, index) => (
            <tr key={index}>
              <td>
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-image"
                />
                <p className="category-name">
                  {category.name} - {category.price}
                </p>
                <div className="quantity-controls">
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
          Confirm Order
        </button>
      )}
    </div>
  );
}

export default Chicken;
