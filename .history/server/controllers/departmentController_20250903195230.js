import Department from '../models/Department.js';

// Create Department
const addDepartment = async (req, res) => {
    try {
        console.log('=== ADD DEPARTMENT REQUEST ===');
        console.log('Request body:', req.body);
        console.log('User from auth:', req.user);
        
        const { name, description } = req.body;
        
        // Validate input
        if (!name || name.trim() === '') {
            console.log('Validation failed: Department name is required');
            return res.status(400).json({ 
                success: false, 
                error: 'Department name is required' 
            });
        }

        // Check if department already exists
        console.log('Checking for existing department with name:', name);
        const existingDepartment = await Department.findOne({ name: name.trim() });
        if (existingDepartment) {
            console.log('Department already exists:', existingDepartment);
            return res.status(400).json({ 
                success: false, 
                error: 'Department with this name already exists' 
            });
        }

        // Create new department
        const departmentData = {
            name: name.trim(),
            description: description ? description.trim() : ''
        };
        
        console.log('Creating new department with data:', departmentData);
        const newDep = new Department(departmentData);
        const savedDepartment = await newDep.save();
        console.log('Department created successfully:', savedDepartment);
        
        return res.status(201).json({ 
            success: true, 
            message: 'Department added successfully', 
            department: savedDepartment 
        });
    } catch (error) {
        console.error('=== ADD DEPARTMENT ERROR ===');
        console.error('Error type:', error.name);
        console.error('Error message:', error.message);
        console.error('Full error:', error);
        
        // Handle specific MongoDB errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                success: false, 
                error: 'Validation error: ' + error.message 
            });
        }
        
        if (error.code === 11000) {
            return res.status(400).json({ 
                success: false, 
                error: 'Department with this name already exists' 
            });
        }
        
        return res.status(500).json({ 
            success: false, 
            error: 'Server error while adding department. Please try again.' 
        });
    }
}

// Read Departments
const getDepartments = async (req, res) => {
    try {
        console.log('=== GET DEPARTMENTS REQUEST ===');
        console.log('User from auth:', req.user);
        
        const departments = await Department.find().sort({ createdAt: -1 });
        console.log('Departments fetched successfully:', departments.length, 'departments found');
        
        return res.status(200).json({ 
            success: true, 
            departments 
        });
    } catch (error) {
        console.error('=== GET DEPARTMENTS ERROR ===');
        console.error('Error:', error);
        return res.status(500).json({ 
            success: false, 
            error: 'Server error while fetching departments. Please try again.' 
        });
    }
}

// Update Department
const updateDepartment = async (req, res) => {
    try {
        console.log('=== UPDATE DEPARTMENT REQUEST ===');
        console.log('Department ID:', req.params.id);
        console.log('Request body:', req.body);
        console.log('User from auth:', req.user);
        
        const { id } = req.params;
        const { name, description } = req.body;
        
        // Validate input
        if (!name || name.trim() === '') {
            console.log('Validation failed: Department name is required');
            return res.status(400).json({ 
                success: false, 
                error: 'Department name is required' 
            });
        }

        // Check if department exists
        const existingDepartment = await Department.findById(id);
        if (!existingDepartment) {
            console.log('Department not found with ID:', id);
            return res.status(404).json({ 
                success: false, 
                error: 'Department not found' 
            });
        }

        // Check if another department with the same name exists (excluding current one)
        const duplicateDepartment = await Department.findOne({ 
            name: name.trim(), 
            _id: { $ne: id } 
        });
        
        if (duplicateDepartment) {
            console.log('Another department with this name already exists:', duplicateDepartment);
            return res.status(409).json({ 
                success: false, 
                error: 'Another department with this name already exists' 
            });
        }

        // Update department
        const updatedData = {
            name: name.trim(),
            description: description ? description.trim() : '',
            updatedAt: Date.now()
        };
        
        console.log('Updating department with data:', updatedData);
        const updated = await Department.findByIdAndUpdate(id, updatedData, { 
            new: true, 
            runValidators: true 
        });
        
        console.log('Department updated successfully:', updated);
        return res.status(200).json({ 
            success: true, 
            message: 'Department updated successfully',
            department: updated 
        });
    } catch (error) {
        console.error('=== UPDATE DEPARTMENT ERROR ===');
        console.error('Error type:', error.name);
        console.error('Error message:', error.message);
        console.error('Full error:', error);
        
        // Handle specific MongoDB errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                success: false, 
                error: 'Validation error: ' + error.message 
            });
        }
        
        if (error.code === 11000) {
            return res.status(409).json({ 
                success: false, 
                error: 'Department with this name already exists' 
            });
        }
        
        if (error.name === 'CastError') {
            return res.status(400).json({ 
                success: false, 
                error: 'Invalid department ID format' 
            });
        }
        
        return res.status(500).json({ 
            success: false, 
            error: 'Server error while updating department. Please try again.' 
        });
    }
}

// Delete Department
const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Department.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ success: false, error: 'Department not found.' });
        return res.status(200).json({ success: true, message: 'Department deleted.' });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Delete Department Server error. Please try again.' });
    }
}

export { addDepartment, getDepartments, updateDepartment, deleteDepartment };