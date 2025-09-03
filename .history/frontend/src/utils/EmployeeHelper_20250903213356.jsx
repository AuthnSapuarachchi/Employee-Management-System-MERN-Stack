import axios from 'axios';
import React from 'react';

// API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get authorization headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

// Fetch all departments for employee form dropdown
export const fetchDepartments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/departments`, {
      headers: getAuthHeaders()
    });
    
    if (response.data.success) {
      return {
        success: true,
        departments: response.data.departments,
        error: null
      };
    } else {
      return {
        success: false,
        departments: [],
        error: 'Failed to fetch departments'
      };
    }
  } catch (error) {
    console.error('Error fetching departments:', error);
    let errorMessage = 'Failed to fetch departments. Please try again.';
    
    if (error.response?.status === 401) {
      errorMessage = 'Please login to view departments';
    }
    
    return {
      success: false,
      departments: [],
      error: errorMessage
    };
  }
};

// Fetch all employees
export const fetchEmployees = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employees`, {
      headers: getAuthHeaders()
    });
    
    if (response.data.success) {
      return {
        success: true,
        employees: response.data.employees,
        error: null
      };
    } else {
      return {
        success: false,
        employees: [],
        error: 'Failed to fetch employees'
      };
    }
  } catch (error) {
    console.error('Error fetching employees:', error);
    let errorMessage = 'Failed to fetch employees. Please try again.';
    
    if (error.response?.status === 401) {
      errorMessage = 'Please login to view employees';
    }
    
    return {
      success: false,
      employees: [],
      error: errorMessage
    };
  }
};

// Add new employee
export const addEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/employees`, employeeData, {
      headers: getAuthHeaders()
    });
    
    if (response.data.success) {
      return {
        success: true,
        employee: response.data.employee,
        error: null
      };
    } else {
      return {
        success: false,
        employee: null,
        error: response.data.message || 'Failed to add employee'
      };
    }
  } catch (error) {
    console.error('Error adding employee:', error);
    let errorMessage = 'Failed to add employee. Please try again.';
    
    if (error.response?.status === 401) {
      errorMessage = 'Please login to add employees';
    } else if (error.response?.status === 400) {
      errorMessage = error.response.data.message || 'Invalid employee data';
    }
    
    return {
      success: false,
      employee: null,
      error: errorMessage
    };
  }
};

// Update employee
export const updateEmployee = async (employeeId, employeeData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/employees/${employeeId}`, employeeData, {
      headers: getAuthHeaders()
    });
    
    if (response.data.success) {
      return {
        success: true,
        employee: response.data.employee,
        error: null
      };
    } else {
      return {
        success: false,
        employee: null,
        error: response.data.message || 'Failed to update employee'
      };
    }
  } catch (error) {
    console.error('Error updating employee:', error);
    let errorMessage = 'Failed to update employee. Please try again.';
    
    if (error.response?.status === 401) {
      errorMessage = 'Please login to update employees';
    } else if (error.response?.status === 404) {
      errorMessage = 'Employee not found';
    }
    
    return {
      success: false,
      employee: null,
      error: errorMessage
    };
  }
};

// Delete employee
export const deleteEmployee = async (employeeId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/employees/${employeeId}`, {
      headers: getAuthHeaders()
    });
    
    if (response.data.success) {
      return {
        success: true,
        error: null
      };
    } else {
      return {
        success: false,
        error: response.data.message || 'Failed to delete employee'
      };
    }
  } catch (error) {
    console.error('Error deleting employee:', error);
    let errorMessage = 'Failed to delete employee. Please try again.';
    
    if (error.response?.status === 401) {
      errorMessage = 'Please login to delete employees';
    } else if (error.response?.status === 404) {
      errorMessage = 'Employee not found';
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

// Get employee by ID
export const getEmployeeById = async (employeeId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employees/${employeeId}`, {
      headers: getAuthHeaders()
    });
    
    if (response.data.success) {
      return {
        success: true,
        employee: response.data.employee,
        error: null
      };
    } else {
      return {
        success: false,
        employee: null,
        error: 'Employee not found'
      };
    }
  } catch (error) {
    console.error('Error fetching employee:', error);
    let errorMessage = 'Failed to fetch employee. Please try again.';
    
    if (error.response?.status === 401) {
      errorMessage = 'Please login to view employee details';
    } else if (error.response?.status === 404) {
      errorMessage = 'Employee not found';
    }
    
    return {
      success: false,
      employee: null,
      error: errorMessage
    };
  }
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
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
      <button 
        onClick={handleDelete}
        className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
        title="Delete Employee"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};

// Employee data validation
export const validateEmployeeData = (employeeData) => {
  const errors = {};
  
  if (!employeeData.name || employeeData.name.trim() === '') {
    errors.name = 'Employee name is required';
  }
  
  if (!employeeData.email || employeeData.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(employeeData.email)) {
    errors.email = 'Email format is invalid';
  }
  
  if (!employeeData.position || employeeData.position.trim() === '') {
    errors.position = 'Position is required';
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
    formattedJoinDate: employee.joinDate ? new Date(employee.joinDate).toLocaleDateString() : 'N/A',
    formattedSalary: employee.salary ? `$${employee.salary.toLocaleString()}` : 'N/A'
  };
};

// Search and filter employees
export const filterEmployees = (employees, searchTerm, departmentFilter = '') => {
  if (!searchTerm && !departmentFilter) return employees;
  
  return employees.filter(employee => {
    const matchesSearch = !searchTerm || 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = !departmentFilter || 
      employee.department.toLowerCase().includes(departmentFilter.toLowerCase());
    
    return matchesSearch && matchesDepartment;
  });
};