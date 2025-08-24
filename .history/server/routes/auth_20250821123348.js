import express from 'express';
import { login } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login )
router.post('/verify', auth )

export default router;