import React from 'react'
import { useAuth } from '../hooks/useAuth.js';

/*************  ✨ Windsurf Command ⭐  *************/
/**
/*******  da29f7c8-c97f-429c-b078-cc6da278d0aa  *******/
 * logged in. If the user is not logged in, they will be redirected to the
 * login page.
 *
 * @returns {JSX.Element} A React component indicating that the user needs to
 * log in to access the page.
 */
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
