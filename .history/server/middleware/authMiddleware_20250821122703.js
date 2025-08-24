const verifyUser = async () => {
    try {
        const token = localStorage.getItem('token');

        if (token) {
            const response = await axios.get("http://localhost:5000/api/auth/verify", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                setUser(response.data.user);
            } else {
                setUser(null);
            }
        } else {
            navigate('/login');
        }
    } catch (error) {
        if (error.response && !error.data.error) {
            navigate('/login');
        }
    }
}