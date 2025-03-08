import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PublicRoute = ({ restricted = false }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  // If route is restricted and user is authenticated, redirect to dashboard
  if (restricted && isAuthenticated) {
    // Check if there's a specific redirectTo in the state, otherwise go to dashboard
    const from = location.state?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  // Otherwise, render the child routes
  return <Outlet />;
};

export default PublicRoute;