import React from 'react'

const PrivateRoutes = (children) => {
  const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

}

export default PrivateRoutes
