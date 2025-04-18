import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfileDropdown = ({ userEmail, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Handle clicking outside to close dropdown
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

  const handleDeleteProfile = async () => {
    // Show confirmation dialog
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      try {
        // Make API call to delete user profile
        await axios.delete('http://localhost:3500/auth/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        
        // Clear local storage and redirect to sign in
        localStorage.removeItem('authToken');
        onLogout();
        navigate('/signin');
      } catch (error) {
        console.error('Error deleting profile:', error);
        alert('Failed to delete profile. Please try again.');
      }
    }
  };

  return (
    <div className="profile-dropdown" ref={dropdownRef} style={styles.container}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        style={styles.profileButton}
      >
        <i className="fa fa-user-circle" style={styles.icon}></i>
        <span style={styles.email}>{userEmail || 'User'}</span>
        <i className={`fa fa-chevron-${isOpen ? 'up' : 'down'}`} style={styles.chevron}></i>
      </button>
      
      {isOpen && (
        <div style={styles.dropdown}>
          <div style={styles.dropdownItem}>
            <Link to="/profile" style={styles.dropdownLink}>
              <i className="fa fa-user" style={styles.menuIcon}></i> View Profile
            </Link>
          </div>
          <div style={styles.dropdownItem}>
            <Link to="/change-password" style={styles.dropdownLink}>
              <i className="fa fa-key" style={styles.menuIcon}></i> Change Password
            </Link>
          </div>
          <div style={styles.dropdownItem}>
            <button 
              onClick={handleDeleteProfile}
              style={{...styles.dropdownLink, ...styles.deleteBtn}}
            >
              <i className="fa fa-trash" style={styles.menuIcon}></i> Delete Profile
            </button>
          </div>
          <div style={styles.divider}></div>
          <div style={styles.dropdownItem}>
            <button onClick={onLogout} style={styles.dropdownLink}>
              <i className="fa fa-sign-out" style={styles.menuIcon}></i> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    position: 'relative',
    marginLeft: '15px',
  },
  profileButton: {
    display: 'flex',
    alignItems: 'center',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '4px',
    color: 'white',
    transition: 'background-color 0.3s',
  },
  icon: {
    fontSize: '20px',
    marginRight: '8px',
  },
  email: {
    maxWidth: '180px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  chevron: {
    marginLeft: '8px',
    fontSize: '12px',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: '0',
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    width: '220px',
    zIndex: 1000,
    marginTop: '5px',
  },
  dropdownItem: {
    padding: '0',
  },
  dropdownLink: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 15px',
    color: '#333',
    textDecoration: 'none',
    width: '100%',
    textAlign: 'left',
    border: 'none',
    background: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  menuIcon: {
    width: '20px',
    marginRight: '12px',
    fontSize: '16px',
  },
  divider: {
    borderTop: '1px solid #eee',
    margin: '8px 0',
  },
  deleteBtn: {
    color: '#d93025',
  }
};

export default ProfileDropdown;