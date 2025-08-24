import { useContext } from 'react';
import jwt from 'jsonwebtoken';

const verifyUser = async () => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(404).json({ success: false, error: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_KE);

    } catch (error) {
        if (error.response && !error.data.error) {
            navigate('/login');
        }
    }
}