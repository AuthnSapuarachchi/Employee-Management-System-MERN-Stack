import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
i

const router = express.Router()

router.post('/add', authMiddleware, )