/*
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
    { name: "Starbucks", image: starbucks, color: "#0D7377", path: "/foodstalls/starbucks" },
    { name: "Burger 352", image: burger352, color: "#FFA500", path: "/foodstalls/burger352" },
    { name: "Panda Express", image: pandaExpress, color: "#FF0000", path: "/foodstalls/panda-express" },
    { name: "Subway", image: subway, color: "#5F8D4E", path: "/foodstalls/subway" }, // Updated path
    { name: "Halal Shack", image: halal, color: "#FEFFDE", path: "/foodstalls/halalshack" },
    { name: "Baba's Pizza", image: Baba, color: "#FFD4D4", path: "/foodstalls/baba-pizza" }
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
*/
/*
function FoodStalls() {
  const [foodStalls, setFoodStalls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/foodstalls")
      .then((res) => {
        setFoodStalls(res.data.foodStalls);
      })
      .catch((err) => {
        console.error("Error fetching food stalls:", err);
      });
  }, []);

  return (
    <div className="stalls-container">
      {foodStalls.map((stall) => (
        <div
          key={stall.id}
          className="stall-button"
          style={{ backgroundColor: colorMap[stall.name] || "#f0f0f0" }}
          onClick={() => navigate(`/foodstalls/${stall.id}`)} // use ID in route
        >
          <img src={imageMap[stall.name]} alt={stall.name} className="stall-image" />
          <p className="stall-name">{stall.name}</p>
        </div>
      ))}
    </div>
  );
}

export default FoodStalls;
*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FoodStalls.css";

import starbucks from "./assets/starbucks.jpg";
import burger352 from "./assets/Burger 352.png";
import pandaExpress from "./assets/Panda.jpg";
import subway from "./assets/subway.jpg";
import halal from "./assets/Halal.png";
import Baba from "./assets/Baba's Pizza.png";

// Hardcoded list for matching backend stall names
const stalls = [
  { name: "Starbucks", image: starbucks, color: "#0D7377", path: "/foodstalls/starbucks" },
  { name: "Burger 352", image: burger352, color: "#FFA500", path: "/foodstalls/burger352" },
  { name: "Panda Express", image: pandaExpress, color: "#FF0000", path: "/foodstalls/panda-express" },
  { name: "Subway", image: subway, color: "#5F8D4E", path: "/foodstalls/subway" },
  { name: "Halal Shack", image: halal, color: "#FEFFDE", path: "/foodstalls/halalshack" },
  { name: "Baba's Pizza", image: Baba, color: "#FFD4D4", path: "/foodstalls/baba-pizza" },
];

function FoodStalls() {
  const [foodStalls, setFoodStalls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/foodstalls")
      .then((res) => {
        const apiStalls = res.data.foodstalls || [];
        // Match API stalls with hardcoded list based on name
        const matchedStalls = apiStalls.map(apiStall => {
          const match = stalls.find(s => s.name === apiStall.name);
          return match ? { ...apiStall, ...match } : apiStall;
        });
        setFoodStalls(matchedStalls);
      })
      .catch((err) => {
        console.error("Error fetching food stalls:", err);
        setFoodStalls([]);
      });
  }, []);

  return (
    <div className="stalls-container">
      {foodStalls.length > 0 ? (
        foodStalls.map((stall) => (
          <div
            key={stall.id}
            className="stall-button"
            style={{ backgroundColor: stall.color }}
            onClick={() => navigate(stall.path)}
          >
            <img src={stall.image} alt={stall.name} className="stall-image" />
            <p className="stall-name">{stall.name}</p>
          </div>
        ))
      ) : (
        <p style={{ color: "white", textAlign: "center" }}>
          Loading food stalls or none available.
        </p>
      )}
    </div>
  );
}

export default FoodStalls;
