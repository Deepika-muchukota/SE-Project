import React from 'react';
import cafeteriaBg from "./cafeteria-bg.jpg";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = ({name,setName,email,setEmail,phone,setPhone,password,setPassword,confirmPassword,confirmSetPassword,errors,setErrors,passwordFocused,setPasswordFocused}) => {

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) { 
      console.log('Submitted:', { name, email, password });
      navigate("/")
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!name.trim()) newErrors.name = 'Name is required';

    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(phone)) newErrors.phone = 'Enter a valid 10-digit phone number';

    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Enter a valid email';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    else if (!/\d/.test(password)) newErrors.password = 'Password must contain at least one number';
    else if (!/[A-Z]/.test(password)) newErrors.password = 'Password must contain at least one uppercase letter';

    if (!confirmPassword) newErrors.confirmPassword = 'confirmation of password required';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /*
  const createUser = () => {
    axios.post('http://localhost:3500/items', {
      "Name": name,
      "Email": email,
      "Phone Number": phone,
      "Password": password,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  */

  const createUser = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/signup", {
        name,
        email,
        phone,
        password
      });
      console.log("Signup successful:", response.data);
      navigate("/signin");
    } catch (error) {
      console.error("Signup failed:", error.response?.data?.error || error.message);
    }
  };  
  
  return (
    <div className='sign-up-page'
    style={{
        backgroundImage: `url(${cafeteriaBg})`,
        backgroundSize: "cover",
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <form className='sign-up-form' onSubmit={handleSubmit}
      >
      <h2>Sign Up</h2>
      <div className='signup-inp'>
      <label >
        Name:
        <input autoFocus placeholder="Enter your name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <span className="error">{errors.name}</span>}
      </label>
      </div>

      <div className='signup-inp'>
      <label >
        Email:
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <span className="error">{errors.email}</span>}
      </label>
      </div>

      <div className='signup-inp'>
      <label >
        Phone Number:
        <input
        type="tel" 
        placeholder="Enter your phone number" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </label>
      </div>

      <div className='signup-inp'>
      <label >
        Password:
        <input 
          type="password" 
          placeholder="Set up your password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          onFocus={() => setPasswordFocused(true)} 
          onBlur={() => setPasswordFocused(false)}
        />
        {errors.password && <span className="error">{errors.password}</span>}
        {passwordFocused && (
          <div className="password-requirements">
            <ul>
              <li>At least 8 characters</li>
              <li>At least one number</li>
              <li>At least one uppercase letter</li>
            </ul>
          </div>
        )}
      </label>
      </div>

      <div className='signup-inp' >
      <label>
        Confirm Password:
        <input type="password" placeholder="Re-enter your password" value={confirmPassword} onChange={(e) => confirmSetPassword(e.target.value)} />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
      </label>
      </div>

      <button className='signup-btn' type="submit" disabled={Object.keys(errors).length > 0} onClick={createUser}>Sign Up</button>

      </form>
    </div>
  )
}

export default SignUp
