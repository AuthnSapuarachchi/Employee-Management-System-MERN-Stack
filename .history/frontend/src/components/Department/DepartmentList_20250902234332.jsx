import React from 'react'
import {Link} from 'react-router-dom'
import Sidebar from '../Dashboard/Sidebar'

const DepartmentList = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar on the left */}
      <Sidebar />
      
      {/* Main content area on the right */}
      <div className="flex-1 ml-64 p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Manage Department</h3>
        </div>
        <div className="flex justify-between items-center mb-6">
          <input 
            type="text" 
            placeholder='Search by Dep Name' 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Link 
            to="/admin-dashboard/add-department"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add New Department
          </Link>
        </div>
        
        {/* Department List Table */}
        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Department Name</th>
                <th className="text-left p-4">Description</th>
                <th className="text-left p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4">Human Resources</td>
                <td className="p-4">Manages employee relations and policies</td>
                <td className="p-4">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-4">Information Technology</td>
                <td className="p-4">Handles all technical operations and systems</td>
                <td className="p-4">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-4">Finance</td>
                <td className="p-4">Manages financial operations and budgets</td>
                <td className="p-4">
                  <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DepartmentList
