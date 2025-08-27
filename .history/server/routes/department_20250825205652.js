import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import

const router = express.Router()

router.post('/add', authMiddleware, )