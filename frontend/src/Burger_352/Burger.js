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

function Burger({ cart = {}, addItemToCart }) {
  const [selectedItems, setSelectedItems] = useState({});
  const prevSelectedRef = useRef(cart || {});
  
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
      const prev = prevSelectedRef.current;
      
      try {
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
                  <div className="b-quantity-controls">
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
          Add to Cart
        </button>
      )}
    </div>
  );  
}

export default Burger;