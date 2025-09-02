import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const fixDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/employee_management');
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;
        const collection = db.collection('departments');

        // 1. Drop all existing indexes except _id
        console.log('Dropping existing indexes...');
        try {
            await collection.dropIndexes();
            console.log('All indexes dropped successfully');
        } catch (error) {
            console.log('No indexes to drop or error dropping indexes:', error.message);
        }

        // 2. Delete all documents with invalid data
        console.log('Cleaning up invalid documents...');
        const deleteResult = await collection.deleteMany({
            $or: [
                { name: null },
                { name: { $exists: false } },
                { dep_name: { $exists: true } }  // Remove old schema documents
            ]
        });
        console.log(`Deleted ${deleteResult.deletedCount} invalid documents`);

        // 3. Create the correct index
        console.log('Creating new index...');
        await collection.createIndex({ name: 1 }, { unique: true });
        console.log('Index created successfully');

        // 4. List all current documents
        const documents = await collection.find({}).toArray();
        console.log('Current documents in collection:', documents.length);
        documents.forEach((doc, index) => {
            console.log(`${index + 1}:`, { _id: doc._id, name: doc.name, description: doc.description });
        });

        console.log('Database fixed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error fixing database:', error);
        process.exit(1);
    }
};

fixDatabase();
