import React, { useState } from 'react';
import './ChangePassword.css';
import { useAuth } from './context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const ChangePassword = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      setSuccess(false);
      return;
    }

    if (!validatePassword(newPassword)) {
      setMessage('Password must contain 1 uppercase, 1 lowercase, 1 number, and be at least 8 characters long.');
      setSuccess(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/users/${user.id}/change-password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!res.ok) throw new Error('Password update failed');
      setSuccess(true);
      setMessage('Password updated successfully');
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error(error);
      setSuccess(false);
      setMessage('Failed to update password. Please try again.');
    }
  };

  return (
    <div className="password-page">
      <div className="password-container">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          {['currentPassword', 'newPassword', 'confirmPassword'].map((field, idx) => (
            <div className="form-group" key={field}>
              <label>
                {field === 'currentPassword' && 'Current Password'}
                {field === 'newPassword' && 'New Password'}
                {field === 'confirmPassword' && 'Confirm New Password'}
              </label>
              <div className="input-with-icon">
                <input
                  type={showPassword[field.split('Password')[0]] ? 'text' : 'password'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={
                    field === 'currentPassword' ? 'Enter current password' :
                    field === 'newPassword' ? 'Enter new password' :
                    'Re-enter new password'
                  }
                  required
                />
                <span onClick={() => toggleVisibility(field.split('Password')[0])}>
                  {showPassword[field.split('Password')[0]] ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
          ))}

          {message && (
            <div className={success ? 'success-message' : 'error-message'}>
              {message}
            </div>
          )}
          <button type="submit" className="update-btn">Update Password</button>
        </form>
      </div>
    </div>
  );
};


export default ChangePassword;
