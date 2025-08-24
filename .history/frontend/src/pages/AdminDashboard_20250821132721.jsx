import React from 'react'
import { useAuth } from '../context/authContext.jsx'


const AdminDashboard = () => {

  const { user } = useAuth();
  if (!user) {
    return <div>Loading...</div>; // or a redirect to login
  }

  return (
    <div>
      Admin Dashboard {user.name}
    </div>
  )
}

export default AdminDashboard
