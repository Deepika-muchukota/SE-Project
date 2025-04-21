import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import './ProfileDropdown.css';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    navigate('/signin');
  };

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button className="profile-button" onClick={() => setIsOpen(!isOpen)}>
        <FaUserCircle className="profile-icon" />
        <span className="profile-name">{user?.name || 'SE User'}</span>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <strong>{user?.name}</strong><br />
            <small>{user?.email}</small>
          </div>
          <hr className="dropdown-divider" />
          <button className="dropdown-item" onClick={() => handleNavigation('/profile')}>
            My Profile
          </button>
          <button className="dropdown-item" onClick={() => handleNavigation('/change-password')}>
            Change Password
          </button>
          <button className="dropdown-item" onClick={() => handleNavigation('/delete-account')}>
            Delete Account
          </button>
          <hr className="dropdown-divider" />
          <button className="dropdown-item logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
