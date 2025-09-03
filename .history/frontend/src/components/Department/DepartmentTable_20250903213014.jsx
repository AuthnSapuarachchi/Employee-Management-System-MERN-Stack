import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DepartmentButtons } from '../../utils/DepartmentHelper';

// Example component showing how to use DepartmentHelper properly
const DepartmentTable = ({ departments, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = (departmentId) => {
    navigate(`/admin-dashboard/edit-department/${departmentId}`);
  };

  return (
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
          {departments.map((department, index) => (
            <tr key={department._id} className="hover:bg-gray-50 transition-colors">
              <td className="p-4 text-gray-900">{index + 1}</td>
              <td className="p-4">
                <div className="font-medium text-gray-900">{department.name}</div>
              </td>
              <td className="p-4">
                <div className="text-gray-600">{department.description}</div>
              </td>
              <td className="p-4">
                {/* Using DepartmentHelper buttons */}
                <DepartmentButtons 
                  department={department}
                  onEdit={handleEdit}
                  onDelete={onDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;
