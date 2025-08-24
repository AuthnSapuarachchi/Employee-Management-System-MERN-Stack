import React from 'react'
import { useAuth } from '../hooks/useAuth.js';
import { Navigate } from 'react-router-dom';

const RoleBaseRoutes = (children, requiredRole) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!requiredRole.includes(user.role)) {
        <Navigate to="/unauthorized" replace />;
    }

  return (
    <div>
      RoleBaseRoutes
    </div>
  )
}

export default RoleBaseRoutes
