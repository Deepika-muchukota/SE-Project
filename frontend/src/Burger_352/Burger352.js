import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Burger35.css";
import burgerImage from "./burger352_images/burger.jpeg";
import chickenImage from "./burger352_images/chicken.jpeg";
import shakesImage from "./burger352_images/shakes.jpeg";
import sidesImage from "./burger352_images/sides.jpeg";
import steakImage from "./burger352_images/steaks.jpeg";
import { useAuth } from "../context/AuthContext";

const categories = [
  { name: "Burgers", image: burgerImage, path: "/foodstalls/burger352/burger" },
  { name: "Chicken", image: chickenImage, path: "/foodstalls/burger352/chicken" },
  { name: "Shakes", image: shakesImage, path: "/foodstalls/burger352/shakes" },
  { name: "Sides", image: sidesImage, path: "/foodstalls/burger352/sides" },
  { name: "Steaks", image: steakImage, path: "/foodstalls/burger352/steaks" }
];

function Burger352() {
  const navigate = useNavigate();
  const { user } = useAuth();

   useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
  }, [user, navigate]);

  // Clear session storage when component unmounts if user is not logged in
  useEffect(() => {
    return () => {
      if (!user) {
        // Clear all Burger 352 related session storage
        sessionStorage.removeItem('burger352_burger_selected_items');
        sessionStorage.removeItem('burger352_chicken_selected_items');
        sessionStorage.removeItem('burger352_shakes_selected_items');
        sessionStorage.removeItem('burger352_sides_selected_items');
        sessionStorage.removeItem('burger352_steaks_selected_items');
      }
    };
  }, [user]);

  const handleCategoryClick = (path) => {
    navigate(path);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="burger-container">
      <div className="overlay"></div>
      <div className="b35-category-grid">
        {categories.map((category, index) => (
          <button
            key={index}
            className="b35-category-button"
            onClick={() => handleCategoryClick(category.path)}
          >
            <img 
              src={category.image} 
              alt={category.name} 
              className="b35-category-image" 
            />
            <p className="b35-category-name">{category.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Burger352;