import mongoose from 'mongoose';
import User from './models/User.js';
import bcrypt from 'bcrypt';

const userRegister = () => {
    try {
        const hashPassword = bcrypt.hash('admin', 10);
        const newUser = new User({
            name: 'Admin User',
            email: 'admin@gmail.com',
            password: hashPassword,
            role: 'admin',
        })
        const newUser
    } catch (error) {
        console.error("Error in user registration:", error);
    }
}