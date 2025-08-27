
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
