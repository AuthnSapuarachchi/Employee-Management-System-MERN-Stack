import React from 'react';

// Column definitions for data table
export const columns = [
  {
    name: 'S.No',
    selector: (row) => row.sno,
    sortable: true,
    width: '80px'
  },
  {
    name: 'Department Name',
    selector: (row) => row.name,
    sortable: true,
    grow: 2
  },
  {
    name: 'Description',
    selector: (row) => row.description,
    sortable: true,
    grow: 3
  },
  {
    name: 'Actions',
    selector: (row) => row.action,
    center: true,
    width: '150px'
  }
];

// Reusable Department Action Buttons Component
export const DepartmentButtons = ({ department, onEdit, onDelete }) => {
    const handleEdit = () => {
        if (onEdit) {
            onEdit(department._id);
        }
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(department._id);
        }
    };

    return (
        <div className="flex justify-center space-x-2">
            <button 
                onClick={handleEdit}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                title="Edit Department"
            >
                Edit
            </button>
            <button 
                onClick={handleDelete}
                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                title="Delete Department"
            >
                Delete
            </button>
        </div>
    );
};

// Helper function to transform department data for table display
export const transformDepartmentData = (departments, onEdit, onDelete) => {
    return departments.map((department, index) => ({
        id: department._id,
        sno: index + 1,
        name: department.name,
        description: department.description || 'No description provided',
        action: (
            <DepartmentButtons 
                key={department._id}
                department={department} 
                onEdit={onEdit}
                onDelete={onDelete}
            />
        )
    }));
};

// Department table styles
export const tableStyles = {
    header: {
        style: {
            fontSize: '14px',
            fontWeight: 600,
            backgroundColor: '#f9fafb',
            borderBottom: '1px solid #e5e7eb'
        }
    },
    rows: {
        style: {
            fontSize: '14px',
            '&:hover': {
                backgroundColor: '#f9fafb',
                cursor: 'pointer'
            }
        }
    }
};