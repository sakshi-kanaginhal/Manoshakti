import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  requiredRole?: UserRole;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, isAuthenticated, loading, role } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] dark:bg-[#15161E]">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8B7BE8] to-[#70B8AA] flex items-center justify-center text-white font-bold text-lg animate-pulse">
            M
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Verifying secure session...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    // Preserve attempted URL so user can be redirected back after successful login
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (requiredRole && role !== requiredRole && role !== 'admin') {
    return <Navigate to="/app/dashboard" replace />;
  }

  return <>{children}</>;
};
