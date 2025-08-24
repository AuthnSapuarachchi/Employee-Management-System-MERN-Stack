import React from 'react'
import { useAuth } from '../context/authContext.jsx'

const AdminDashboard = () => {

  const { user } = useAuth();

  return (
    <div>
      Admin Dashboard {user.name}
    </div>
  )
}

export default AdminDashboard
