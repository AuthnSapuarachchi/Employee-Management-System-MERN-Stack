import mongoose from 'mongoose';
import User from './models/User.js';

const userRegister = () => {
    try {
        const hash
        const newUser = new User({
            name: 'Admin User',
            email: 'admin@gmail.com',
            password: 'admin',
        });
    } catch (error) {
        console.error("Error in user registration:", error);
    }
}