import express from 'express';
import { login, verify } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { verify } from 'jsonwebtoken';

const router = express.Router();

router.post('/login', login )
router.post('/verify', authMiddleware, verify)

export default router;