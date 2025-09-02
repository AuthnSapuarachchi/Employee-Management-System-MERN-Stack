import React from 'react'
import {Link} from 'react-router-dom'
import Sidebar from '../Dashboard/Sidebar'
import Datatable from 'react-data-table-component';

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
        <div>
          <Datatable
            
        </div>
        
      </div>
    </div>
  )
}

export default DepartmentList
