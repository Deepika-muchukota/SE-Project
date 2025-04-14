import React, { useState, useEffect } from "react";
import "./drinks.css";
import { useNavigate, useLocation } from "react-router-dom";

// Import drink images - update paths as needed
import waterImg from "./subway_img/water.png"; // Add this image to your project
import sodaImg from "./subway_img/coke.png";  // You already have this
import fantaImg from "./subway_img/fanta.png"; // Add this image to your project
import spriteImg from "./subway_img/sprite.png"; // Add this image to your project

function Drinks({ cart = [], addOrderToCart, addItemToCart }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [itemQuantities, setItemQuantities] = useState({});
  const [order, setOrder] = useState(null);
  const [isDirectDrinkOrder, setIsDirectDrinkOrder] = useState(false);
  
  // Define the stall name constant to use throughout the component
  const STALL_NAME = "Subway";
  
  // Updated drink options with images
  const categories = [
    { name: "Water", price: 1.99, image: waterImg },
    { name: "Soda", price: 2.49, image: sodaImg },
    { name: "Fanta", price: 2.49, image: fantaImg },
    { name: "Sprite", price: 2.49, image: spriteImg }
  ];
  
  // Helper function to create a detailed sandwich description
  function createSandwichDescription(bread, proteins, toppings, sauces, sides, drinks) {
    let description = [];
    
    // Add bread
    if (bread) {
      description.push(`${bread.name} bread`);
    }
    
    // Add proteins
    if (Object.keys(proteins).length > 0) {
      const proteinStr = Object.entries(proteins)
        .map(([name, qty]) => `${name}${qty > 1 ? ` x${qty}` : ""}`)
        .join(", ");
      description.push(`Proteins: ${proteinStr}`);
    }
    
    // Add toppings
    if (toppings && toppings.length > 0) {
      description.push(`Toppings: ${toppings.join(", ")}`);
    }
    
    // Add sauces
    if (sauces && sauces.length > 0) {
      description.push(`Sauces: ${sauces.join(", ")}`);
    }
    
    // Add sides
    if (Object.keys(sides).length > 0) {
      const sidesStr = Object.entries(sides)
        .map(([name, details]) => `${name} x${details.quantity}`)
        .join(", ");
      description.push(`Sides: ${sidesStr}`);
    }
    
    // Add drinks
    if (Object.keys(drinks).length > 0) {
      const drinksStr = Object.entries(drinks)
        .map(([name, qty]) => `${name} x${qty}`)
        .join(", ");
      description.push(`Drinks: ${drinksStr}`);
    }
    
    return description.join(", ");
  }
  
  // Load previously selected items from sessionStorage
  useEffect(() => {
    // Check if there's a bread selection to determine if this is part of a meal
    const breadJson = sessionStorage.getItem('selectedBread');
    const proteinsJson = sessionStorage.getItem('selectedProteins');
    const toppingsJson = sessionStorage.getItem('selectedToppings');
    const saucesJson = sessionStorage.getItem('selectedSauces');
    const sidesJson = sessionStorage.getItem('selectedSides');
    
    // Check if we came directly from the main subway menu
    const directDrinkOrder = location.state?.directDrinkOrder || false;
    
    // Create a complete order object from session storage
    if (breadJson || proteinsJson) {
      const orderData = {
        bread: breadJson ? JSON.parse(breadJson) : null,
        proteins: proteinsJson ? JSON.parse(proteinsJson) : {},
        toppings: toppingsJson ? JSON.parse(toppingsJson) : [],
        sauces: saucesJson ? JSON.parse(saucesJson) : [],
        sides: sidesJson ? JSON.parse(sidesJson) : {}
      };
      
      setOrder(orderData);
      setIsDirectDrinkOrder(false);
    } else {
      // No existing order means this is likely a direct drink order
      setIsDirectDrinkOrder(directDrinkOrder || true);
    }
    
    // Load any previously selected drinks from sessionStorage
    const savedDrinks = sessionStorage.getItem('subwayDrinks');
    if (savedDrinks) {
      setItemQuantities(JSON.parse(savedDrinks));
    }
  }, [location]);
  
  const increaseQuantity = (item) => {
    setItemQuantities(prev => {
      const updated = {
        ...prev,
        [item.name]: (prev[item.name] || 0) + 1
      };
      // Save to sessionStorage
      sessionStorage.setItem('subwayDrinks', JSON.stringify(updated));
      return updated;
    });
  };

  const decreaseQuantity = (item) => {
    if (!itemQuantities[item.name] || itemQuantities[item.name] <= 0) return;
    
    setItemQuantities(prev => {
      const updated = { ...prev };
      updated[item.name] = prev[item.name] - 1;
      
      if (updated[item.name] <= 0) {
        delete updated[item.name];
      }
      
      // Save to sessionStorage
      sessionStorage.setItem('subwayDrinks', JSON.stringify(updated));
      return updated;
    });
  };

  // Calculate subtotal for drinks
  const drinksSubtotal = Object.entries(itemQuantities).reduce((total, [name, quantity]) => {
    const item = categories.find(cat => cat.name === name);
    return total + (item ? item.price * quantity : 0);
  }, 0);

  // Calculate total based on whether this is a direct drink order or part of a meal
  let total = 0;
  
  if (isDirectDrinkOrder) {
    // If direct drink order, total is just the drinks
    total = drinksSubtotal;
  } else {
    // Otherwise, include the meal components
    // Add bread price
    const basePrice = parseFloat(sessionStorage.getItem('basePrice') || 0);
    total += basePrice;
    
    // Add protein prices
    const proteinsJson = sessionStorage.getItem('selectedProteins');
    if (proteinsJson) {
      const proteins = JSON.parse(proteinsJson);
      Object.entries(proteins).forEach(([name, quantity]) => {
        // You'll need to have the protein prices here or fetch them
        switch (name) {
          case "Turkey":
            total += 5.99 * quantity;
            break;
          case "Ham":
            total += 5.49 * quantity;
            break;
          case "Tuna":
            total += 5.99 * quantity;
            break;
          case "Veggie Delite":
            total += 4.99 * quantity;
            break;
          default:
            // Default case for unknown proteins
            break;
        }
      });
    }
    
    // Add sides prices
    const sidesJson = sessionStorage.getItem('selectedSides');
    if (sidesJson) {
      const sides = JSON.parse(sidesJson);
      Object.entries(sides).forEach(([name, details]) => {
        total += details.price * details.quantity;
      });
    }
    
    // Add drinks prices
    total += drinksSubtotal;
  }

  // Handle place order
  const handlePlaceOrder = () => {
    if (isDirectDrinkOrder) {
      // Handle direct drink order
      if (Object.keys(itemQuantities).length > 0) {
        // Add each drink as a separate item with the specific name
        Object.entries(itemQuantities).forEach(([name, quantity]) => {
          const item = categories.find(cat => cat.name === name);
          if (item && quantity > 0) {
            // Create a drink item with specific name
            const drinkItem = {
              name: name, // Use the specific drink name (Water, Soda, Fanta, Sprite)
              price: item.price * quantity,
              orderType: "Drink", // Changed from "Drinks" to "Drink" to match format
              quantity: quantity,
              description: `${name} drink` // Simple description
            };
            
            // Add to cart with specific drink name
            addItemToCart(drinkItem, "add", STALL_NAME);
          }
        });
        
        // Clear session storage for drinks
        sessionStorage.removeItem('subwayDrinks');
        
        alert(`Items added to cart! Total: $${drinksSubtotal.toFixed(2)}`);
        navigate("/foodstalls");
      } else {
        alert("Please select at least one drink.");
      }
    } else {
      // Handle as part of a meal order
      // Get data from session storage
      const breadJson = sessionStorage.getItem('selectedBread');
      const bread = breadJson ? JSON.parse(breadJson) : null;
      
      const proteinsJson = sessionStorage.getItem('selectedProteins');
      const proteins = proteinsJson ? JSON.parse(proteinsJson) : {};
      
      const toppingsJson = sessionStorage.getItem('selectedToppings');
      const toppings = toppingsJson ? JSON.parse(toppingsJson) : [];
      
      const saucesJson = sessionStorage.getItem('selectedSauces');
      const sauces = saucesJson ? JSON.parse(saucesJson) : [];
      
      const sidesJson = sessionStorage.getItem('selectedSides');
      const sides = sidesJson ? JSON.parse(sidesJson) : {};
      
      // Create a detailed description for the cart
      const sandwichDescription = createSandwichDescription(
        bread, 
        proteins, 
        toppings, 
        sauces, 
        sides, 
        itemQuantities
      );
      
      // Create a simple sandwich item with a detailed description
      const sandwichItem = {
        name: "Sandwich",
        price: total,
        orderType: "Sandwich",
        description: sandwichDescription
      };
      
      // Add to cart
      addItemToCart(sandwichItem, "add", STALL_NAME);
      
      // Clear session storage
      sessionStorage.removeItem('selectedBread');
      sessionStorage.removeItem('basePrice');
      sessionStorage.removeItem('selectedProteins');
      sessionStorage.removeItem('selectedToppings');
      sessionStorage.removeItem('selectedSauces');
      sessionStorage.removeItem('selectedSides');
      sessionStorage.removeItem('subwayOrder');
      sessionStorage.removeItem('subwayDrinks');
      
      alert(`Thank you for your order! Total: $${total.toFixed(2)}`);
      navigate("/foodstalls");
    }
  };

  return (
    <div className="drinks-container">
      <div className="overlay"></div> 
      <h2 className="page-title">Add Drinks</h2>
      
      <div className="category-grid">
        {categories.map((category, index) => (
          <div key={index} className="item-card">
            {category.image ? (
              <img 
                src={category.image} 
                alt={category.name} 
                className="category-image"
              />
            ) : (
              <div className="placeholder-image" style={{
                width: '100px', 
                height: '100px', 
                background: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 10px auto',
                borderRadius: '5px'
              }}>
                {category.name}
              </div>
            )}
            <p className="category-name">{category.name}</p>
            <p className="item-price">${category.price.toFixed(2)}</p>
            
            <div className="quantity-controls">
              <button 
                className={`quantity-btn decrease ${!itemQuantities[category.name] ? 'disabled' : ''}`}
                onClick={() => decreaseQuantity(category)}
                disabled={!itemQuantities[category.name]}
              >
                -
              </button>
              <span className="quantity-display">
                {itemQuantities[category.name] || 0}
              </span>
              <button 
                className="quantity-btn increase"
                onClick={() => increaseQuantity(category)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="order-summary">
        <h3 className="order-summary-title">Drinks Selection</h3>
        {Object.keys(itemQuantities).length > 0 ? (
          <>
            <ul className="selected-items">
              {Object.entries(itemQuantities).map(([name, quantity]) => (
                <li key={name} className="selected-item">
                  {name} x{quantity} - ${(categories.find(cat => cat.name === name)?.price * quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="subtotal">Subtotal: ${drinksSubtotal.toFixed(2)}</p>
          </>
        ) : (
          <p>No drinks selected yet.</p>
        )}
      </div>
      
      {!isDirectDrinkOrder && order && (
        <div className="complete-order-summary">
          <h3 className="order-summary-title">Complete Order Summary</h3>
          <div className="order-details">
            {/* Sandwich Type Section */}
            <div className="order-section">
              <h4 className="section-title">Sandwich</h4>
              <p>Base Price - ${parseFloat(sessionStorage.getItem('basePrice') || 0).toFixed(2)}</p>
            </div>
            
            {/* Bread Section */}
            <div className="order-section">
              <h4 className="section-title">Bread</h4>
              {order.bread ? (
                <p>{order.bread.name} {order.bread.price > 0 ? `- $${order.bread.price.toFixed(2)}` : '(Included)'}</p>
              ) : (
                <p>No bread selected</p>
              )}
            </div>
            
            {/* Protein Section */}
            <div className="order-section">
              <h4 className="section-title">Proteins</h4>
              {Object.keys(order.proteins).length > 0 ? (
                <ul className="order-list">
                  {Object.entries(order.proteins).map(([name, quantity]) => {
                    let price = 0;
                    switch (name) {
                      case "Turkey": price = 5.99; break;
                      case "Ham": price = 5.49; break;
                      case "Tuna": price = 5.99; break;
                      case "Veggie Delite": price = 4.99; break;
                      default: break;
                    }
                    return (
                      <li key={name}>
                        {name} x{quantity} - ${(price * quantity).toFixed(2)}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p>No proteins selected</p>
              )}
            </div>
            
            {/* Toppings Section */}
            <div className="order-section">
              <h4 className="section-title">Toppings</h4>
              {order.toppings && order.toppings.length > 0 ? (
                <div>
                  {order.toppings.join(', ')} (Free)
                </div>
              ) : (
                <p>No toppings selected</p>
              )}
            </div>
            
            {/* Sauces Section */}
            <div className="order-section">
              <h4 className="section-title">Sauces</h4>
              {order.sauces && order.sauces.length > 0 ? (
                <div>
                  {order.sauces.join(', ')} (Free)
                </div>
              ) : (
                <p>No sauces selected</p>
              )}
            </div>
            
            {/* Sides Section */}
            <div className="order-section">
              <h4 className="section-title">Sides</h4>
              {order.sides && Object.keys(order.sides).length > 0 ? (
                <ul className="order-list">
                  {Object.entries(order.sides).map(([name, details]) => (
                    <li key={name}>
                      {name} x{details.quantity} - ${(details.price * details.quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No sides selected</p>
              )}
            </div>
            
            {/* Drinks Section */}
            <div className="order-section">
              <h4 className="section-title">Drinks</h4>
              {Object.keys(itemQuantities).length > 0 ? (
                <ul className="order-list">
                  {Object.entries(itemQuantities).map(([name, quantity]) => (
                    <li key={name}>
                      {name} x{quantity} - ${(categories.find(cat => cat.name === name)?.price * quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No drinks selected</p>
              )}
            </div>
          </div>
          
          <div className="order-total">
            <p>Total: <strong>${total.toFixed(2)}</strong></p>
          </div>
        </div>
      )}
      
      <div className="navigation-buttons">
        {!isDirectDrinkOrder ? (
          <button 
            className="back-btn"
            onClick={() => navigate("/foodstalls/subway/sides")}
          >
            Back to Sides
          </button>
        ) : (
          <button 
            className="back-btn"
            onClick={() => navigate("/foodstalls/subway")}
          >
            Back to Menu
          </button>
        )}
        <button 
          className="place-order-btn"
          onClick={handlePlaceOrder}
          disabled={Object.keys(itemQuantities).length === 0}
        >
          Place Order (${total.toFixed(2)})
        </button>
      </div>
    </div>
  );
}

export default Drinks;