import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
    dep_name: { type: String, required: true, unique: true },
});