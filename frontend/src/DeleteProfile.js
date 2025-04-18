import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import cafeteriaBg from './cafeteria-bg.jpg';

const DeleteProfile = () => {
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Check confirmation text
    if (confirmation !== 'DELETE') {
      setError('Please type DELETE to confirm account deletion');
      return;
    }

    // For development, simulate successful deletion
    if (localStorage.getItem('authToken') === 'development-token-12345') {
      // Clear local storage
      localStorage.removeItem('authToken');
      // Navigate to sign in
      navigate('/signin');
      return;
    }

    try {
      // Send delete request to API
      await axios.delete('http://localhost:3500/auth/profile', {
        data: { password },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      // Clear local storage
      localStorage.removeItem('authToken');
      // Navigate to sign in
      navigate('/signin');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete account. Please try again.');
    }
  };

  const goBack = () => {
    navigate('/profile');
  };

  return (
    <div
      style={{
        backgroundImage: `url(${cafeteriaBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0',
        margin: '0',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          padding: '30px',
          width: '100%',
          maxWidth: '450px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <button
            onClick={goBack}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#333',
              marginRight: '10px',
            }}
          >
            ←
          </button>
          <h2 style={{ margin: 0, fontSize: '24px', color: '#d32f2f' }}>Delete Account</h2>
        </div>

        <div
          style={{
            backgroundColor: '#fdeded',
            border: '1px solid #f2c3c3',
            borderRadius: '4px',
            padding: '15px',
            marginBottom: '25px',
          }}
        >
          <h3 style={{ margin: '0 0 10px 0', color: '#d32f2f', fontSize: '16px' }}>Warning</h3>
          <p style={{ margin: '0', fontSize: '14px', lineHeight: '1.5' }}>
            This action is permanent and cannot be undone. All your data, order history, and personal information will be permanently deleted.
          </p>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: '#fdeded',
              color: '#d32f2f',
              padding: '12px',
              borderRadius: '4px',
              marginBottom: '20px',
              fontSize: '14px',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                fontSize: '14px',
              }}
            >
              Current Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '14px',
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                fontSize: '14px',
              }}
            >
              Type DELETE to confirm
            </label>
            <input
              type="text"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '14px',
              }}
              placeholder="DELETE"
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={goBack}
              style={{
                backgroundColor: '#f1f1f1',
                color: '#333',
                border: 'none',
                borderRadius: '4px',
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                flex: '1',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                backgroundColor: '#d32f2f',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                flex: '1',
              }}
            >
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteProfile;