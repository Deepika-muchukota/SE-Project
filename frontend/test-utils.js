import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock the auth context
const mockAuthContext = {
  isAuthenticated: () => true,
  user: { name: 'Test User' },
  logout: jest.fn()
};

// Mock the cart context
const mockCartContext = {
  cartItems: [],
  getCartTotal: jest.fn(),
  clearCart: jest.fn(),
  getCartItemCount: jest.fn()
};

// Mock the contexts
jest.mock('./context/AuthContext', () => ({
  useAuth: () => mockAuthContext
}));

jest.mock('./context/CartContext', () => ({
  useCart: () => mockCartContext
}));

// Mock the router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' }),
}));

// Custom render function that includes providers
const customRender = (ui, options = {}) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <BrowserRouter>
        {children}
      </BrowserRouter>
    ),
    ...options,
  });
};

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render }; 