import React from 'react';
import Sidebar from '../Dashboard/Sidebar';
import DepartmentCard from './DepartmentCard.jsx';

const DepartmentList = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '2rem' }}>
        <DepartmentCard />
      </div>
    </div>
  );
}

export default DepartmentList;
