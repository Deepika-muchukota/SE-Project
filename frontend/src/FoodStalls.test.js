import React from 'react';
import { render, screen } from './test-utils';
import FoodStalls from './FoodStalls';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('FoodStalls Component', () => {
  test('renders welcome banner', () => {
    render(<FoodStalls />);
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/Choose from our delicious food stalls/i)).toBeInTheDocument();
  });

  test('renders food stall buttons', () => {
    render(<FoodStalls />);
    const stallButtons = document.getElementsByClassName('stall-button');
    expect(stallButtons.length).toBeGreaterThan(0);
  });

  test('renders stall names', () => {
    render(<FoodStalls />);
    expect(screen.getByText('Starbucks')).toBeInTheDocument();
    expect(screen.getByText('Burger 352')).toBeInTheDocument();
  });
}); 