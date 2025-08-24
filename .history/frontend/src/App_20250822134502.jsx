import React from 'react'

const App = () => {
  return (
    <div style={{ 
      padding: '40px', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🚀 React is Working!</h1>
      <p style={{ fontSize: '24px', marginBottom: '20px' }}>
        If you see this message, React is rendering correctly.
      </p>
      <div style={{ 
        background: 'rgba(255,255,255,0.1)', 
        padding: '20px', 
        borderRadius: '10px',
        marginTop: '20px'
      }}>
        <h3>✅ System Status:</h3>
        <ul style={{ fontSize: '18px', lineHeight: '1.6' }}>
          <li>✅ Vite Server: Running on port 5177</li>
          <li>✅ React: Rendering successfully</li>
          <li>✅ Main.jsx: Loading App component</li>
          <li>🔄 Next: Test routing and context...</li>
        </ul>
      </div>
    </div>
  )
}

export default App
