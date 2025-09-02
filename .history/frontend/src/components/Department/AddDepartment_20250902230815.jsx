import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../Dashboard/Sidebar'
import axios from 'axios'

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    name: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDepartment({
      ...department,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try{
      console.log('Submitting department:', department);
      const response = await axios.post('http://localhost:5000/api/departments/add', department);

      console.log('Response:', response.data);
      if(response.data.success) {
        alert('Department added successfully!')
        navigate("/admin-dashboard/departments")
      }

    } catch(error) {
      console.error('Error adding department:', error)
      if(error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error)
      } else {
        setError('Failed to add department. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar on the left */}
      <Sidebar />
      
      {/* Main content area on the right */}
      <div className="flex-1 ml-64 p-8">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Add New Department</h2>
          <p className="text-gray-600">Create a new department for your organization</p>
        </div>
        
        {/* Form Container */}
        <div className="max-w-2xl">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}
          
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Department Name Field */}
              <div>
                <label className="block text-gray-800 text-sm font-semibold mb-3">
                  Department Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={department.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g., Human Resources, Information Technology"
                  disabled={loading}
                  required
                />
              </div>
              
              {/* Description Field */}
              <div>
                <label className="block text-gray-800 text-sm font-semibold mb-3">
                  Department Description *
                </label>
                <textarea
                  name="description"
                  value={department.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  rows="5"
                  placeholder="Describe the department's role and responsibilities..."
                  disabled={loading}
                  required
                />
                <p className="text-sm text-gray-500 mt-2">Provide a clear description of what this department does</p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <Link
                  to="/admin-dashboard/departments"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Cancel
                </Link>
                
                <button
                  type="submit"
                  disabled={loading}
                  className={`inline-flex items-center px-8 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 ${
                    loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      Add Department
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
          
          {/* Helper Text */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="text-sm font-semibold text-blue-800 mb-1">Note</h4>
                <p className="text-sm text-blue-700">
                  Once created, you can assign employees to this department and set up department-specific policies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddDepartment
