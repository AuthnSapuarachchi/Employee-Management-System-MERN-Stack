
// Modal component for adding department
const AddDepartmentModal = ({ isOpen, onClose, onDepartmentAdded }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    manager: '',
    budget: '',
    employeeCount: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/departments', form);
      if (onDepartmentAdded) onDepartmentAdded(response.data);
      setForm({ name: '', description: '', manager: '', budget: '', employeeCount: '' });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add department');
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2 className="modal-title flex items-center"><FaBuilding className="mr-2" />Add Department</h2>
        {error && (
          <div className="modal-error flex items-center"><FaInfoCircle className="mr-2" />{error}</div>
        )}
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={form.description} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="manager">Manager</label>
            <input type="text" id="manager" name="manager" value={form.manager} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="budget">Budget</label>
            <input type="number" id="budget" name="budget" value={form.budget} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="employeeCount">Employee Count</label>
            <input type="number" id="employeeCount" name="employeeCount" value={form.employeeCount} onChange={handleChange} />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Department'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Main AddDepartment component
const AddDepartment = ({ onDepartmentAdded }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button className="open-modal-btn" onClick={() => setShowModal(true)}>
        Add Department
      </button>
      <AddDepartmentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onDepartmentAdded={onDepartmentAdded}
      />
    </div>
  );
};

export default AddDepartment;
import React, { useState } from 'react';
import axios from 'axios';
import { FaBuilding, FaInfoCircle } from 'react-icons/fa';
