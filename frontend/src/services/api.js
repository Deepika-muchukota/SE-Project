import axios from 'axios';

// Base URL for the API
const API_URL = 'http://localhost:5000/api';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Food Stalls API
export const getFoodStalls = async () => {
  try {
    const response = await api.get('/foodstalls');
    return response.data.foodstalls;
  } catch (error) {
    console.error('Error fetching food stalls:', error);
    throw error;
  }
};

// Menu API
export const getFoodMenu = async (stallId) => {
  try {
    const response = await api.get(`/foodstalls/${stallId}/menu`);
    return response.data.menu;
  } catch (error) {
    console.error('Error fetching food menu:', error);
    throw error;
  }
};

export const getAllMenuItems = async () => {
  try {
    const response = await api.get('/all-menu-items');
    return response.data.menuItems;
  } catch (error) {
    console.error('Error fetching all menu items:', error);
    throw error;
  }
};

export const getMenuItemByName = async (name) => {
  try {
    const response = await api.get(`/menu/item/${name}`);
    return response.data.menuItem;
  } catch (error) {
    console.error('Error fetching menu item by name:', error);
    throw error;
  }
};

// Cart API
export const addItemToCart = async (cartItem) => {
  try {
    const response = await api.post('/cart/add', cartItem);
    return response.data;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
};

export const fetchCartItems = async (userId) => {
  try {
    const response = await api.get(`/cart/${userId}`);
    return response.data.cartItems;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

export const deleteItemFromCart = async (userId, menuId) => {
  try {
    // Ensure userId is a number and menuId is a string
    const numericUserId = Number(userId);
    const stringMenuId = String(menuId);
    
    console.log("API deleteItemFromCart - userId:", numericUserId, "type:", typeof numericUserId);
    console.log("API deleteItemFromCart - menuId:", stringMenuId, "type:", typeof stringMenuId);
    
    const response = await api.delete(`/cart/delete/${numericUserId}/${stringMenuId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting item from cart:', error);
    throw error;
  }
};

export const emptyCart = async (userId) => {
  try {
    const response = await api.delete(`/cart/empty/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error emptying cart:', error);
    throw error;
  }
};

// User API
export const signup = async (userData) => {
  try {
    console.log('Sending signup request with data:', userData);
    const response = await api.post('/users/signup', userData);
    console.log('Signup response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const signin = async (credentials) => {
  try {
    console.log('Sending signin request with credentials:', credentials);
    const response = await api.post('/users/signin', credentials);
    console.log('Signin response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const getUserByName = async (username) => {
  try {
    const response = await api.get(`/users?username=${username}`);
    return response.data;
  } catch (error) {
    console.error('Error getting user by name:', error);
    throw error;
  }
};

export default api; 
