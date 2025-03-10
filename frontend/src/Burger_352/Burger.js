import React, { useState, useEffect, useRef } from "react";
import "./burger_opt.css";
import classic from "./burger352_images/classic.jpg";
import bacon from "./burger352_images/baconjam.jpg";
import cowboy from "./burger352_images/cowboy.jpeg";
import mushroom from "./burger352_images/mushroomswiss.jpeg";
import pizza from "./burger352_images/pizzaburger.jpg";

const categories = [
  { name: "The Classic", image: classic, price: "$8.99" },
  { name: "The Bacon Jam", image: bacon, price: "$9.29" },
  { name: "The CowBoy", image: cowboy, price: "$9.99" },
  { name: "The Mushroom Swiss", image: mushroom, price: "$8.59" },
  { name: "The Pizza burger", image: pizza, price: "$9.49" },
];

function Burger({ cart, addItemToCart }) {
  const [selectedItems, setSelectedItems] = useState({});

  // Add this new useEffect right after defining selectedItems and prevSelectedRef:
useEffect(() => {
  if (Object.keys(cart).length > 0 && Object.keys(selectedItems).length === 0) {
    setSelectedItems(cart);
    prevSelectedRef.current = cart;
  }
}, [cart, selectedItems]);

  // Store the previous selectedItems to compute the delta later.
  const prevSelectedRef = useRef({});

  // useEffect to update the cart whenever selectedItems changes.
  // We use setTimeout(..., 0) so that the effect runs after the render.
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

  // Increase quantity locally.
  const handleSelectItem = (item) => {
    setSelectedItems((prev) => {
      const updated = { ...prev };
      updated[item.name] = (updated[item.name] || 0) + 1;
      return updated;
    });
  };

  // Decrease quantity locally.
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
    <div className="burger-opt-container">
      <table className="burger-table">
        <tbody>
          {categories.reduce((rows, category, index) => {
            if (index % 3 === 0) rows.push([]);
            rows[rows.length - 1].push(category);
            return rows;
          }, []).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((category, colIndex) => (
                <td key={colIndex}>
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
              ))}
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

export default Burger;
