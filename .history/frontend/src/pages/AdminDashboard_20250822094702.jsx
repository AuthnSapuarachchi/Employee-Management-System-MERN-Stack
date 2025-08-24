import React from 'react'
import { useAuth } from '../hooks/useAuth.js'
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  if (loading) {
    return 
  }

  if (!user) {
    navigate('/login');
  }

  return (
    <div>
      Admin Dashboard {user.name}
    </div>
  )
}

export default AdminDashboard
