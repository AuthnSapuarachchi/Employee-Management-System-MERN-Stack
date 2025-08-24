import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../components/Dashboard.jsx'
import Department from './Department.jsx'
import Sidebar from '../components/Dashboard/Sidebar.jsx'
import Employees from './Employees.jsx'
import LeaveManagement from './LeaveManagement.jsx'
import SalaryManagement from './SalaryManagement.jsx'
import Settings from './Settings.jsx'

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
          
          {/* Department routes */}
          <Route path="departments" element={<Department />} />
          
          {/* Employees routes */}
          <Route path="employees" element={<Employees />} />
          
          {/* Leave Management routes */}
          <Route path="leave" element={<LeaveManagement />} />
          
          {/* Salary routes */}
          <Route path="salary" element={<SalaryManagement />} />
          
          {/* Settings routes */}
          <Route path="settings" element={<Settings />} />
          
          {/* Catch all route for admin dashboard */}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  )
}

export default AdminDashboard
