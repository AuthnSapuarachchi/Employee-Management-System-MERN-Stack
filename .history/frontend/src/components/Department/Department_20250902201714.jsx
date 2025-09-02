import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBuilding, FaPlus, FaSearch, FaUsers, FaEdit, FaTrash } from 'react-icons/fa';
import DepartmentCard from './DepartmentCard.jsx';
import AddDepartmentModal from './AddDepartmentModal.jsx';

const Department = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editDepartment, setEditDepartment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('Department component mounted'); // Debug log

  useEffect(() => {
    // Fetch departments from backend
    const fetchDepartments = async () => {
      console.log('Fetching departments...'); // Debug log
      try {
        const res = await axios.get('/api/departments');
        console.log('Departments fetched:', res.data); // Debug log
        setDepartments(res.data);
      } catch (err) {
        console.error('Error fetching departments:', err); // Debug log
        setError('Failed to load departments. Please check your server/API.');
      }
      setLoading(false);
    };
    fetchDepartments();
  }, []);

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (dept.manager && dept.manager.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddDepartment = async (newDept) => {
    try {
      const res = await axios.post('/api/departments', newDept);
      setDepartments([...departments, res.data]);
      setShowAddModal(false);
    } catch (err) {
      setError('Failed to add department.');
      console.error('Error adding department:', err);
    }
  };

  const handleEditDepartment = async (updatedDept) => {
    try {
      const res = await axios.put(`/api/departments/${updatedDept._id || updatedDept.id}`, updatedDept);
      setDepartments(departments.map(dept => (dept._id === res.data._id || dept.id === res.data.id) ? res.data : dept));
      setShowEditModal(false);
      setEditDepartment(null);
    } catch (err) {
      setError('Failed to update department.');
      console.error('Error updating department:', err);
    }
  };

  const handleDeleteDepartment = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await axios.delete(`/api/departments/${id}`);
        setDepartments(departments.filter(dept => dept._id !== id && dept.id !== id));
      } catch (err) {
        setError('Failed to delete department.');
        console.error('Error deleting department:', err);
      }
    }
  };

  const handleEditClick = (department) => {
    setEditDepartment(department);
    setShowEditModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading departments...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent flex items-center">
              <FaBuilding className="mr-3 text-blue-600" />
              Departments
            </h1>
            <p className="text-gray-600 mt-2">Manage and organize your company departments</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <FaPlus className="mr-2" />
            Add Department
          </button>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Search Bar */}
        <div className="lg:col-span-2">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search departments or managers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-blue-100">
              <FaBuilding className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Departments</p>
              <p className="text-2xl font-bold text-gray-900">{departments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-green-100">
              <FaUsers className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">
                {departments.reduce((sum, dept) => sum + (dept.employeeCount || 0), 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="text-red-600 font-semibold">Error:</div>
            <div className="ml-2 text-red-700">{error}</div>
          </div>
        </div>
      )}

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDepartments.map((department) => (
          <DepartmentCard
            key={department._id || department.id}
            department={department}
            onDelete={handleDeleteDepartment}
            onEdit={handleEditClick}
          />
        ))}
      </div>

      {/* No Results */}
      {filteredDepartments.length === 0 && !loading && (
        <div className="text-center py-12">
          <FaBuilding className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No departments found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first department.'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaPlus className="mr-2" />
              Add Department
            </button>
          )}
        </div>
      )}

      {/* Add Department Modal */}
      {showAddModal && (
        <AddDepartmentModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onDepartmentAdded={handleAddDepartment}
        />
      )}

      {/* Edit Department Modal */}
      {showEditModal && editDepartment && (
        <AddDepartmentModal
          isOpen={showEditModal}
          onClose={() => { setShowEditModal(false); setEditDepartment(null); }}
          onDepartmentAdded={handleEditDepartment}
          initialData={editDepartment}
          isEdit={true}
        />
      )}
    </div>
  );
};

export default Department;
