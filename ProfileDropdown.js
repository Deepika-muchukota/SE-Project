import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ProfileDropdown.css';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { logout, user, deleteAccount } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleViewProfile = () => {
    setIsOpen(false);
    navigate('/profile');
  };

  const handleChangePassword = () => {
    setIsOpen(false);
    navigate('/change-password');
  };

  const handleDeleteProfile = async () => {
    setIsOpen(false);
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await deleteAccount();
        navigate('/signin');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Failed to delete account. Please try again.');
      }
    }
  };

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button 
        className="profile-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="profile-icon">👤</span>
        <span className="profile-name">{user?.name || 'Profile'}</span>
      </button>
      
      {isOpen && (
        <div className="dropdown-menu">
          <button onClick={handleViewProfile} className="dropdown-item">
            View Profile
          </button>
          <button onClick={handleChangePassword} className="dropdown-item">
            Change Password
          </button>
          <button onClick={handleDeleteProfile} className="dropdown-item delete">
            Delete Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown; 