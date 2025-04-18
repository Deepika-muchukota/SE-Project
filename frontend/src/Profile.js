import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import cafeteriaBg from './cafeteria-bg.jpg';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: ''
    // Removed phone field
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // For development, set mock data since we're bypassing signin
        if (localStorage.getItem('authToken') === 'development-token-12345') {
          setProfile({
            name: 'Test User',
            email: 'test@example.com'
          });
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:3500/auth/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        
        setProfile(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile. Please try again.');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const goBack = () => {
    navigate('/foodstalls');
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        <p>Loading profile...</p>
      </div>
    );
  }

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
          maxWidth: '500px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
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
          <h2 style={{ margin: 0, fontSize: '26px' }}>Your Profile</h2>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: '#fdeded',
              color: '#d32f2f',
              padding: '12px',
              borderRadius: '4px',
              marginBottom: '20px',
            }}
          >
            {error}
          </div>
        )}

        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#4285f4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '32px',
              fontWeight: 'bold',
              marginRight: '20px',
            }}
          >
            {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h3 style={{ margin: '0 0 5px 0', fontSize: '22px' }}>{profile.name || 'User'}</h3>
            <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>Customer Account</p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', color: '#666', fontSize: '14px', marginBottom: '5px' }}>
              Email
            </label>
            <p style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>{profile.email || 'Not available'}</p>
          </div>
          
          {/* Removed phone number field */}
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
          <button
            onClick={() => navigate('/change-password')}
            style={{
              backgroundColor: '#4285f4',
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
            Change Password
          </button>
          <button
            onClick={() => navigate('/foodstalls')}
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
            Back to Food Stalls
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;