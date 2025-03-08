const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User schema with validation for username and password
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [8, 'Username must be at least 8 characters long'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save middleware to hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash the password if it's new or modified
  if (!this.isModified('password')) return next();
  
  try {
    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password for login validation
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Method to check password strength
userSchema.statics.checkPasswordStrength = function(password) {
  let strength = 0;
  
  // Check for lowercase letters
  if (/[a-z]/.test(password)) strength += 1;
  
  // Check for uppercase letters
  if (/[A-Z]/.test(password)) strength += 1;
  
  // Check for numbers
  if (/[0-9]/.test(password)) strength += 1;
  
  // Check for special characters
  if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
  
  // Check for length
  if (password.length >= 12) strength += 1;
  
  return strength; // 0-5 scale
};

const User = mongoose.model('User', userSchema);

module.exports = User;