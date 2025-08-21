import axios from 'axios'
import React, { useState } from 'react'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login", 
                {email, password}
            );
            if(response.data.success) {
                alert("Login successful");
            }
        } catch (error) {
          if (error.response && error.response.data.success) {

          }
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg max-w-md w-full p-10">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Welcome Back</h2>
        {error && <p className='text-red-500'>{error}</p>}
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
        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
