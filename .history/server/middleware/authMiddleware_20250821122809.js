const verifyUser = async () => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, error: 'No token provided' });
        }
    } catch (error) {
        if (error.response && !error.data.error) {
            navigate('/login');
        }
    }
}