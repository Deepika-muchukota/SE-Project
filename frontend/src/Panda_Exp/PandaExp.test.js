import React from 'react';
import { render, screen, waitFor } from '../test-utils';
import { mockCartContext } from '../test-utils';
import PandaExpress from './PandaExpress';
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

describe('PandaExpress Component', () => {
  const mockMenuData = {
    data: {
      foodstalls: [
        { id: 3, name: 'Panda Express' }
      ]
    }
  };

  const mockMenuItems = {
    data: {
      menu: [
        {
          id: 1,
          name: "Orange Chicken",
          price: 9.99,
          description: "Crispy chicken in sweet orange sauce"
        },
        {
          id: 2,
          name: "Chow Mein",
          price: 7.99,
          description: "Stir-fried noodles with vegetables"
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

  test('renders header content correctly', async () => {
    render(<PandaExpress />);
    
    await waitFor(() => {
      expect(screen.getByText('Panda Express')).toBeInTheDocument();
      expect(screen.getByText('American Chinese Kitchen')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('displays all category buttons', async () => {
    render(<PandaExpress />);
    
    await waitFor(() => {
      const expectedCategories = [
        'Plate',
        'Bigger Plate',
        'Bowl',
        'Al a Carts',
        'Drinks',
        'Appetizers'
      ];
      
      expectedCategories.forEach(category => {
        const image = screen.getByRole('img', { name: category });
        expect(image).toBeInTheDocument();
        expect(screen.getByText(category)).toBeInTheDocument();
      });
    }, { timeout: 3000 });
  });

  test('shows correct number of category buttons', async () => {
    render(<PandaExpress />);
    
    await waitFor(() => {
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(6); // Six category buttons
      expect(buttons[0]).toHaveClass('category-button');
    }, { timeout: 3000 });
  });

  test('displays prices for categories', async () => {
    render(<PandaExpress />);
    
    await waitFor(() => {
      expect(screen.getByText('$9.49')).toBeInTheDocument();
      expect(screen.getByText('$11.99')).toBeInTheDocument();
      expect(screen.getByText('$7.99')).toBeInTheDocument();
      expect(screen.getByText('From $4.60')).toBeInTheDocument();
      expect(screen.getByText('From $2.10')).toBeInTheDocument();
      expect(screen.getByText('From $2.00')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('handles API error gracefully', async () => {
    // Mock API error
    axios.get.mockRejectedValueOnce(new Error('API Error'));
    
    render(<PandaExpress />);
    
    // Should still show the basic structure even if API fails
    await waitFor(() => {
      expect(screen.getByText('Panda Express')).toBeInTheDocument();
      expect(screen.getByRole('img', { name: 'Plate' })).toBeInTheDocument();
    }, { timeout: 3000 });
  });
}); 