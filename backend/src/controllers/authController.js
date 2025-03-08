const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

/**
 * Controller for user registration
 * Handles validation and user creation
 */
exports.signup = async (req, res) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(error => ({
          field: error.param,
          message: error.msg
        }))
      });
    }

    const { username, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        errors: [{ field: 'username', message: 'Username already exists' }]
      });
    }

    // Check password strength
    const passwordStrength = User.checkPasswordStrength(password);
    
    // Create new user
    const user = new User({
      username,
      password
    });

    await user.save();

    // Generate JWT token
    const token = generateToken(user);

    // Return success response
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      passwordStrength,
      redirectUrl: '/login'
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during registration',
      errors: [{ field: 'server', message: 'Internal server error' }]
    });
  }
};

/**
 * Controller for user login
 * Handles validation and authentication
 */
exports.login = async (req, res) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(error => ({
          field: error.param,
          message: error.msg
        }))
      });
    }

    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        success: false,
        errors: [{ field: 'username', message: 'Username doesn\'t exist' }]
      });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        errors: [{ field: 'password', message: 'Password is incorrect' }]
      });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Return success response
    return res.status(200).json({
      success: true,
      message: `Hello, ${username}!`,
      token,
      username
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during login',
      errors: [{ field: 'server', message: 'Internal server error' }]
    });
  }
};

/**
 * Controller for user logout
 * Invalidates token on client side
 */
exports.logout = (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Logout successful'
  });
};

/**
 * Controller to get current user information
 * Uses authentication middleware to verify token
 */
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get current user error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};