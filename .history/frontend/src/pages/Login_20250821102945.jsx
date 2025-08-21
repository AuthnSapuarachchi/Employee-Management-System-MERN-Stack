import React from 'react'

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-sm w-full p-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Employee Management System</h2>
        <form>
          <h3 className="text-xl font-medium mb-4 text-gray-700">Login</h3>
          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-600 mb-2 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 mb-2 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
