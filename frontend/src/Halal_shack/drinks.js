import React, { useState, useEffect } from "react";
import "./drinks.css";
import { useNavigate } from "react-router-dom";
import waterImg from "./Halal_img/water.png";
import sodaImg from "./Halal_img/soda.png";
import fantaImg from "./Halal_img/fanta.png";
import spriteImg from "./Halal_img/sprite.png";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const categories = [
  {
    id: "drinks",
    name: "Drinks",
    items: [
      { id: 216, name: "Water", price: 1.99, image: waterImg },
      { id: 217, name: "Soda", price: 2.49, image: sodaImg },
      { id: 218, name: "Fanta", price: 2.49, image: fantaImg },
      { id: 219, name: "Sprite", price: 2.49, image: spriteImg }
    ]
  }
];

function Drinks() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart, removeFromCart, loading: cartLoading } = useCart();
  const [selectedItems, setSelectedItems] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }

    const savedDrinks = sessionStorage.getItem('selectedDrinks');
    if (savedDrinks) {
      try {
        setSelectedItems(JSON.parse(savedDrinks));
      } catch (err) {
        console.error('Error parsing saved drinks:', err);
        setSelectedItems({});
      }
    }

    return () => {
      if (!user) {
        sessionStorage.removeItem('selectedDrinks');
      }
    };
  }, [user, navigate]);

  const increaseQuantity = async (item) => {
    try {
      setLoading(true);
      setError(null);
      
      const cartItem = {
        menu_id: Number(item.id),
        name: `Halal Shack - ${item.name}`,
        price: Number(item.price),
        quantity: (selectedItems[item.id] || 0) + 1
      };

      console.log('Adding to cart:', cartItem);
      const success = await addToCart(cartItem);
      if (success) {
        setSelectedItems(prev => ({
          ...prev,
          [item.id]: (prev[item.id] || 0) + 1
        }));
        sessionStorage.setItem('selectedDrinks', JSON.stringify({
          ...selectedItems,
          [item.id]: (selectedItems[item.id] || 0) + 1
        }));
      } else {
        setError('Failed to add drink to cart');
      }
    } catch (err) {
      setError('Failed to add drink to cart');
      console.error('Error adding to cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const decreaseQuantity = async (item) => {
    if (selectedItems[item.id] > 0) {
      try {
        setLoading(true);
        setError(null);
        
        await removeFromCart(item.id);
        setSelectedItems(prev => ({
          ...prev,
          [item.id]: prev[item.id] - 1
        }));
        sessionStorage.setItem('selectedDrinks', JSON.stringify({
          ...selectedItems,
          [item.id]: selectedItems[item.id] - 1
        }));
      } catch (err) {
        setError('Failed to remove drink from cart');
        console.error('Error removing from cart:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      
      for (const [itemId, quantity] of Object.entries(selectedItems)) {
        if (quantity > 0) {
          const item = categories[0].items.find(i => i.id === Number(itemId));
          if (item) {
            const cartItem = {
              menu_id: Number(item.id),
              name: `Halal Shack - ${item.name}`,
              price: Number(item.price),
              quantity: Number(quantity)
            };
            console.log('Adding to cart:', cartItem);
            const success = await addToCart(cartItem);
            if (!success) {
              throw new Error('Failed to add item to cart');
            }
          }
        }
      }
      
      sessionStorage.removeItem('selectedDrinks');
      navigate('/cart');
    } catch (err) {
      setError('Failed to place order');
      console.error('Error placing order:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="drinks-container">
      <div className="overlay"></div>
      <h1 className="page-title">Select Your Drinks</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="category-grid">
        {categories.map(category => (
          <div key={category.id} className="category-section">
            <h2 className="category-title">{category.name}</h2>
            <div className="items-grid">
              {category.items.map(item => (
                <div key={item.id} className="item-card">
                  <img src={item.image} alt={item.name} className="category-image" />
                  <p className="category-name">{item.name}</p>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => decreaseQuantity(item)}
                      disabled={loading || cartLoading || !selectedItems[item.id]}
                    >
                      -
                    </button>
                    <span className="quantity-display">{selectedItems[item.id] || 0}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => increaseQuantity(item)}
                      disabled={loading || cartLoading}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="order-summary">
        <h3>Selected Drinks</h3>
        {Object.entries(selectedItems).some(([_, quantity]) => quantity > 0) ? (
          <ul className="selected-items">
            {Object.entries(selectedItems).map(([id, quantity]) => {
              const item = categories[0].items.find(i => i.id === Number(id));
              return quantity > 0 && item ? (
                <li key={id} className="selected-item">
                  {item.name} x {quantity}
                </li>
              ) : null;
            })}
          </ul>
        ) : (
          <p>No drinks selected yet.</p>
        )}
      </div>
      
      <div className="navigation-buttons">
        <button
          className="place-order-btn"
          onClick={handlePlaceOrder}
          disabled={loading || cartLoading || Object.values(selectedItems).every(qty => qty === 0)}
        >
          {loading || cartLoading ? 'Processing...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default Drinks;