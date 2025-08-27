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
      import React, { useState } from "react";
      import axios from "axios";

      const AddDepartment = ({ onDepartmentAdded }) => {
        const [form, setForm] = useState({
          name: "",
          description: "",
          manager: "",
          budget: "",
          employeeCount: ""
        });
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState("");

        const handleChange = (e) => {
          const { name, value } = e.target;
          setForm((prev) => ({ ...prev, [name]: value }));
        };

        const handleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true);
          setError("");
          try {
            const res = await axios.post("/api/departments", {
              name: form.name,
              description: form.description,
              manager: form.manager,
              budget: form.budget,
              employeeCount: form.employeeCount
            });
            if (onDepartmentAdded) onDepartmentAdded(res.data);
            setForm({ name: "", description: "", manager: "", budget: "", employeeCount: "" });
          } catch (err) {
            setError(err.response?.data?.message || "Failed to add department");
          }
          setLoading(false);
        };

        return (
          <div className="add-department-form-container">
            <form className="add-department-form" onSubmit={handleSubmit}>
              <h2 className="form-title">Add Department</h2>
              {error && <div className="form-error">{error}</div>}
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="manager">Manager</label>
                <input
                  type="text"
                  id="manager"
                  name="manager"
                  value={form.manager}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="budget">Budget</label>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="employeeCount">Employee Count</label>
                <input
                  type="number"
                  id="employeeCount"
                  name="employeeCount"
                  value={form.employeeCount}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <button type="submit" className="form-button" disabled={loading}>
                {loading ? "Adding..." : "Add Department"}
              </button>
            </form>
          </div>
        );
      };

      export default AddDepartment;
