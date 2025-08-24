import { useContext } from 'react';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const verifyUser = async () => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(404).json({ success: false, error: 'No token provided' });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ success: false, error: 'Invalid token' });
        }
        const user = await User.findById({_id : decoded._id}.select('-password');
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        req

    } catch (error) {
        if (error.response && !error.data.error) {
            navigate('/login');
        }
    }
}