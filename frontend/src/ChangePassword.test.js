import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChangePassword from './ChangePassword';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

// Mock the useAuth hook
const mockChangePassword = jest.fn();
jest.mock('./context/AuthContext', () => ({
  useAuth: () => ({
    changePassword: mockChangePassword
  })
}));

describe('ChangePassword Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    mockNavigate.mockClear();
    mockChangePassword.mockClear();
  });

  test('renders change password form', () => {
    render(<ChangePassword />);
    
    expect(screen.getByLabelText(/Current Password/i)).toBeTruthy();
    expect(screen.getByLabelText(/New Password/i)).toBeTruthy();
    expect(screen.getByLabelText(/Confirm New Password/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /Change Password/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeTruthy();
  });

  test('shows error when passwords do not match', async () => {
    render(<ChangePassword />);
    
    fireEvent.change(screen.getByLabelText(/Current Password/i), {
      target: { value: 'currentpass' }
    });
    fireEvent.change(screen.getByLabelText(/New Password/i), {
      target: { value: 'newpass123' }
    });
    fireEvent.change(screen.getByLabelText(/Confirm New Password/i), {
      target: { value: 'differentpass123' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /Change Password/i }));
    
    expect(await screen.findByText('New passwords do not match')).toBeTruthy();
    expect(mockChangePassword).not.toHaveBeenCalled();
  });

  test('shows error when new password is too short', async () => {
    render(<ChangePassword />);
    
    fireEvent.change(screen.getByLabelText(/Current Password/i), {
      target: { value: 'currentpass' }
    });
    fireEvent.change(screen.getByLabelText(/New Password/i), {
      target: { value: 'short' }
    });
    fireEvent.change(screen.getByLabelText(/Confirm New Password/i), {
      target: { value: 'short' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /Change Password/i }));
    
    expect(await screen.findByText('New password must be at least 6 characters long')).toBeTruthy();
    expect(mockChangePassword).not.toHaveBeenCalled();
  });

  test('calls changePassword when form is valid', async () => {
    mockChangePassword.mockResolvedValueOnce();
    render(<ChangePassword />);
    
    fireEvent.change(screen.getByLabelText(/Current Password/i), {
      target: { value: 'currentpass' }
    });
    fireEvent.change(screen.getByLabelText(/New Password/i), {
      target: { value: 'newpass123' }
    });
    fireEvent.change(screen.getByLabelText(/Confirm New Password/i), {
      target: { value: 'newpass123' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /Change Password/i }));
    
    await waitFor(() => {
      expect(mockChangePassword).toHaveBeenCalledWith('currentpass', 'newpass123');
    });
    
    expect(await screen.findByText('Password changed successfully!')).toBeTruthy();
    
    // Wait for navigation
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/profile');
    }, { timeout: 2500 });
  });

  test('shows error when password change fails', async () => {
    const errorMessage = 'Failed to change password';
    mockChangePassword.mockRejectedValueOnce(new Error(errorMessage));
    
    render(<ChangePassword />);
    
    fireEvent.change(screen.getByLabelText(/Current Password/i), {
      target: { value: 'currentpass' }
    });
    fireEvent.change(screen.getByLabelText(/New Password/i), {
      target: { value: 'newpass123' }
    });
    fireEvent.change(screen.getByLabelText(/Confirm New Password/i), {
      target: { value: 'newpass123' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /Change Password/i }));
    
    expect(await screen.findByText(errorMessage)).toBeTruthy();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('navigates to profile when cancel is clicked', () => {
    render(<ChangePassword />);
    
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    
    expect(mockNavigate).toHaveBeenCalledWith('/profile');
  });

  test('requires all fields to be filled', () => {
    render(<ChangePassword />);
    
    const submitButton = screen.getByRole('button', { name: /Change Password/i });
    
    // Check that all input fields have the required attribute
    expect(screen.getByLabelText(/Current Password/i)).toHaveAttribute('required');
    expect(screen.getByLabelText(/New Password/i)).toHaveAttribute('required');
    expect(screen.getByLabelText(/Confirm New Password/i)).toHaveAttribute('required');
  });
}); 