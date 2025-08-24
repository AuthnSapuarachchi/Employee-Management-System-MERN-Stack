import React from 'react'
import { useAuth } from '../hooks/useAuth.js';

const RoleBaseRoutes = (children, requiredRole) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!requiredRole.includes(user?.role)) {

  return (
    <div>
      RoleBaseRoutes
    </div>
  )
}

export default RoleBaseRoutes
