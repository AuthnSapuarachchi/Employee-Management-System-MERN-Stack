import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const DepartmentList = () => {
  const [departments, setDepartments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  // Mock data for demonstration - replace with actual API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDepartments([
        {
          id: 1,
          name: 'Human Resources',
          description: 'Manages employee relations and policies'
        },
        {
          id: 2,
          name: 'Information Technology',
          description: 'Handles all technical infrastructure and software'
        },
        {
          id: 3,
          name: 'Finance',
          description: 'Manages company finances and accounting'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter(dept => dept.id !== id))
    }
  }

  return (
    <div className="p-6 ml-64"> {/* ml-64 to account for sidebar width */}
      <div className="mb-6">
        <h3 className="text-3xl font-bold text-gray-900">Manage Departments</h3>
        <p className="text-gray-600 mt-2">Create, view, and manage company departments</p>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <input 
          type="text" 
          placeholder='Search by Department Name' 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
        />
        <Link 
          to="/admin-dashboard/add-department"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
        >
          <span className="mr-2">+</span>
          Add New Department
        </Link>
      </div>
      
      {/* Department List Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-semibold text-gray-700">S.No</th>
              <th className="text-left p-4 font-semibold text-gray-700">Department Name</th>
              <th className="text-left p-4 font-semibold text-gray-700">Description</th>
              <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-4 text-center" colSpan="4">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">Loading departments...</span>
                  </div>
                </td>
              </tr>
            ) : filteredDepartments.length > 0 ? (
              filteredDepartments.map((dept, index) => (
                <tr key={dept.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-gray-600">{index + 1}</td>
                  <td className="p-4 font-medium text-gray-900">{dept.name}</td>
                  <td className="p-4 text-gray-600">{dept.description}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors text-sm">
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(dept.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-8 text-center" colSpan="4">
                  <div className="text-gray-500">
                    <p className="text-lg font-medium">No departments found</p>
                    <p className="text-sm mt-1">
                      {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first department'}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Statistics */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800">Total Departments</h4>
          <p className="text-2xl font-bold text-blue-900">{departments.length}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h4 className="font-semibold text-green-800">Active Departments</h4>
          <p className="text-2xl font-bold text-green-900">{departments.length}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800">Employees</h4>
          <p className="text-2xl font-bold text-yellow-900">-</p>
        </div>
      </div>
    </div>
  )
}

export default DepartmentList
