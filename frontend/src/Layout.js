import React from 'react';
import NavBar from './NavBar';
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';

function Layout() {
  const location = useLocation();
  const { logout, isAuthenticated } = useAuth();
  const { cartItems, getCartItemCount } = useCart();
  
  // Show navbar on all pages except signin and signup
  const showNavBar = location.pathname !== '/signin' && 
                     location.pathname !== '/signup';
  
  // If not authenticated and not on signin/signup, redirect to signin
  if (!isAuthenticated() && 
      location.pathname !== '/signin' && 
      location.pathname !== '/signup') {
    return <Navigate to="/signin" replace />;
  }
  
  return (
    <div className="layout">
      {showNavBar && (
        <NavBar 
          cartItemCount={getCartItemCount()}
          onLogout={logout}
          isAuthenticated={isAuthenticated}
        />
      )}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;