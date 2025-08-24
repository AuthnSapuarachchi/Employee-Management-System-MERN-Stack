import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AuthProvider from './context/authContext.jsx'
import Login from './pages/Login.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import EmployeeDashboard from './pages/EmployeeDashboard.jsx'
import PrivateRoutes from './utils/PrivateRoutes.jsx'
import RoleBaseRoutes from './utils/RoleBaseRoutes.jsx'

// Simple test components to debug routing
const TestLogin = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>🚀 Login Route Works!</h1>
    <p>This means React Router is working correctly.</p>
    <Login />
  </div>
)

const App = () => {
  console.log("App component rendered successfully");
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <div>
          <h3 style={{ padding: '1rem', backgroundColor: '#f0f0f0', margin: 0 }}>
            Debug: App is rendering
          </h3>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<TestLogin />} />
            
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
            <Route path="*" element={<div style={{ padding: '2rem' }}>
              <h2>404 - Route not found</h2>
              <p>Current URL doesn't match any routes</p>
            </div>} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App
