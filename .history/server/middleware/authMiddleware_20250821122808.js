const verifyUser = async () => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
    } catch (error) {
        if (error.response && !error.data.error) {
            navigate('/login');
        }
    }
}