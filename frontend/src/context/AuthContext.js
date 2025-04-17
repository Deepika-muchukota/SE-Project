import React, { createContext, useState, useContext, useEffect } from 'react';
import { signin, signup, getUserByName } from '../services/api';

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Check if user is logged in on component mount
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        // Check if user data exists in localStorage or sessionStorage
        const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
        
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          console.log("User loaded from storage:", userData);
        }
      } catch (err) {
        console.error('Error checking login status:', err);
      } finally {
        setLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);
  
  // Sign in function
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("Attempting to login with:", { ...credentials, password: '[HIDDEN]' });
      const response = await signin(credentials);
      console.log("Login response:", response);
      
      if (response && response.user) {
        // Store user data in both localStorage and sessionStorage
        localStorage.setItem('user', JSON.stringify(response.user));
        sessionStorage.setItem('user', JSON.stringify(response.user));
        
        setUser(response.user);
        console.log("User set in context:", response.user);
        return true;
      } else {
        console.error("Login response missing user data:", response);
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err.response?.data?.error || err.message || 'Failed to sign in';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Sign up function
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("Attempting to register with:", { ...userData, password: '[HIDDEN]' });
      
      // Validate required fields
      const requiredFields = ['name', 'email', 'phone', 'password'];
      const missingFields = requiredFields.filter(field => !userData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }
      
      const response = await signup(userData);
      console.log("Register response:", response);
      
      if (response && response.message === "User created successfully!" && response.user) {
        console.log("Registration successful:", response.user);
        return true;
      } else {
        console.error("Invalid registration response:", response);
        throw new Error(response?.error || "Registration failed: Invalid response from server");
      }
    } catch (err) {
      console.error("Registration error:", err);
      const errorMessage = err.response?.data?.error || err.message || 'Failed to sign up';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    
    // Clear all Subway order selections
    sessionStorage.removeItem('selectedBread');
    sessionStorage.removeItem('selectedProteins');
    sessionStorage.removeItem('selectedToppings');
    sessionStorage.removeItem('selectedSauces');
    sessionStorage.removeItem('selectedSides');
    sessionStorage.removeItem('basePrice');
    sessionStorage.removeItem('subwayDrinks');
    
    // Clear all Halal Shack order selections
    sessionStorage.removeItem('mealType');
    sessionStorage.removeItem('selectedBase');
    sessionStorage.removeItem('selectedProtein');
    sessionStorage.removeItem('selectedToppings');
    sessionStorage.removeItem('selectedSauces');
    sessionStorage.removeItem('selectedDrinks');
    sessionStorage.removeItem('halalShackOrder');
    sessionStorage.removeItem('halalShackDrinks');
    
    // Clear all Baba's Pizza order selections
    sessionStorage.removeItem('babas_veg_selected_items');
    sessionStorage.removeItem('babas_nveg_selected_items');

    // Clear all Burger 352 order selections
    sessionStorage.removeItem('burger352_burger_selected_items');
    sessionStorage.removeItem('burger352_chicken_selected_items');
    sessionStorage.removeItem('burger352_shakes_selected_items');
    sessionStorage.removeItem('burger352_sides_selected_items');
    sessionStorage.removeItem('burger352_steaks_selected_items');
    
    // Clear all Panda Express order selections
    sessionStorage.removeItem('panda_plate_selected_items');
    sessionStorage.removeItem('panda_bigger_plate_selected_items');
    sessionStorage.removeItem('panda_bowl_selected_items');
    sessionStorage.removeItem('panda_ala_carte_selected_items');
    sessionStorage.removeItem('panda_drinks_selected_items');
    sessionStorage.removeItem('panda_appetizers_selected_items');
    
    console.log('User logged out and all selections cleared');
  };
  
  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user;
  };
  
  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      login,
      register,
      logout,
      isAuthenticated
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 