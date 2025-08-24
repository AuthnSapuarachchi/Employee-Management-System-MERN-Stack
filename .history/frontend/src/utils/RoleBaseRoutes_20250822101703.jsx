import React from 'react'
import { useAuth } from '../hooks/useAuth.js';

const RoleBaseRoutes = (children, requi) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!user) {
        return <div>You need to log in to access this page.</div>;
    }

  return (
    <div>
      RoleBaseRoutes
    </div>
  )
}

export default RoleBaseRoutes
