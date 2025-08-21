import express from 'express';
import { login } from '../controllers/authController';
import e from 'express';

const route = express.Router();

route.post('/login', login )

e