import React from 'react';
import NavBar from './NavBar';
import './lay.css'; 

function Layout({ children, cart, setCart, onLogout }) {
  return (
    <div className="layout-container">
      <NavBar cart={cart} setCart={setCart} onLogout={onLogout}/>
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default Layout;
