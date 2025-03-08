const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Authentication middleware
 * Verifies JWT token and attaches user to request object
 */
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Check if token exists in cookies
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // If no token found, return unauthorized error
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request object
      req.user = await User.findById(decoded.id).select('-password');

      // If user not found, return unauthorized error
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Token is invalid or expired'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * Session management middleware
 * Checks if session is active and extends it if needed
 */
exports.sessionManager = (req, res, next) => {
  // Implement session timeout logic
  // This is a simple implementation; in production, you would use a more robust solution
  
  // Get session last activity time
  const lastActivity = req.session.lastActivity || 0;
  const currentTime = Date.now();
  
  // Check if session has expired (30 minute timeout)
  const sessionTimeout = 30 * 60 * 1000; // 30 minutes in milliseconds
  
  if (currentTime - lastActivity > sessionTimeout) {
    // Clear session and redirect to login
    req.session.destroy();
    return res.status(401).json({
      success: false,
      message: 'Session expired, please login again',
      redirect: '/login'
    });
  }
  
  // Update last activity time
  req.session.lastActivity = currentTime;
  next();
};