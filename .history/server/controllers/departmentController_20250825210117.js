const addDepartment = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({ success: false, error: 'Add DepartmeServer error. Please try again.' });
    }
}

export { addDepartment };