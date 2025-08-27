import Department from '../models/Department.js';

// Create Department
const addDepartment = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newDep = new Department({ name, description });
        await newDep.save();
        return res.status(201).json({ success: true, message: 'Department added successfully', department: newDep });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Add Department Server error. Please try again.' });
    }
}

// Read Departments
const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        return res.status(200).json({ success: true, departments });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Fetch Departments Server error. Please try again.' });
    }
}

// Update Department
const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const updated = await Department.findByIdAndUpdate(id, { name, description, updatedAt: Date.now() }, { new: true });
        if (!updated) return res.status(404).json({ success: false, error: 'Department not found.' });
        return res.status(200).json({ success: true, department: updated });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Update Department Server error. Please try again.' });
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