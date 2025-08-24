import React from 'react'

const TestComponent = () => {
  return (
    <div style={{ 
      padding: '20px', 
      background: '#f0f0f0', 
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      color: '#333'
    }}>
      <h1 style={{ color: 'green' }}>✅ React is Working!</h1>
      <p>If you see this message, React is rendering correctly.</p>
      <p>The issue is likely in the App.jsx or its imported components.</p>
    </div>
  )
}

export default TestComponent
