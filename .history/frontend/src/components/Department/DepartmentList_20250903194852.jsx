import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Dashboard/Sidebar'
import axios from 'axios'

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    // Filter departments based on search term
    const filtered = departments.filter(dept =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDepartments(filtered);
  }, [searchTerm, departments]);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/departments', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.success) {
        setDepartments(response.data.departments);
        setError('');
      } else {
        setError('Failed to fetch departments');
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
      if (error.response?.status === 401) {
        setError('Please login to view departments');
      } else {
        setError('Failed to fetch departments. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`http://localhost:5000/api/departments/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data.success) {
          setDepartments(departments.filter(dept => dept._id !== id));
          alert('Department deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting department:', error);
        alert('Failed to delete department');
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading departments...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar on the left */}
      <Sidebar />
      
      {/* Main content area on the right */}
      <div className="flex-1 ml-64 p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Manage Department</h3>
          <p className="text-gray-600 mt-1">Add, edit, and manage company departments</p>
        </div>

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

        <div className="flex justify-between items-center mb-6">
          <input 
            type="text" 
            placeholder="Search by department name or description..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3"
          />
          <Link 
            to="/admin-dashboard/add-department"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add New Department
          </Link>
        </div>

        {/* Department Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredDepartments.length} of {departments.length} departments
          </p>
        </div>
        
        {/* Department List Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-900">S.No</th>
                <th className="text-left p-4 font-semibold text-gray-900">Department Name</th>
                <th className="text-left p-4 font-semibold text-gray-900">Description</th>
                <th className="text-center p-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDepartments.length > 0 ? (
                filteredDepartments.map((department, index) => (
                  <tr key={department._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-gray-900">{index + 1}</td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{department.name}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-600">{department.description}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center space-x-2">
                        <button
                          
                          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                          title="Edit Department"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(department._id)}
                          className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                          title="Delete Department"
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
                            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
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

        {/* Footer Info */}
        {filteredDepartments.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Total Departments: {departments.length}</span>
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentList
