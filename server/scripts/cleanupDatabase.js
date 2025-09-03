import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const cleanupDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/employee_management_system');
        console.log('Connected to MongoDB');

        // Get the database
        const db = mongoose.connection.db;
        
        // Drop the entire departments collection to start fresh
        try {
            await db.collection('departments').drop();
            console.log('✅ Departments collection dropped successfully');
        } catch (error) {
            if (error.message === 'ns not found') {
                console.log('✅ Departments collection does not exist, nothing to drop');
            } else {
                console.log('❌ Error dropping collection:', error.message);
            }
        }

        // Drop all indexes on departments collection (if it exists)
        try {
            await db.collection('departments').dropIndexes();
            console.log('✅ All indexes dropped successfully');
        } catch (error) {
            console.log('ℹ️ No indexes to drop or collection does not exist');
        }

        console.log('✅ Database cleanup completed successfully!');
        
    } catch (error) {
        console.error('❌ Database cleanup failed:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Disconnected from MongoDB');
        process.exit(0);
    }
};

cleanupDatabase();
