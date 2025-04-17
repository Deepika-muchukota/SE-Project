import React, { createContext, useContext, useState, useEffect } from 'react';

const SubwayOrderContext = createContext();

export const useSubwayOrder = () => useContext(SubwayOrderContext);

export const SubwayOrderProvider = ({ children }) => {
  // State for all order components
  const [selectedBread, setSelectedBread] = useState(null);
  const [selectedProteins, setSelectedProteins] = useState({});
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedSauces, setSelectedSauces] = useState([]);
  const [selectedSides, setSelectedSides] = useState({});
  const [basePrice, setBasePrice] = useState(0);
  const [subwayDrinks, setSubwayDrinks] = useState([]);

  // Load saved state from sessionStorage on mount
  useEffect(() => {
    const loadSavedState = () => {
      try {
        const savedBread = sessionStorage.getItem('selectedBread');
        const savedProteins = sessionStorage.getItem('selectedProteins');
        const savedToppings = sessionStorage.getItem('selectedToppings');
        const savedSauces = sessionStorage.getItem('selectedSauces');
        const savedSides = sessionStorage.getItem('selectedSides');
        const savedBasePrice = sessionStorage.getItem('basePrice');
        const savedSubwayDrinks = sessionStorage.getItem('subwayDrinks');

        if (savedBread) setSelectedBread(JSON.parse(savedBread));
        if (savedProteins) setSelectedProteins(JSON.parse(savedProteins));
        if (savedToppings) setSelectedToppings(JSON.parse(savedToppings));
        if (savedSauces) setSelectedSauces(JSON.parse(savedSauces));
        if (savedSides) setSelectedSides(JSON.parse(savedSides));
        if (savedBasePrice) setBasePrice(parseFloat(savedBasePrice));
        if (savedSubwayDrinks) setSubwayDrinks(JSON.parse(savedSubwayDrinks));
      } catch (error) {
        console.error('Error loading saved subway order state:', error);
      }
    };

    loadSavedState();
  }, []);

  // Helper functions to update state and sessionStorage
  const updateBread = (bread) => {
    setSelectedBread(bread);
    sessionStorage.setItem('selectedBread', JSON.stringify(bread));
  };

  const updateProteins = (proteins) => {
    setSelectedProteins(proteins);
    sessionStorage.setItem('selectedProteins', JSON.stringify(proteins));
  };

  const updateToppings = (toppings) => {
    setSelectedToppings(toppings);
    sessionStorage.setItem('selectedToppings', JSON.stringify(toppings));
  };

  const updateSauces = (sauces) => {
    setSelectedSauces(sauces);
    sessionStorage.setItem('selectedSauces', JSON.stringify(sauces));
  };

  const updateSides = (sides) => {
    setSelectedSides(sides);
    sessionStorage.setItem('selectedSides', JSON.stringify(sides));
  };

  const updateBasePrice = (price) => {
    setBasePrice(price);
    sessionStorage.setItem('basePrice', price.toString());
  };

  const updateSubwayDrinks = (drinks) => {
    setSubwayDrinks(drinks);
    sessionStorage.setItem('subwayDrinks', JSON.stringify(drinks));
  };

  // Clear all selections
  const clearSelections = () => {
    setSelectedBread(null);
    setSelectedProteins({});
    setSelectedToppings([]);
    setSelectedSauces([]);
    setSelectedSides({});
    setBasePrice(0);
    setSubwayDrinks([]);
    
    // Clear from session storage
    sessionStorage.removeItem('selectedBread');
    sessionStorage.removeItem('selectedProteins');
    sessionStorage.removeItem('selectedToppings');
    sessionStorage.removeItem('selectedSauces');
    sessionStorage.removeItem('selectedSides');
    sessionStorage.removeItem('basePrice');
    sessionStorage.removeItem('subwayDrinks');
  };

  // Listen for auth state changes
  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      clearSelections();
    }
  }, [sessionStorage.getItem('user')]);

  const value = {
    selectedBread,
    setSelectedBread,
    selectedProteins,
    setSelectedProteins,
    selectedToppings,
    setSelectedToppings,
    selectedSauces,
    setSelectedSauces,
    selectedSides,
    setSelectedSides,
    basePrice,
    setBasePrice,
    subwayDrinks,
    setSubwayDrinks,
    clearSelections
  };

  return (
    <SubwayOrderContext.Provider value={value}>
      {children}
    </SubwayOrderContext.Provider>
  );
};

export default SubwayOrderContext; 