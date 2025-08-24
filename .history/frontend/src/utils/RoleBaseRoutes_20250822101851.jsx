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

    if (user) {
        if (user.role === 'admin') {
            return <Navigate to="/admin-dashboard" replace />;
        } else if (user.role === 'employee') {
            return <Navigate to="/employee-dashboard" replace />;
        }
    }
}

export default RoleBaseRoutes
