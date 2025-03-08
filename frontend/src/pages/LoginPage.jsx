import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaUserShield } from 'react-icons/fa';
import { loginUser } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle window resize for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle form input changes with client-side validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Basic client-side validation without API calls
    if (name === 'username') {
      if (value.trim() === '') {
        setErrors({ ...errors, [name]: 'Username is required' });
      } else {
        // Clear the error if validation passes
        const newErrors = { ...errors };
        delete newErrors[name];
        setErrors(newErrors);
      }
    }
    
    if (name === 'password') {
      if (value.trim() === '') {
        setErrors({ ...errors, [name]: 'Password is required' });
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
    if (!formData.username || !formData.password) {
      setErrors({
        ...errors,
        form: 'All fields are required'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log('Submitting login form...');
      const result = await loginUser(formData);
      console.log('Login result received:', { success: result.success });
      
      if (result.success) {
        // Verify token exists
        if (!result.token) {
          console.error('Login API returned success but no token!');
          setErrors({
            form: 'Server returned invalid response. Please try again.'
          });
          setIsSubmitting(false);
          return;
        }
        
        // Set user data in context
        login(result.token, result.username);
        
        toast.success(`Welcome back, ${result.username}!`);
        
        // Allow toast to display before navigation
        setTimeout(() => {
          navigate('/dashboard');
        }, 500);
      } else {
        // Handle validation errors from the server
        const serverErrors = {};
        
        if (result.errors && result.errors.length > 0) {
          result.errors.forEach(err => {
            serverErrors[err.field] = err.message;
          });
        } else {
          serverErrors.form = result.message || 'Invalid username or password';
        }
        
        setErrors(serverErrors);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        form: 'Server error. Please try again later.'
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md space-y-6 sm:space-y-8 bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg transition-all duration-300">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <FaUserShield className="h-12 w-12 text-pink-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-pink-500">SecureConnect</h1>
          <h2 className="mt-4 sm:mt-6 text-xl sm:text-2xl font-bold text-white">Login</h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-400">Sign in to your account</p>
        </div>
        
        <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          {/* Form error message */}
          {errors.form && (
            <div className="bg-red-900/50 text-red-200 p-2 sm:p-3 rounded-md text-xs sm:text-sm">
              {errors.form}
            </div>
          )}
          
          {/* Username field */}
          <div>
            <label htmlFor="username" className="sr-only">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* User SVG icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-3 py-2 sm:py-3 pl-10 border ${
                  errors.username ? 'border-red-500' : 'border-gray-600'
                } bg-gray-700 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base`}
                placeholder="Username"
              />
            </div>
            {errors.username && (
              <p className="mt-1 text-xs sm:text-sm text-red-400">{errors.username}</p>
            )}
          </div>
          
          {/* Password field */}
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* Lock SVG icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-3 py-2 sm:py-3 pl-10 pr-10 border ${
                  errors.password ? 'border-red-500' : 'border-gray-600'
                } bg-gray-700 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base`}
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                ) : (
                  <FaEye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs sm:text-sm text-red-400">{errors.password}</p>
            )}
          </div>
          
          {/* Submit button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <LoadingSpinner size={windowWidth < 640 ? "xs" : "sm"} color="white" />
                  <span className="ml-2">Logging In...</span>
                </span>
              ) : (
                'Login'
              )}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-xs sm:text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-pink-500 hover:text-pink-400">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;