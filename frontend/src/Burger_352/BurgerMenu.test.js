import React from 'react';
import { render, screen, waitFor } from '../test-utils';
import { mockCartContext } from '../test-utils';
import Burger352 from './Burger352';
import axios from 'axios';

// Mock axios
jest.mock('axios');

// Mock sessionStorage
const mockSessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
Object.defineProperty(window, 'sessionStorage', { value: mockSessionStorage });

describe('Burger352 Component', () => {
  const mockMenuData = {
    data: {
      foodstalls: [
        { id: 2, name: 'Burger 352' }
      ]
    }
  };

  const mockMenuItems = {
    data: {
      menu: [
        {
          id: 1,
          name: "Classic Burger",
          price: 8.99,
          description: "Beef patty with lettuce, tomato, and cheese"
        },
        {
          id: 2,
          name: "Chicken Sandwich",
          price: 7.99,
          description: "Grilled chicken with special sauce"
        }
      ]
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockSessionStorage.getItem.mockReturnValue(null);
    axios.get.mockImplementation((url) => {
      if (url.includes('/api/foodstalls') && !url.includes('/menu')) {
        return Promise.resolve(mockMenuData);
      }
      if (url.includes('/menu')) {
        return Promise.resolve(mockMenuItems);
      }
      return Promise.reject(new Error('Not found'));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders category grid correctly', async () => {
    render(<Burger352 />);
    
    await waitFor(() => {
      expect(screen.getByRole('img', { name: /burgers/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /chicken/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /shakes/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /sides/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /steaks/i })).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('displays category names', async () => {
    render(<Burger352 />);
    
    await waitFor(() => {
      const categoryNames = ['Burgers', 'Chicken', 'Shakes', 'Sides', 'Steaks'];
      categoryNames.forEach(name => {
        expect(screen.getByText(name)).toBeInTheDocument();
      });
    }, { timeout: 3000 });
  });

  test('shows category buttons', async () => {
    render(<Burger352 />);
    
    await waitFor(() => {
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(5); // Five category buttons
      expect(buttons[0]).toHaveClass('b35-category-button');
    }, { timeout: 3000 });
  });

  test('handles API error gracefully', async () => {
    // Mock API error
    axios.get.mockRejectedValueOnce(new Error('API Error'));
    
    render(<Burger352 />);
    
    // Should still show the category grid even if API fails
    await waitFor(() => {
      const categoryGrid = screen.getByRole('img', { name: /burgers/i });
      expect(categoryGrid).toBeInTheDocument();
    }, { timeout: 3000 });
  });
}); 