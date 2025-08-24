const verifyUser = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/auth/verify");
        if (response.data.success) {
            setUser(response.data.user);
        } else {
            setUser(null);
        }
    } catch (error) {
        if (error.response && !error.data.error) {
            navigate('/login');
        }
    }
}