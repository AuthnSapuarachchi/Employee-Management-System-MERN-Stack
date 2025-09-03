import axios from 'axios';
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const API_BASE_URL = 'http://localhost:5000/api';

// Get authentication headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
};

// Fetch all departments
export const fetchDepartments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/departments`, getAuthHeaders());
    if (response.data.success) {
      return response.data.departments;
    } else {
      throw new Error('Failed to fetch departments');
    }
  } catch (error) {
    console.error('Error fetching departments:', error);
    if (error.response && !error.response.data.success) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Failed to fetch departments');
  }
};

// Fetch all employees
export const fetchEmployees = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employees`, getAuthHeaders());
    if (response.data.success) {
      return response.data.employees;
    } else {
      throw new Error('Failed to fetch employees');
    }
  } catch (error) {
    console.error('Error fetching employees:', error);
    if (error.response && !error.response.data.success) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Failed to fetch employees');
  }
};

// Get single employee
export const getEmployeeById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employees/${id}`, getAuthHeaders());
    if (response.data.success) {
      return response.data.employee;
    } else {
      throw new Error('Failed to fetch employee');
    }
  } catch (error) {
    console.error('Error fetching employee:', error);
    if (error.response && !error.response.data.success) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Failed to fetch employee');
  }
};

// Add new employee
export const addEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/employees`, employeeData, getAuthHeaders());
    if (response.data.success) {
      return response.data.employee;
    } else {
      throw new Error('Failed to create employee');
    }
  } catch (error) {
    console.error('Error creating employee:', error);
    if (error.response && !error.response.data.success) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Failed to create employee');
  }
};

// Update employee
export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/employees/${id}`, employeeData, getAuthHeaders());
    if (response.data.success) {
      return response.data.employee;
    } else {
      throw new Error('Failed to update employee');
    }
  } catch (error) {
    console.error('Error updating employee:', error);
    if (error.response && !error.response.data.success) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Failed to update employee');
  }
};

// Delete employee
export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/employees/${id}`, getAuthHeaders());
    if (response.data.success) {
      return true;
    } else {
      throw new Error('Failed to delete employee');
    }
  } catch (error) {
    console.error('Error deleting employee:', error);
    if (error.response && !error.response.data.success) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Failed to delete employee');
  }
};

// Get employee statistics
export const getEmployeeStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employees/stats`, getAuthHeaders());
    if (response.data.success) {
      return response.data.stats;
    } else {
      throw new Error('Failed to fetch employee statistics');
    }
  } catch (error) {
    console.error('Error fetching employee stats:', error);
    if (error.response && !error.response.data.success) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Failed to fetch employee statistics');
  }
};

// Validate employee data
export const validateEmployeeData = (data) => {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.phone || data.phone.trim().length < 10) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!data.position || data.position.trim().length < 2) {
    errors.position = 'Position must be at least 2 characters long';
  }

  if (!data.department) {
    errors.department = 'Please select a department';
  }

  if (!data.salary || data.salary <= 0) {
    errors.salary = 'Please enter a valid salary';
  }

  if (!data.joinDate) {
    errors.joinDate = 'Please select a join date';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Format employee data for display
export const formatEmployeeData = (employee) => {
  return {
    ...employee,
    salary: `$${employee.salary.toLocaleString()}`,
    joinDate: new Date(employee.joinDate).toLocaleDateString(),
    departmentName: employee.department?.name || 'N/A'
  };
};

// Filter employees based on search criteria
export const filterEmployees = (employees, searchTerm, filterDepartment, filterStatus) => {
  return employees.filter(employee => {
    const matchesSearch = !searchTerm || 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = !filterDepartment || 
      employee.department._id === filterDepartment;

    const matchesStatus = !filterStatus || 
      employee.status === filterStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });
};

// Employee Action Buttons Component
export const EmployeeButtons = ({ employee, onEdit, onDelete }) => {
  const handleEdit = () => {
    if (onEdit) {
      onEdit(employee._id);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(employee._id);
    }
  };

  return (
    <div className="flex space-x-2">
      <button 
        onClick={handleEdit}
        className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors"
        title="Edit Employee"
      >
        <FaEdit className="h-4 w-4" />
      </button>
      <button 
        onClick={handleDelete}
        className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
        title="Delete Employee"
      >
        <FaTrash className="h-4 w-4" />
      </button>
    </div>
  );
};

// Table columns configuration
export const employeeColumns = [
  {
    key: 'employeeId',
    label: 'Employee ID',
    sortable: true
  },
  {
    key: 'name',
    label: 'Name',
    sortable: true
  },
  {
    key: 'email',
    label: 'Email',
    sortable: true
  },
  {
    key: 'position',
    label: 'Position',
    sortable: true
  },
  {
    key: 'department.name',
    label: 'Department',
    sortable: true
  },
  {
    key: 'salary',
    label: 'Salary',
    sortable: true,
    format: (value) => `$${value.toLocaleString()}`
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true
  },
  {
    key: 'joinDate',
    label: 'Join Date',
    sortable: true,
    format: (value) => new Date(value).toLocaleDateString()
  },
  {
    key: 'actions',
    label: 'Actions',
    sortable: false
  }
];