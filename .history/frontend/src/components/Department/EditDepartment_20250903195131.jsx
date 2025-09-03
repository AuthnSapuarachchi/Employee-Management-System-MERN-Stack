import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Dashboard/Sidebar';
import axios from 'axios';

const EditDepartment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchDepartment = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/departments/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        const dept = response.data.department;
        setFormData({
          name: dept.name,
          description: dept.description
        });
        setError('');
      } else {
        setError('Failed to fetch department details');
      }
    } catch (error) {
      console.error('Error fetching department:', error);
      if (error.response?.status === 401) {
        setError('Please login to edit departments');
      } else if (error.response?.status === 404) {
        setError('Department not found');
      } else {
        setError('Failed to fetch department details. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartment();
  }, [id, fetchDepartment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      setError('Department name is required');
      return;
    }
    
    if (!formData.description.trim()) {
      setError('Department description is required');
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:5000/api/departments/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        alert('Department updated successfully!');
        navigate('/admin-dashboard/departments');
      } else {
        setError(response.data.message || 'Failed to update department');
      }
    } catch (error) {
      console.error('Error updating department:', error);
      if (error.response?.status === 401) {
        setError('Please login to update departments');
      } else if (error.response?.status === 400) {
        setError(error.response.data.message || 'Invalid department data');
      } else if (error.response?.status === 409) {
        setError('A department with this name already exists');
      } else {
        setError('Failed to update department. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin-dashboard/departments');
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading department details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className="flex-1 ml-64 p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Edit Department</h3>
          <p className="text-gray-600 mt-1">Update department information</p>
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

        {/* Form */}
        <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Department Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Department Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter department name"
                required
              />
            </div>

            {/* Department Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Department Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter department description"
                required
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  'Update Department'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-blue-900">Tips for editing departments</h4>
              <ul className="mt-2 text-sm text-blue-700 list-disc list-inside space-y-1">
                <li>Department names must be unique across the organization</li>
                <li>Provide a clear description that explains the department's role</li>
                <li>Changes will be reflected immediately after saving</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDepartment;
