import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginWithoutAuth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Simple demo login without auth context
        if (email === 'admin@test.com' && password === 'admin123') {
            alert('Login successful! (Demo mode)')
            navigate('/admin-dashboard')
            return
        }
        
        if (email === 'employee@test.com' && password === 'emp123') {
            alert('Login successful! (Demo mode)')
            navigate('/employee-dashboard')
            return
        }
        
        setError('Invalid credentials. Use admin@test.com/admin123 or employee@test.com/emp123')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-md rounded-lg max-w-md w-full p-10">
                <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Welcome Back</h2>
                
                {/* Demo Credentials Info */}
                <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                    <p className="text-sm text-blue-800 font-medium mb-2">Demo Credentials:</p>
                    <p className="text-xs text-blue-700">Admin: admin@test.com / admin123</p>
                    <p className="text-xs text-blue-700">Employee: employee@test.com / emp123</p>
                </div>
                
                {error && <p className='text-red-500 mb-4'>{error}</p>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="you@example.com"
                            value={email}
                            className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-8">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            placeholder="••••••••"
                            value={password}
                            className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md shadow-md hover:bg-blue-700 transition"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginWithoutAuth
