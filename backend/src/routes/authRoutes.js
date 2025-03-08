const express = require('express');
const router = express.Router();
const { signup, login, logout, getCurrentUser } = require('../controllers/authController');
const { validateSignup, validateLogin, validateField } = require('../middlewares/validationMiddleware');
const { protect, sessionManager } = require('../middlewares/authMiddleware');

/**
 * Auth Routes
 * 
 * POST /api/auth/signup - Register a new user
 * POST /api/auth/login - Authenticate a user
 * GET /api/auth/logout - Logout a user
 * GET /api/auth/me - Get current user
 * POST /api/auth/validate - Validate a field in real-time
 */

// Signup route
router.post('/signup', validateSignup, signup);

// Login route
router.post('/login', validateLogin, login);

// Logout route
router.get('/logout', logout);

// Get current user route (protected)
router.get('/me', protect, sessionManager, getCurrentUser);

// Field validation route (for real-time validation)
router.post('/validate', validateField);

module.exports = router;