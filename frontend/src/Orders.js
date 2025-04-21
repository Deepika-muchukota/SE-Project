import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.id) {
      fetchOrders();
    } else {
      setLoading(false);
      setError('Please log in to view your orders.');
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${user.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load orders. Please try again later.');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="orders-loading">Loading orders...</div>;
  }

  if (error) {
    return <div className="orders-error">{error}</div>;
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h2>Your Orders</h2>
        <button 
          className="food-stalls-button"
          onClick={() => navigate('/foodstalls')}
        >
          Go to Food Stalls
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders-container">
          <p className="no-orders">You haven't placed any orders yet.</p>
          <button 
            className="browse-menu-btn"
            onClick={() => navigate('/foodstalls')}
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order, index) => (
            <div key={order.order_id} className="order-card">
              <div className="order-header">
                <h3>Order #{order.order_id}</h3>
                <span className="order-date">
                  {order.created_at ? new Date(order.created_at).toLocaleString() : 'N/A'}
                </span>
              </div>
              <div className="order-items">
                {Array.isArray(order.items) && order.items.map((item, idx) => (
                  <div key={`${item.name}-${idx}`} className="order-item">
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <p className="order-total">Total: ${order.total.toFixed(2)}</p>
                <p className={`order-status status-${order.status?.toLowerCase() || 'processing'}`}>
                  {order.status || 'Processing'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
