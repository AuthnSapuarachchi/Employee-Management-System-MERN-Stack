import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaTechometerAlt, FaUsers } from 'react-icons/fa';

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
                <span>Dashboard</span>
            </NavLink>
            <NavLink to="/admin-dashboard">
                <FaUsers />
                <span>Employees</span>
            </NavLink>
            <NavLink to="/admin-dashboard">
                <FaBuilding />
                <span>Dashboard</span>
            </NavLink>
        </div>
    </div>
  )
}

export default Dashboard
