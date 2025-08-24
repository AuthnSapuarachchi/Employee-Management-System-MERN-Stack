import React from 'react'
import { BrowserRouter, Routes, Route, Naigate } from 'react-router-dom'
import AuthProvider from './context/authContext.jsx'
import Login from './pages/Login.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import EmployeeDashboard from './pages/EmployeeDashboard.jsx'
import PrivateRoutes from './utils/PrivateRoutes.jsx'
import RoleBaseRoutes from './utils/RoleBaseRoutes.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
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

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
