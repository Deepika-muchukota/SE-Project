import React from 'react';
import NavBar from './NavBar';
import { useLocation } from 'react-router-dom';

function Layout({ children, cart, setCart, onLogout, removeOrderFromCart }) {
  const location = useLocation();
  
  // Only show the NavBar on the main foodstalls page, not on specific food stall pages
  const showNavBar = location.pathname === '/foodstalls';
  
  return (
    <div className="layout">
      {showNavBar && (
        <NavBar 
          cart={cart} 
          setCart={setCart} 
          onLogout={onLogout} 
          removeOrderFromCart={removeOrderFromCart} 
        />
      )}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default Layout;