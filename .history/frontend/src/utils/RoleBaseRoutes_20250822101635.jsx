import React from 'react'
import { useAuth } from '../hooks/useAuth.js';

const RoleBaseRoutes = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

  return (
    <div>
      RoleBaseRoutes
    </div>
  )
}

export default RoleBaseRoutes
