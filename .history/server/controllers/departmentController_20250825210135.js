const addDepartment = async (req, res) => {
    try {
        const { ddname, description } = req.body;
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Add Department Server error. Please try again.' });
    }
}

export { addDepartment };