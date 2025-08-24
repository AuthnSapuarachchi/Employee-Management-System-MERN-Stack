import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();

    // Show loading while checking authentication
    if (loading) {
        return <div>Loading...</div>;
    }

    // If user is already logged in, redirect to appropriate dashboard
    if (user) {
        if (user.role === 'admin') {
            return <Navigate to="/admin-dashboard" replace />;
        } else {
            return <Navigate to="/employee-dashboard" replace />;
        }
    }

    // If user is not logged in, show the public page (login)
    return children;
};

export default PublicRoute;
