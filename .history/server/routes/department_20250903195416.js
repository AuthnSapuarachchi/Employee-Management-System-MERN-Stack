import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addDepartment, getDepartments, getDepartmentById, updateDepartment, deleteDepartment } from '../controllers/departmentController.js';

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
    res.json({ success: true, message: 'Department routes working' });
});

// Create (temporarily without auth for testing)
router.post('/add', addDepartment);
// Read
router.get('/', getDepartments);
// Read single department
router.get('/:id', authMiddleware, getDepartmentById);
// Update
router.put('/:id', authMiddleware, updateDepartment);
// Delete
router.delete('/:id', authMiddleware, deleteDepartment);

export default router;