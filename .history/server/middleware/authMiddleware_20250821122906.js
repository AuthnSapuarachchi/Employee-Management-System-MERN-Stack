import { useContext } from 'react';


const verifyUser = async () => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(404).json({ success: false, error: 'No token provided' });
        }



    } catch (error) {
        if (error.response && !error.data.error) {
            navigate('/login');
        }
    }
}