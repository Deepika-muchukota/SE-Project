import React from 'react';
import { render, screen } from './test-utils';
import NavBar from './NavBar';

// Mock the auth context
jest.mock('./context/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: () => true,
    user: { name: 'Test User' }
  })
}));

describe('NavBar Component', () => {
  test('renders navigation elements', () => {
    render(<NavBar />);
    expect(screen.getByText('Welcome to Reitz')).toBeInTheDocument();
    expect(screen.getByText('Finalize Order')).toBeInTheDocument();
    expect(screen.getByText('View Cart')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('renders user name when authenticated', () => {
    render(<NavBar />);
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });
}); 