
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectIfAuthenticated?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectIfAuthenticated = false 
}) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  // Si l'utilisateur est connecté et que redirectIfAuthenticated est true
  if (currentUser && redirectIfAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Redirection vers le login si l'utilisateur n'est pas connecté et que ce n'est pas une page publique
  if (!currentUser && !redirectIfAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
