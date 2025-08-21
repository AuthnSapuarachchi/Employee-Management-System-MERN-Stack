import mongoose from 'mongoose';
import User from './models/User.js';

const userRegister = () => {
    try {
        const newUser = new User({
            name: 'Admin User',
            email: '
        });
    } catch (error) {
        console.error("Error in user registration:", error);
    }
}