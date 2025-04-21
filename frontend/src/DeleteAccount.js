import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./DeleteAccount.css";

function DeleteAccount() {
  const { deleteUserAccount } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm) return;

    try {
      setLoading(true);
      const success = await deleteUserAccount(password);
      if (success) {
        alert("Account deleted successfully.");
        navigate("/signin");
      } else {
        setError("Incorrect password or deletion failed.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delete-account-container">
      <h2>Delete Account</h2>
      <p>Please confirm your password to delete your account.</p>

      <div className="password-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span className="toggle-password" onClick={() => setShowPassword(prev => !prev)}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <label className="confirm-checkbox">
        <input
          type="checkbox"
          checked={confirm}
          onChange={(e) => setConfirm(e.target.checked)}
        />
        I understand that this action cannot be undone.
      </label>

      {error && <p className="error-text">{error}</p>}

      <button
        onClick={handleDelete}
        disabled={!confirm || password.length === 0 || loading}
        className="danger-btn"
      >
        {loading ? "Deleting..." : "Delete Account"}
      </button>

      <button className="cancel-btn" onClick={() => navigate("/")}>
        Cancel
      </button>
    </div>
  );
}

export default DeleteAccount;
