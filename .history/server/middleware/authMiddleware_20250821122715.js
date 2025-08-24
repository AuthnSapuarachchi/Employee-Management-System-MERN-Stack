const verifyUser = async () => {
    try {
        const token = req.header
    } catch (error) {
        if (error.response && !error.data.error) {
            navigate('/login');
        }
    }
}