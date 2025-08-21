const login = async (req, res) => {
    try {
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: 'Login error' });
    }
}

export { login }