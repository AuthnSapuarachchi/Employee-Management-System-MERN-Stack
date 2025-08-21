import User from '../models/User.js';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ s error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Login error' });
    }
}

export { login }