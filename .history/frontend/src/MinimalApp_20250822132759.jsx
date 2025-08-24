import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

const MinimalApp = () => {
  return (
    <BrowserRouter>
      <div style={{ padding: '20px' }}>
        <h1>Minimal App Test</h1>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/test" element={<div>Test Page</div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default MinimalApp
