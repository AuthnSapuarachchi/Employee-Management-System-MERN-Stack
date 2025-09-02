import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DepartmentCard from './DepartmentCard.jsx';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get('/api/departments');
        setDepartments(res.data);
      } catch (err) {
        setError('Failed to load departments.');
      }
      setLoading(false);
    };
    fetchDepartments();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '2rem' }}>
        <h2>Departments</h2>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {departments.map((department) => (
            <DepartmentCard key={department._id || department.id} department={department} />
          ))}
        </div>
        {!loading && departments.length === 0 && <p>No departments found.</p>}
      </div>
    </div>
  );
}

export default DepartmentList;
