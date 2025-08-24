import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

const SimpleLogin = () => (
  <div style={{ padding: '20px', background: '#e3f2fd' }}>
    <h2>Simple Login Page Test</h2>
    <p>If you see this, React Router is working!</p>
  </div>
)

const TestRouterApp = () => {
  return (
    <BrowserRouter>
      <div style={{ padding: '20px' }}>
        <h1>🔗 Testing React Router</h1>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<SimpleLogin />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default TestRouterApp
