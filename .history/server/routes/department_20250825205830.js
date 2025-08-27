import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addDepartment } from '../controllers/departmentController.js';

const router = express.Router()

router.post('/add', athMiddleware, addDepartment);

export default router;