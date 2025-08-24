import { useContext } from 'react';
import jwt from 'jsonwebtoken';

const verifyUser = async () => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(404).json({ success: false, error: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ success: false, error: 'Invalid token' });
        }

    } catch (error) {
        if (error.response && !error.data.error) {
            navigate('/login');
        }
    }
}