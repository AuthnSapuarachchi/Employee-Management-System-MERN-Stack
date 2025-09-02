import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Dashboard/Sidebar'

const AddDepartment = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Department Data:', formData)
    // Here you would typically send data to backend
  }

  return (
    
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Add New Department</h3>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Department Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter department name"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Enter department description"
              required
            />
          </div>
          
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Department
            </button>
            <Link
              to="/admin-dashboard/departments"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddDepartment
