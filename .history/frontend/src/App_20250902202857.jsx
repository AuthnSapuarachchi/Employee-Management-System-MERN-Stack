import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import EmployeeDashboard from './pages/EmployeeDashboard.jsx'
import PrivateRoutes from './utils/PrivateRoutes.jsx'
import RoleBaseRoutes from './utils/RoleBaseRoutes.jsx'

const App = () => {
  console.log("📍 App component: Rendering routes...");
  
  return (
    <div className="app-container">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Admin Routes */}
        <Route 
          path="/admin-dashboard/*" 
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={['admin']}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          } 
        />

        {/* Protected Employee Routes */}
        <Route 
          path="/employee-dashboard/*" 
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={['employee']}>
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          } 
        />
          <Route index element={<AdminSummary />}></Route>

        {/* Fallback Route - Handle unknown routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App
