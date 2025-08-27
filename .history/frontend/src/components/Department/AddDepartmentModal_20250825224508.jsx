import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBuilding, FaInfoCircle } from 'react-icons/fa';


const AddDepartmentModal = ({ isOpen, onClose, onDepartmentAdded, initialData = {}, isEdit = false }) => {
  const [name, setName] = useState(initialData.name || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [manager, setManager] = useState(initialData.manager || '');
  const [budget, setBudget] = useState(initialData.budget || '');
  const [employeeCount, setEmployeeCount] = useState(initialData.employeeCount || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setName(initialData.name || '');
    setDescription(initialData.description || '');
    setManager(initialData.manager || '');
    setBudget(initialData.budget || '');
    setEmployeeCount(initialData.employeeCount || '');
  }, [initialData, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let response;
      if (isEdit && initialData._id) {
        response = await axios.put(`/api/departments/${initialData._id}`, {
          name,
          description,
          manager,
          budget,
          employeeCount
        });
      } else {
        response = await axios.post('/api/departments', {
          name,
          description,
          manager,
          budget,
          employeeCount
        });
      }
      if (onDepartmentAdded) onDepartmentAdded(response.data);
      setName('');
      setDescription('');
      setManager('');
      setBudget('');
      setEmployeeCount('');
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || (isEdit ? 'Failed to update department' : 'Failed to add department'));
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2 className="modal-title flex items-center"><FaBuilding className="mr-2" />{isEdit ? 'Edit Department' : 'Add Department'}</h2>
        {error && (
          <div className="modal-error flex items-center"><FaInfoCircle className="mr-2" />{error}</div>
        )}
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="manager">Manager</label>
            <input type="text" id="manager" value={manager} onChange={e => setManager(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="budget">Budget</label>
            <input type="number" id="budget" value={budget} onChange={e => setBudget(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="employeeCount">Employee Count</label>
            <input type="number" id="employeeCount" value={employeeCount} onChange={e => setEmployeeCount(e.target.value)} />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? (isEdit ? 'Updating...' : 'Adding...') : (isEdit ? 'Update Department' : 'Add Department')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartmentModal;
