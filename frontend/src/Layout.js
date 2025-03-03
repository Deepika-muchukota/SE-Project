import React from 'react';
import NavBar from './NavBar';

function Layout({ children, cart, setCart, onLogout }) {
  return (
    <div>
      <NavBar cart={cart} setCart={setCart} />
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default Layout;
