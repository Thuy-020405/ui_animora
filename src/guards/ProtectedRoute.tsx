import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '@/hooks/useAuth';

export const ProtectedRoute: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/dang-nhap" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
