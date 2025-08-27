import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addDepartment, getDepartments, updateDepartment, deleteDepartment } from '../controllers/departmentController.js';

const router = express.Router();

// Create
router.post('/add', authMiddleware, addDepartment);
// Read
router.get('/', authMiddleware, getDepartments);
// Update
router.put('/:id', authMiddleware, updateDepartment);
// Delete
router.delete('/:id', authMiddleware, deleteDepartment);

export default router;