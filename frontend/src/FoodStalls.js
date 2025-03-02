import React from "react";
import "./FoodStalls.css";
import { useNavigate } from "react-router-dom";
import starbucks from "./assets/starbucks.jpg";
import burger352 from "./assets/Burger 352.png";
import pandaExpress from "./assets/Panda.jpg";
import subway from "./assets/subway.jpg";
import halal from "./assets/Halal.png";
import Baba from "./assets/Baba's Pizza.png";


const stalls = [
    { name: "Starbucks", image: starbucks, color:"#0D7377", path: "/foodstalls/starbucks"},
    { name: "Burger 352", image: burger352, color:"#FFA500", path: "/foodstalls/burger352"  },
    { name: "Panda Express", image: pandaExpress, color:"#FF0000", path: "/foodstalls/panda-express" },
    { name: "Subway", image: subway, color:"#5F8D4E", path: "/subway" },
    { name: "Halal Shack" , image: halal, color:"#FEFFDE", path: "/halal-shack" },
    { name: "Baba's Pizza" , image: Baba, color:"#FFD4D4", path: "/foodstalls/baba-pizza"}
  ];

  function FoodStalls() {
    const navigate = useNavigate();
    return (
      <div className="stalls-container">
        {stalls.map((stall, index) => (
          <div
            key={index}
            className="stall-button"
            style={{ backgroundColor: stall.color }} 
            onClick={() => navigate(stall.path)}
          >
            <img src={stall.image} alt={stall.name} className="stall-image" />
            <p className="stall-name">{stall.name}</p>
          </div>
        ))}
      </div>
    );
  }
  
  export default FoodStalls;