import React, { useState } from 'react';
import './Profile.css';
import { useAuth } from './context/AuthContext';

function Profile() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [message, setMessage] = useState('');
  const [isChanged, setIsChanged] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      setIsChanged(
        updated.name !== user?.name ||
        updated.email !== user?.email ||
        updated.phone !== user?.phone
      );
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Update failed');
      setMessage('Profile updated successfully!');
      setIsChanged(false);
    } catch (err) {
      console.error(err);
      setMessage('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          {message && (
            <div className={message.includes('successfully') ? 'success-message' : 'error-message'}>
              {message}
            </div>
          )}
          <button type="submit" className="save-button" disabled={!isChanged}>
            Update Details
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
