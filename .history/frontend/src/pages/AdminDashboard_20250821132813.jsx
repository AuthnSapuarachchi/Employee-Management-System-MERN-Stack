import React from 'react'
import { useAuth } from '../context/authContext.jsx'
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

  const { user } = useAuth();
  const navigate = useNavigate();
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
