import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Simple Login component without context
const SimpleLogin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Simple Login Test</h2>
        <p>This is a simplified login page to test if the issue is with the AuthProvider</p>
      </div>
    </div>
  )
}

// Simple App without AuthProvider
const SimpleApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<SimpleLogin />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default SimpleApp
