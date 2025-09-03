import express from 'express';
import {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats
} from '../controllers/employeeController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// GET /api/employees - Get all employees
router.get('/', getAllEmployees);

// GET /api/employees/stats - Get employee statistics
router.get('/stats', getEmployeeStats);

// GET /api/employees/:id - Get single employee
router.get('/:id', getEmployee);

// POST /api/employees - Create new employee
router.post('/', createEmployee);

// PUT /api/employees/:id - Update employee
router.put('/:id', updateEmployee);

// DELETE /api/employees/:id - Delete employee
router.delete('/:id', deleteEmployee);

module.exports = router;
