import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider } from '../context/AuthContext';
import ProfileDropdown from './ProfileDropdown';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

// Mock the useAuth hook
const mockDeleteAccount = jest.fn();
const mockUser = {
  name: 'Test User',
  email: 'test@example.com'
};

jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: mockUser,
    deleteAccount: mockDeleteAccount
  }),
  AuthProvider: ({ children }) => <div>{children}</div>
}));

describe('ProfileDropdown Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    mockNavigate.mockClear();
    mockDeleteAccount.mockClear();
    // Reset window.confirm
    window.confirm = jest.fn();
  });

  test('renders profile button with user name', () => {
    render(<ProfileDropdown />);
    
    const profileButton = screen.getByRole('button', { name: /Test User/i });
    expect(profileButton).toBeTruthy();
  });

  test('shows dropdown menu when profile button is clicked', () => {
    render(<ProfileDropdown />);
    
    const profileButton = screen.getByRole('button', { name: /Test User/i });
    fireEvent.click(profileButton);
    
    expect(screen.getByText('View Profile')).toBeTruthy();
    expect(screen.getByText('Change Password')).toBeTruthy();
    expect(screen.getByText('Delete Profile')).toBeTruthy();
  });

  test('navigates to profile page when View Profile is clicked', () => {
    render(<ProfileDropdown />);
    
    const profileButton = screen.getByRole('button', { name: /Test User/i });
    fireEvent.click(profileButton);
    
    const viewProfileButton = screen.getByText('View Profile');
    fireEvent.click(viewProfileButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/profile');
  });

  test('navigates to change password page when Change Password is clicked', () => {
    render(<ProfileDropdown />);
    
    const profileButton = screen.getByRole('button', { name: /Test User/i });
    fireEvent.click(profileButton);
    
    const changePasswordButton = screen.getByText('Change Password');
    fireEvent.click(changePasswordButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/change-password');
  });

  test('calls deleteAccount when Delete Profile is confirmed', () => {
    window.confirm.mockImplementation(() => true);
    render(<ProfileDropdown />);
    
    const profileButton = screen.getByRole('button', { name: /Test User/i });
    fireEvent.click(profileButton);
    
    const deleteProfileButton = screen.getByText('Delete Profile');
    fireEvent.click(deleteProfileButton);
    
    expect(window.confirm).toHaveBeenCalled();
    expect(mockDeleteAccount).toHaveBeenCalled();
  });

  test('does not call deleteAccount when Delete Profile is cancelled', () => {
    window.confirm.mockImplementation(() => false);
    render(<ProfileDropdown />);
    
    const profileButton = screen.getByRole('button', { name: /Test User/i });
    fireEvent.click(profileButton);
    
    const deleteProfileButton = screen.getByText('Delete Profile');
    fireEvent.click(deleteProfileButton);
    
    expect(window.confirm).toHaveBeenCalled();
    expect(mockDeleteAccount).not.toHaveBeenCalled();
  });

  test('closes dropdown when clicking outside', () => {
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <ProfileDropdown />
      </div>
    );
    
    const profileButton = screen.getByRole('button', { name: /Test User/i });
    fireEvent.click(profileButton);
    
    // Verify dropdown is open
    expect(screen.getByText('View Profile')).toBeTruthy();
    
    // Click outside
    fireEvent.mouseDown(screen.getByTestId('outside'));
    
    // Verify dropdown is closed
    expect(screen.queryByText('View Profile')).toBeFalsy();
  });
}); 