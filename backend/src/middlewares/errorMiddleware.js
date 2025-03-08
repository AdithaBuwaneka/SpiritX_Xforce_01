/**
 * Global error handling middleware
 * Formats and returns appropriate error responses
 */
const errorHandler = (err, req, res, next) => {
    // Log error for server-side debugging
    console.error(err.stack);
  
    // Default status code and message
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || 'Something went wrong on the server';
    let errors = [];
  
    // Handle mongoose validation errors
    if (err.name === 'ValidationError') {
      statusCode = 400;
      message = 'Validation errors occurred';
      
      // Format mongoose validation errors
      Object.keys(err.errors).forEach(key => {
        errors.push({
          field: key,
          message: err.errors[key].message
        });
      });
    }
  
    // Handle mongoose duplicate key errors
    if (err.code === 11000) {
      statusCode = 400;
      message = 'Duplicate field value entered';
      
      // Extract field name from error message
      const field = Object.keys(err.keyValue)[0];
      errors.push({
        field,
        message: `${field} already exists`
      });
    }
  
    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
      statusCode = 401;
      message = 'Invalid token';
    }
  
    // Handle JWT expiration
    if (err.name === 'TokenExpiredError') {
      statusCode = 401;
      message = 'Token expired';
    }
  
    // Return formatted error response
    res.status(statusCode).json({
      success: false,
      message,
      errors: errors.length > 0 ? errors : [{ field: 'server', message }],
      stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
  };
  
  module.exports = errorHandler;