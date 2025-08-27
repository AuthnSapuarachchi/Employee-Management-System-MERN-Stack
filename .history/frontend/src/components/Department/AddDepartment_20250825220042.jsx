import React, { useState } from 'react';
import axios from 'axios';
import { FaBuilding, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const AddDepartment = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (name.trim() === '') {
      setError('Department name is required.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/departments/add',  {
        name,
        description,
      }, {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
        timeout: 10000,
      });

      if (response.data.success) {
        navigate('/admin-dashboard/departments');
      } else {
        setError(response.data.error || 'Failed to add department.');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-2xl rounded-2xl p-8 mt-10 border border-blue-100">
      <div className="flex items-center justify-center mb-6">
        <FaBuilding className="text-blue-600 text-3xl mr-2" />
        <h2 className="text-2xl font-extrabold text-blue-700 text-center">Add New Department</h2>
      </div>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 rounded animate-pulse">
          <p className="text-red-700 text-sm font-medium flex items-center"><FaInfoCircle className="mr-2" />{error}</p>
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-100 border-l-4 border-green-500 rounded animate-fade-in">
          <p className="text-green-700 text-sm font-medium flex items-center"><FaInfoCircle className="mr-2 text-green-600" />{success}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-700">
            Department Name
          </label>
          <div className="relative">
            <FaBuilding className="absolute left-3 top-3 text-blue-400" />
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="e.g. Human Resources"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-semibold text-gray-700">
            Description
          </label>
          <div className="relative">
            <FaInfoCircle className="absolute left-3 top-3 text-blue-400" />
            <textarea
              id="description"
              name="description"
              rows={3}
              placeholder="Brief description of the department"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none transition-all"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg font-bold text-white text-lg shadow-md transition-all duration-200 ${
            loading ? 'bg-blue-300 cursor-not-allowed animate-pulse' : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              Adding...
            </span>
          ) : (
            'Add Department'
          )}
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
