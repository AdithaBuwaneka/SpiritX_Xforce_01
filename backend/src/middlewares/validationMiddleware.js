const { check } = require('express-validator');

/**
 * Validation middleware for user signup
 * Checks for:
 * - Username at least 8 characters and unique
 * - Password with required strength (lowercase, uppercase, special character)
 * - Confirmation password matches
 */
exports.validateSignup = [
  // Username validation
  check('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 8 }).withMessage('Username must be at least 8 characters long')
    .trim(),
  
  // Password validation
  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[^a-zA-Z0-9]/).withMessage('Password must contain at least one special character'),
  
  // Confirm password validation
  check('confirmPassword')
    .notEmpty().withMessage('Confirm password is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
];

/**
 * Validation middleware for user login
 * Checks for:
 * - Username not empty
 * - Password not empty
 */
exports.validateLogin = [
  // Username validation
  check('username')
    .notEmpty().withMessage('Username is required')
    .trim(),
  
  // Password validation
  check('password')
    .notEmpty().withMessage('Password is required')
];

/**
 * Real-time validation for client-side feedback
 * Returns validation errors as they occur
 */
exports.validateField = (req, res) => {
  const { field, value } = req.body;
  let errors = [];

  switch (field) {
    case 'username':
      if (!value) {
        errors.push('Username is required');
      } else if (value.length < 8) {
        errors.push('Username must be at least 8 characters long');
      }
      break;
    
    case 'password':
      if (!value) {
        errors.push('Password is required');
      } else {
        if (value.length < 8) {
          errors.push('Password must be at least 8 characters long');
        }
        if (!/[a-z]/.test(value)) {
          errors.push('Password must contain at least one lowercase letter');
        }
        if (!/[A-Z]/.test(value)) {
          errors.push('Password must contain at least one uppercase letter');
        }
        if (!/[^a-zA-Z0-9]/.test(value)) {
          errors.push('Password must contain at least one special character');
        }
      }
      break;
    
    case 'confirmPassword':
      if (!value) {
        errors.push('Confirm password is required');
      } else if (value !== req.body.password) {
        errors.push('Passwords do not match');
      }
      break;
    
    default:
      errors.push('Invalid field');
  }

  return res.status(200).json({
    success: true,
    field,
    errors
  });
};