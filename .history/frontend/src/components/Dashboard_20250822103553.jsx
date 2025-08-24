import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaTechometerAlt } from 'react-icons/fa';

const Dashboard = () => {
    const { user } = useAuth();
  return (
    <div>
        <div>
            <h1>Welcome to the Dashboard, {user.name}!</h1>
        </div>
        <div>
            <NavLink to="/admin-dashboard">
                <FaTechometerAlt />
                <span>Dashboard</
            </NavLink>
        </div>
    </div>
  )
}

export default Dashboard
