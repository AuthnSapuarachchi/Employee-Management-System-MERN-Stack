const addDepartment = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({ success: false, error: 'Server error. Please try again.' });
    }
}

export { addDepartment };