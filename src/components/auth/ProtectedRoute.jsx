import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ requireOnboarding = true }) => {
  const { isAuthenticated, currentUser } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect unauthenticated guests to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect users with incomplete profiles to onboarding
  if (
    requireOnboarding &&
    !currentUser?.onboardingCompleted &&
    location.pathname !== '/onboarding'
  ) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

