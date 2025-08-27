const addDepartment = async (req, res) => {
    try {
        const { dep_name, description } = req.body;
        const newDep = new Department({ 
            dep_name, 
            description 
        })
        await newDep.save();
        return res.status(201).json({ success: true, message: 'Department added successfully', department: newDep });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Add Department Server error. Please try again.' });
    }
}

export { addDepartment };