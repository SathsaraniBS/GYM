// src/components/ProtectedRoute.jsx

import { useAuth } from '../context/AuthContext'; // ✅ Fixed: was '../hooks/useAuth'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/user/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute; // ✅ Fixed: was named export only