import axios from 'axios'
import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    console.log("Login component rendered successfully");
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        
        // Demo login for testing (remove when backend is connected)
        if (email === 'admin@test.com' && password === 'admin123') {
            const demoUser = {
                name: 'Demo Admin',
                email: 'admin@test.com',
                role: 'admin'
            };
            login(demoUser);
            localStorage.setItem('token', 'demo-token');
            localStorage.setItem('demo-user', JSON.stringify(demoUser));
            navigate('/admin-dashboard');
            setLoading(false)
            return;
        }
        
        if (email === 'employee@test.com' && password === 'emp123') {
            const demoUser = {
                name: 'Demo Employee',
                email: 'employee@test.com',
                role: 'employee'
            };
            login(demoUser);
            localStorage.setItem('token', 'demo-token');
            localStorage.setItem('demo-user', JSON.stringify(demoUser));
            navigate('/employee-dashboard');
            setLoading(false)
            return;
        }
        
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login", 
                { email, password }
            );
            if (response.data.success) {
                login(response.data.user)
                localStorage.setItem('token', response.data.token);
                if (response.data.user.role === 'admin') {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/employee-dashboard');
                }
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error);
            } else {
                setError("Server connection failed. Using demo mode.");
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            backgroundColor: '#f3f4f6',
            padding: '1rem'
        }}>
            <div style={{
                backgroundColor: 'white',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                borderRadius: '0.5rem',
                maxWidth: '28rem',
                width: '100%',
                padding: '2.5rem'
            }}>
                <h2 style={{
                    fontSize: '1.875rem',
                    fontWeight: '800',
                    marginBottom: '2rem',
                    textAlign: 'center',
                    color: '#1f2937'
                }}>
                    Employee Management System
                </h2>
                
                {/* Demo Credentials Info */}
                <div style={{
                    marginBottom: '1.5rem',
                    padding: '1rem',
                    backgroundColor: '#dbeafe',
                    borderLeft: '4px solid #3b82f6',
                    borderRadius: '0.25rem'
                }}>
                    <p style={{ fontSize: '0.875rem', color: '#1e40af', fontWeight: '500', marginBottom: '0.5rem' }}>
                        Demo Credentials:
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#1d4ed8' }}>
                        Admin: admin@test.com / admin123
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#1d4ed8' }}>
                        Employee: employee@test.com / emp123
                    </p>
                </div>
                
                {error && (
                    <p style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.875rem' }}>
                        {error}
                    </p>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="email" style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            color: '#374151'
                        }}>
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.375rem',
                                fontSize: '0.875rem',
                                outline: 'none',
                                transition: 'border-color 0.15s ease-in-out'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                        />
                    </div>
                    
                    <div style={{ marginBottom: '2rem' }}>
                        <label htmlFor="password" style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            color: '#374151'
                        }}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.375rem',
                                fontSize: '0.875rem',
                                outline: 'none',
                                transition: 'border-color 0.15s ease-in-out'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            backgroundColor: loading ? '#9ca3af' : '#3b82f6',
                            color: 'white',
                            fontWeight: '600',
                            padding: '0.75rem',
                            borderRadius: '0.375rem',
                            border: 'none',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'background-color 0.15s ease-in-out'
                        }}
                        onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
                        onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#3b82f6')}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                
                <p style={{
                    marginTop: '1.5rem',
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    color: '#6b7280'
                }}>
                    Don&apos;t have an account?{' '}
                    <a href="/register" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Login
