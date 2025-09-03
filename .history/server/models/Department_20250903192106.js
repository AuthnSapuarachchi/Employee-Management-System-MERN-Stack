import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Create index safely after model is created
departmentSchema.index({ name: 1 }, { unique: true });

const Department = mongoose.model('Department', departmentSchema);

// Handle index creation errors gracefully
Department.collection.createIndex({ name: 1 }, { unique: true }).catch((error) => {
    console.log('Index creation note:', error.message);
});

export default Department