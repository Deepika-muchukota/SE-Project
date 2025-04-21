import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentForm.css';
import { useCart } from './context/CartContext';
import { useAuth } from './context/AuthContext';
import { isTestCard } from './constants/PaymentCards';

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const validateCardNumber = (number) => {
    let sum = 0;
    let isEven = false;
    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number.charAt(i), 10);
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }
    return sum % 10 === 0;
  };

  const validateExpiryDate = (expiry) => {
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;
    const [month, year] = expiry.split('/');
    const expMonth = parseInt(month, 10);
    const expYear = parseInt('20' + year, 10);
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    if (expMonth < 1 || expMonth > 12) return false;
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    return true;
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!cardNumber.trim() || !expiryDate.trim() || !cvv.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (!/^\d{15,16}$/.test(cardNumber)) {
      setError('Card number must be 15 or 16 digits');
      return;
    }

    if (!validateCardNumber(cardNumber) && !isTestCard(cardNumber)) {
      setError('Invalid card number');
      return;
    }

    if (!validateExpiryDate(expiryDate)) {
      setError('Invalid expiry date (MM/YY)');
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      setError('CVV must be 3 digits');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const orderResponse = await fetch(`http://localhost:5000/api/place-order/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            menu_id: item.menu_id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          total: getCartTotal(),
          status: 'Confirmed'
        })
      });
      
      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }
      
      const orderData = await orderResponse.json();  

      const paymentResponse = await fetch('http://localhost:5000/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          order_id: orderData.order_id,
          amount: getCartTotal(),
          card_details: {
            number: cardNumber.slice(-4),
            expiry: expiryDate
          }
        })
      });

      if (!paymentResponse.ok) throw new Error('Payment failed');

      await clearCart();
      alert('Payment successful! Order has been placed.');
      navigate('/orders');
    } catch (err) {
      console.error('Payment error:', err);
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!cartItems.length) {
    return (
      <div className="payment-wrapper">
        <div className="payment-box">
          <h2>No items in cart</h2>
          <button onClick={() => navigate('/foodstalls')} className="back-to-menu-btn">
            Back to Food Stalls
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-wrapper">
      <div className="payment-box">
        <h2>Payment Details</h2>
        <div className="order-summary">
          <h3>ORDER SUMMARY</h3>
          {cartItems.map((item, index) => (
            <div key={index} className="order-item">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="order-total">Total: ${getCartTotal().toFixed(2)}</div>
        </div>

        <form className="payment-form" onSubmit={handlePayment}>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
              placeholder="1234 5678 9012 3456"
              maxLength="16"
            />
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');
                  if (value.length >= 2) value = value.slice(0, 2) + '/' + value.slice(2, 4);
                  setExpiryDate(value);
                }}
                placeholder="MM/YY"
                maxLength="5"
              />
            </div>

            <div className="form-group half">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                placeholder="123"
                maxLength="3"
              />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="button-group">
            <button type="button" onClick={() => navigate('/cart')} className="back-button">
              Back to Cart
            </button>
            <button type="submit" className="payment-button" disabled={loading}>
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
