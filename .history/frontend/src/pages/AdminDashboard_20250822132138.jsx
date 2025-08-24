import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../components/Dashboard.jsx'
import Department from './Department.jsx'
import Sidebar from '../components/Dashboard/Sidebar.jsx'

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
          <Route path="employees" element={
            <div className="p-6">
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">👥 Employees Management</h1>
                <p className="text-gray-600 text-lg">Coming Soon...</p>
                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                  <p className="text-blue-800 text-sm">This feature is under development and will be available soon!</p>
                </div>
              </div>
            </div>
          } />
          
          {/* Leave Management routes */}
          <Route path="leave" element={
            <div className="p-6">
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">📅 Leave Management</h1>
                <p className="text-gray-600 text-lg">Coming Soon...</p>
                <div className="mt-6 p-4 bg-green-50 rounded-xl">
                  <p className="text-green-800 text-sm">Leave tracking and approval system will be available soon!</p>
                </div>
              </div>
            </div>
          } />
          
          {/* Salary routes */}
          <Route path="salary" element={
            <div className="p-6">
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">💰 Salary Management</h1>
                <p className="text-gray-600 text-lg">Coming Soon...</p>
                <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
                  <p className="text-yellow-800 text-sm">Payroll and salary management system will be available soon!</p>
                </div>
              </div>
            </div>
          } />
          
          {/* Settings routes */}
          <Route path="settings" element={
            <div className="p-6">
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">⚙️ Settings</h1>
                <p className="text-gray-600 text-lg">Coming Soon...</p>
                <div className="mt-6 p-4 bg-purple-50 rounded-xl">
                  <p className="text-purple-800 text-sm">System configuration and user preferences coming soon!</p>
                </div>
              </div>
            </div>
          } />
          
          {/* Catch all route for admin dashboard */}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  )
}

export default AdminDashboard
