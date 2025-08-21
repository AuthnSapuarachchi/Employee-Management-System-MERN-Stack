import User from '../models/User.js';
import bcrypt from 'bcrypt';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        const isMatch = await bcrypt.comparePassword(password, user.password);
        
    } catch (error) {
        res.status(500).json({ error: 'Login error' });
    }
}

export { login }