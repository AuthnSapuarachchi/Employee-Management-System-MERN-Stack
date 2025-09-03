import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import departmentRoutes from './routes/department.js';
import employeeRoutes from './routes/employee.js';
import connectToDatabase from './db/db.js';
import path from 'path';
import mongoose from 'mongoose';

dotenv.config();

// Initialize database with cleanup
const initializeDatabase = async () => {
    try {
        await connectToDatabase();
        
        // Clean up any corrupted indexes
        const db = mongoose.connection.db;
        try {
            // Get existing indexes
            const indexes = await db.collection('departments').indexes();
            console.log('Existing department indexes:', indexes);
            
            // Check for problematic indexes and drop them
            for (const index of indexes) {
                if (index.name !== '_id_' && index.key && index.key.dep_name) {
                    console.log('Dropping corrupted index:', index.name);
                    await db.collection('departments').dropIndex(index.name);
                }
            }
        } catch (error) {
            console.log('Index cleanup info:', error.message);
        }
        
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Database initialization error:', error);
    }
};

initializeDatabase();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});