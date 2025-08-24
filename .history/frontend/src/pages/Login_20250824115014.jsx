import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    console.log("Login component rendered successfully");
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { login, user } = useAuth()
    const navigate = useNavigate()

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            console.log("User already logged in, redirecting...", user);
            if (user.role === 'admin') {
                navigate('/admin-dashboard', { replace: true });
            } else {
                navigate('/employee-dashboard', { replace: true });
            }
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        
        console.log("Login attempt with:", { email, password: '***' });
        
        // Demo login for testing (remove when backend is connected)
        if (email === 'admin@test.com' && password === 'admin123') {
            console.log("Demo admin login successful");
            const demoUser = {
                _id: 'demo-admin-id',
                name: 'Demo Admin',
                email: 'admin@test.com',
                role: 'admin'
            };
            login(demoUser);
            localStorage.setItem('token', 'demo-token');
            localStorage.setItem('demo-user', JSON.stringify(demoUser));
            navigate('/admin-dashboard', { replace: true });
            setLoading(false)
            return;
        }
        
        if (email === 'employee@test.com' && password === 'emp123') {
            console.log("Demo employee login successful");
            const demoUser = {
                _id: 'demo-employee-id',
                name: 'Demo Employee',
                email: 'employee@test.com',
                role: 'employee'
            };
            login(demoUser);
            localStorage.setItem('token', 'demo-token');
            localStorage.setItem('demo-user', JSON.stringify(demoUser));
            navigate('/employee-dashboard', { replace: true });
            setLoading(false)
            return;
        }
        
        // Backend API login
        try {
            console.log("Attempting backend login...");
            const response = await axios.post(
                "http://localhost:5000/api/auth/login", 
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000 // 10 second timeout
                }
            );
            
            console.log("Backend response:", response.data);
            
            if (response.data.success) {
                console.log("Backend login successful");
                login(response.data.user)
                localStorage.setItem('token', response.data.token);
                if (response.data.user.role === 'admin') {
                    navigate('/admin-dashboard', { replace: true });
                } else {
                    navigate('/employee-dashboard', { replace: true });
                }
            } else {
                setError("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login error:", error);
            if (error.response) {
                // Server responded with error status
                if (error.response.data && error.response.data.error) {
                    setError(error.response.data.error);
                } else {
                    setError("Invalid credentials. Please try again.");
                }
            } else if (error.request) {
                // Request was made but no response received
                setError("Server connection failed. Please check if the backend is running.");
                console.warn("Backend server appears to be offline. Demo mode available.");
            } else {
                // Something else happened
                setError("An unexpected error occurred. Please try again.");
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
