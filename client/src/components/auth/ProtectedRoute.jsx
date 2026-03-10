import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * ProtectedRoute Component
 * Wraps any page that requires a user to be logged in.
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 1. Show a loading screen while checking if the user is logged in
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-[#D4AF37] rounded-full animate-spin"></div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold">
            Verifying Access
          </p>
        </div>
      </div>
    );
  }

  // 2. If the user is NOT logged in, redirect them to the Login page
  if (!user) {
    return (
      <Navigate 
        to="/login" 
        // We save the 'current location' so the login page knows 
        // to send them back here after they sign in.
        state={{ from: location }} 
        replace 
      />
    );
  }

  // 3. If they ARE logged in, show the page they wanted (e.g., Checkout)
  return children;
};

export default ProtectedRoute;