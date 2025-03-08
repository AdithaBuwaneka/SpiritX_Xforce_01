import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaUserShield } from 'react-icons/fa';
import { signupUser } from '../services/authService';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Handle form input changes with client-side validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Basic client-side validation without API calls
    if (name === 'username') {
      if (value.trim() === '') {
        setErrors({ ...errors, [name]: 'Username is required' });
      } else if (value.length < 8) {
        setErrors({ ...errors, [name]: 'Username must be at least 8 characters long' });
      } else {
        // Clear the error if validation passes
        const newErrors = { ...errors };
        delete newErrors[name];
        setErrors(newErrors);
      }
    }
    
    if (name === 'password') {
      let hasError = false;
      let errorMessage = '';
      
      if (value.trim() === '') {
        hasError = true;
        errorMessage = 'Password is required';
      } else if (value.length < 8) {
        hasError = true;
        errorMessage = 'Password must be at least 8 characters long';
      } else if (!/[a-z]/.test(value)) {
        hasError = true;
        errorMessage = 'Password must contain at least one lowercase letter';
      } else if (!/[A-Z]/.test(value)) {
        hasError = true;
        errorMessage = 'Password must contain at least one uppercase letter';
      } else if (!/[^a-zA-Z0-9]/.test(value)) {
        hasError = true;
        errorMessage = 'Password must contain at least one special character';
      }
      
      if (hasError) {
        setErrors({ ...errors, [name]: errorMessage });
      } else {
        // Clear the error if validation passes
        const newErrors = { ...errors };
        delete newErrors[name];
        setErrors(newErrors);
      }
      
      // Calculate password strength
      let strength = 0;
      if (value.length >= 8) strength += 1;
      if (/[a-z]/.test(value)) strength += 1;
      if (/[A-Z]/.test(value)) strength += 1;
      if (/[0-9]/.test(value)) strength += 1;
      if (/[^a-zA-Z0-9]/.test(value)) strength += 1;
      
      setPasswordStrength(strength);
      
      // If confirm password is already entered, check if it still matches
      if (formData.confirmPassword) {
        if (formData.confirmPassword !== value) {
          setErrors({ ...errors, confirmPassword: 'Passwords do not match' });
        } else {
          const newErrors = { ...errors };
          delete newErrors.confirmPassword;
          setErrors(newErrors);
        }
      }
    }
    
    if (name === 'confirmPassword') {
      if (value.trim() === '') {
        setErrors({ ...errors, [name]: 'Confirm password is required' });
      } else if (value !== formData.password) {
        setErrors({ ...errors, [name]: 'Passwords do not match' });
      } else {
        // Clear the error if validation passes
        const newErrors = { ...errors };
        delete newErrors[name];
        setErrors(newErrors);
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all fields are filled
    if (!formData.username || !formData.password || !formData.confirmPassword) {
      setErrors({
        ...errors,
        form: 'All fields are required'
      });
      return;
    }
    
    // Check if there are any existing errors
    if (Object.keys(errors).length > 0) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await signupUser(formData);
      
      if (result.success) {
        toast.success('Signup successful! Redirecting to login...');
        
        // Show success message and redirect after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        // Handle validation errors from the server
        const serverErrors = {};
        
        if (result.errors && result.errors.length > 0) {
          result.errors.forEach(err => {
            serverErrors[err.field] = err.message;
          });
        } else {
          serverErrors.form = result.message || 'An error occurred during signup';
        }
        
        setErrors(serverErrors);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({
        form: 'Server error. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <FaUserShield className="h-12 w-12 text-pink-500" />
          </div>
          <h1 className="text-3xl font-extrabold text-pink-500">SecureConnect</h1>
          <h2 className="mt-6 text-2xl font-bold text-white">Sign Up</h2>
          <p className="mt-2 text-sm text-gray-400">Create your account to get started</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Form error message */}
          {errors.form && (
            <div className="bg-red-900/50 text-red-200 p-3 rounded-md text-sm">
              {errors.form}
            </div>
          )}
          
          {/* Username field */}
          <div>
            <label htmlFor="username" className="sr-only">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-3 py-3 pl-10 border ${
                  errors.username ? 'border-red-500' : 'border-gray-600'
                } bg-gray-700 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                placeholder="Username (min. 8 characters)"
              />
            </div>
            {errors.username && (
              <p className="mt-1 text-sm text-red-400">{errors.username}</p>
            )}
          </div>
          
          {/* Password field */}
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-3 py-3 pl-10 pr-10 border ${
                  errors.password ? 'border-red-500' : 'border-gray-600'
                } bg-gray-700 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-500" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">{errors.password}</p>
            )}
            
            {/* Password strength meter */}
            {formData.password && (
              <div className="mt-2">
                <PasswordStrengthMeter strength={passwordStrength} />
              </div>
            )}
            
            {/* Password requirements */}
            <div className="mt-2 text-xs text-gray-400">
              <p>Password must contain:</p>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li className={formData.password.length >= 8 ? 'text-green-400' : ''}>
                  At least 8 characters
                </li>
                <li className={/[a-z]/.test(formData.password) ? 'text-green-400' : ''}>
                  One lowercase letter
                </li>
                <li className={/[A-Z]/.test(formData.password) ? 'text-green-400' : ''}>
                  One uppercase letter
                </li>
                <li className={/[^a-zA-Z0-9]/.test(formData.password) ? 'text-green-400' : ''}>
                  One special character
                </li>
              </ul>
            </div>
          </div>
          
          {/* Confirm Password field */}
          <div>
            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-3 py-3 pl-10 pr-10 border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
                } bg-gray-700 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                placeholder="Confirm Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-500" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
            )}
          </div>
          
          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-pink-500 hover:text-pink-400">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;