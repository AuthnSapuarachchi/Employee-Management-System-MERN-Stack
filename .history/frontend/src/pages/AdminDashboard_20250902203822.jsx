import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar.jsx'
import Dashboard from '../components/Dashboard/Dashboard.jsx'
import Employees from './Employees.jsx'
import LeaveManagement from './LeaveManagement.jsx'

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 overflow-auto">
        <Routes>
          {/* Default dashboard route */}
          <Route index element={<Dashboard />} />
          
          {/* Employees routes */}
          <Route path="employees" element={<Employees />} />
          
          {/* Leave Management routes */}
          <Route path="leave" element={<LeaveManagement />} />
                    
          
          {/* Catch all route for admin dashboard */}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  )
}

export default AdminDashboard
