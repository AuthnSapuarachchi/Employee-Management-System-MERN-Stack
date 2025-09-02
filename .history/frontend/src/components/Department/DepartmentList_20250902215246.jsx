import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'

const DepartmentList = () => {
  const [departments, setDepartments] = useState([
    {
      _id: '1',
      name: 'Human Resources',
      description: 'Manages employee relations and policies'
    },
    {
      _id: '2', 
      name: 'Information Technology',
      description: 'Handles all technical operations and systems'
    },
    {
      _id: '3',
      name: 'Finance',
      description: 'Manages financial operations and budgets'
    }
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredDepartments, setFilteredDepartments] = useState(departments)

  // Filter departments based on search term
  useEffect(() => {
    const filtered = departments.filter(dept =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredDepartments(filtered)
  }, [searchTerm, departments])

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter(dept => dept._id !== id))
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Manage Departments</h2>
            <p className="text-gray-600 mt-1">Add, edit, and manage company departments</p>
          </div>
          <Link 
            to="/admin-dashboard/add-department"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <FaPlus className="mr-2" />
            Add New Department
          </Link>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="relative max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by department name or description..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Department Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredDepartments.length} of {departments.length} departments
        </p>
      </div>

      {/* Department Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-900">Department Name</th>
                <th className="text-left p-4 font-semibold text-gray-900">Description</th>
                <th className="text-center p-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDepartments.length > 0 ? (
                filteredDepartments.map((department) => (
                  <tr key={department._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{department.name}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-600">{department.description}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center space-x-2">
                        <button
                          className="flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                          title="Edit Department"
                        >
                          <FaEdit className="mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(department._id)}
                          className="flex items-center px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                          title="Delete Department"
                        >
                          <FaTrash className="mr-1" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-8 text-center" colSpan="3">
                    <div className="text-gray-500">
                      {searchTerm ? (
                        <div>
                          <p className="text-lg font-medium">No departments found</p>
                          <p className="mt-1">Try adjusting your search terms</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-lg font-medium">No departments available</p>
                          <p className="mt-1">Get started by adding your first department</p>
                          <Link 
                            to="/admin-dashboard/add-department"
                            className="inline-flex items-center px-4 py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <FaPlus className="mr-2" />
                            Add Department
                          </Link>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Info */}
      {filteredDepartments.length > 0 && (
        <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Total Departments: {departments.length}</span>
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default DepartmentList
