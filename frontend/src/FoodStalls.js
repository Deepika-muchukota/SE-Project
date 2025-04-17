import React, { useEffect } from "react";
import "./FoodStalls.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import starbucks from "./assets/starbucks.jpg";
import burger352 from "./assets/Burger 352.png";
import pandaExpress from "./assets/Panda.jpg";
import subway from "./assets/subway.jpg";
import halal from "./assets/Halal.png";
import Baba from "./assets/Baba's Pizza.png";

const stalls = [
    { name: "Starbucks", image: starbucks, color: "#0D7377", path: "/foodstalls/starbucks" },
    { name: "Burger 352", image: burger352, color: "#FFA500", path: "/foodstalls/burger352" },
    { name: "Panda Express", image: pandaExpress, color: "#FF0000", path: "/foodstalls/pandaexpress" },
    { name: "Subway", image: subway, color: "#5F8D4E", path: "/foodstalls/subway" },
    { name: "Halal Shack", image: halal, color: "#FEFFDE", path: "/foodstalls/halalshack" },
    { name: "Baba's Pizza", image: Baba, color: "#FFD4D4", path: "/foodstalls/babas" }
];

function FoodStalls() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated()) {
    return null;
  }
  
  return (
    <div className="stalls-container">
      <div className="welcome-banner">
        <h1>Welcome, {user?.name || 'Guest'}!</h1>
        <p>Choose from our delicious food stalls</p>
      </div>
      <div className="stalls-grid">
        {stalls.map((stall, index) => (
          <div
            key={index}
            className="stall-button"
            style={{ backgroundColor: stall.color }}
            onClick={() => navigate(stall.path)}
          >
            <div className="stall-image-container">
              <img 
                src={stall.image} 
                alt={stall.name} 
                className="stall-image"
                onError={(e) => {
                  console.error(`Failed to load image for ${stall.name}`);
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  e.target.parentNode.style.backgroundColor = stall.color;
                }}
              />
            </div>
            <p className="stall-name">{stall.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodStalls;