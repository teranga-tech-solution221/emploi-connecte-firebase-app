
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';

type ProtectedRouteProps = {
  children: ReactNode;
  redirectIfAuthenticated?: boolean;
  to?: string;
};

const ProtectedRoute = ({ 
  children, 
  redirectIfAuthenticated = false,
  to = "/dashboard"
}: ProtectedRouteProps) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (redirectIfAuthenticated && currentUser) {
    return <Navigate to={to} replace />;
  }

  if (!redirectIfAuthenticated && !currentUser) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
