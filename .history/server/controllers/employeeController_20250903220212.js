import Employee from '../models/Employee.js';
import Department from '../models/Department.js';

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate('department', 'name description')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      employees
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error - Failed to fetch employees'
    });
  }
};

// Get single employee
const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate('department', 'name description');
    
    if (!employee) {
      return res.status(404).json({
        success: false,
        error: 'Employee not found'
      });
    }
    
    res.status(200).json({
      success: true,
      employee
    });
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error - Failed to fetch employee'
    });
  }
};

// Create new employee
const createEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      position,
      department,
      salary,
      status,
      joinDate,
      address,
      dateOfBirth,
      emergencyContact
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !position || !department || !salary || !joinDate) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields'
      });
    }

    // Check if email already exists
    const existingEmployee = await Employee.findOne({ email: email.toLowerCase() });
    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        error: 'Employee with this email already exists'
      });
    }

    // Verify department exists
    const departmentExists = await Department.findById(department);
    if (!departmentExists) {
      return res.status(400).json({
        success: false,
        error: 'Invalid department selected'
      });
    }

    // Create new employee
    const employee = new Employee({
      name,
      email: email.toLowerCase(),
      phone,
      position,
      department,
      salary: Number(salary),
      status: status || 'Active',
      joinDate: new Date(joinDate),
      address,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      emergencyContact
    });

    await employee.save();
    
    // Populate department details for response
    await employee.populate('department', 'name description');

    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      employee
    });
  } catch (error) {
    console.error('Error creating employee:', error);
    
    if (error.code === 11000) {
      // Duplicate key error
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        error: `Employee with this ${field} already exists`
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error - Failed to create employee'
    });
  }
};

// Update employee
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Verify department exists if being updated
    if (updates.department) {
      const departmentExists = await Department.findById(updates.department);
      if (!departmentExists) {
        return res.status(400).json({
          success: false,
          error: 'Invalid department selected'
        });
      }
    }

    // Convert salary to number if provided
    if (updates.salary) {
      updates.salary = Number(updates.salary);
    }

    // Convert dates if provided
    if (updates.joinDate) {
      updates.joinDate = new Date(updates.joinDate);
    }
    if (updates.dateOfBirth) {
      updates.dateOfBirth = new Date(updates.dateOfBirth);
    }

    const employee = await Employee.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).populate('department', 'name description');

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: 'Employee not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      employee
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    
    if (error.code === 11000) {
      // Duplicate key error
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        error: `Employee with this ${field} already exists`
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error - Failed to update employee'
    });
  }
};

// Delete employee
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    
    if (!employee) {
      return res.status(404).json({
        success: false,
        error: 'Employee not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Employee deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error - Failed to delete employee'
    });
  }
};

// Get employee statistics
const getEmployeeStats = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const activeEmployees = await Employee.countDocuments({ status: 'Active' });
    const inactiveEmployees = await Employee.countDocuments({ status: 'Inactive' });
    const onLeaveEmployees = await Employee.countDocuments({ status: 'On Leave' });
    
    // Department-wise employee count
    const departmentStats = await Employee.aggregate([
      {
        $lookup: {
          from: 'departments',
          localField: 'department',
          foreignField: '_id',
          as: 'departmentInfo'
        }
      },
      {
        $unwind: '$departmentInfo'
      },
      {
        $group: {
          _id: '$departmentInfo.name',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        total: totalEmployees,
        active: activeEmployees,
        inactive: inactiveEmployees,
        onLeave: onLeaveEmployees,
        byDepartment: departmentStats
      }
    });
  } catch (error) {
    console.error('Error fetching employee stats:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error - Failed to fetch employee statistics'
    });
  }
};

export {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats
};
