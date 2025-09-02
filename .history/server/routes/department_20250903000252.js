import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addDepartment, getDepartments, updateDepartment, deleteDepartment } from '../controllers/departmentController.js';

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
    res.json({ success: true, message: 'Department routes working' });
});

// Create (temporarily without auth for testing)
router.post('/add', authMiddleware, addDepartment);
// Read
router.get('/',  getDepartments);
// Update
router.put('/:id', authMiddleware, updateDepartment);
// Delete
router.delete('/:id', authMiddleware, deleteDepartment);

export default router;