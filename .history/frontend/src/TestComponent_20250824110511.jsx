import React from 'react'

const TestComponent = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#333', marginBottom: '1rem' }}>🎉 React is Working!</h1>
        <p style={{ color: '#666' }}>The application is successfully rendering React components.</p>
        <p style={{ color: '#666', marginTop: '1rem', fontSize: '0.9rem' }}>
          If you can see this, your React app is properly configured.
        </p>
      </div>
    </div>
  )
}

export default TestComponent
