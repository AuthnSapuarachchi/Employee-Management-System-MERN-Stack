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
          <Route index element={<DashboardContent />} />
          
          {/* Department routes */}
          <Route path="departments" element={<Department />} />
          
          {/* Employees routes */}
          <Route path="employees" element={<div className="p-6"><h1 className="text-2xl font-bold">Employees Page</h1><p>Coming Soon...</p></div>} />
          
          {/* Leave Management routes */}
          <Route path="leave" element={<div className="p-6"><h1 className="text-2xl font-bold">Leave Management</h1><p>Coming Soon...</p></div>} />
          
          {/* Settings routes */}
          <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p>Coming Soon...</p></div>} />
        </Routes>
      </div>
    </div>
  )
}

// Dashboard content component (extracted from original Dashboard component)
const DashboardContent = () => {
  const DashboardHeader = React.lazy(() => import('../components/Dashboard/DashboardHeader.jsx'))
  const StatsCards = React.lazy(() => import('../components/Dashboard/StatsCards.jsx'))
  const QuickActions = React.lazy(() => import('../components/Dashboard/QuickActions.jsx'))
  const RecentActivity = React.lazy(() => import('../components/Dashboard/RecentActivity.jsx'))

  return (
    <React.Suspense fallback={<div className="p-6">Loading...</div>}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <DashboardHeader />

        {/* Stats Cards */}
        <StatsCards />

        {/* Quick Actions and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
    </React.Suspense>
  )
}

export default AdminDashboard
