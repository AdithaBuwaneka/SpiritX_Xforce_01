import axios from 'axios';

// Create axios instance with base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Add request interceptor to include token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Try different token format - adjust based on your backend requirements
      // Option 1: Bearer token (most common)
      config.headers.Authorization = `Bearer ${token}`;
      
      // Option 2: Just the token without Bearer prefix
      // config.headers.Authorization = token;
      
      // Option 3: With Token prefix instead of Bearer
      // config.headers.Authorization = `Token ${token}`;
      
      console.log('Request URL:', config.url);
      console.log('Adding token to request headers');
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

/**
 * Validate a single field in real-time
 * @param {Object} data - The field data to validate
 * @returns {Promise} - The validation result
 */
export const validateField = async (data) => {
  try {
    const response = await api.post('/auth/validate', data);
    return response.data;
  } catch (error) {
    console.error('Field validation error:', error);
    // Return a safe default response that won't break the UI
    return {
      success: false,
      field: data.field,
      errors: []
    };
  }
};

/**
 * Register a new user
 * @param {Object} userData - The user registration data
 * @returns {Promise} - The registration result
 */
export const signupUser = async (userData) => {
  try {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    if (error.response && error.response.data) {
      return error.response.data;
    }
    // Return a safe default response for network errors
    return {
      success: false,
      message: 'Could not connect to the server. Please check your internet connection and try again.'
    };
  }
};

/**
 * Login a user
 * @param {Object} credentials - The login credentials
 * @returns {Promise} - The login result
 */
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    
    // Log headers and entire response for debugging
    console.log('Login response status:', response.status);
    console.log('Login response data:', response.data);
    
    // Store token immediately if present
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      console.log('Token stored in localStorage');
      
      // Also store in sessionStorage as backup
      sessionStorage.setItem('token', response.data.token);
    } else {
      console.error('No token in login response!');
    }
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return {
      success: false,
      message: 'Could not connect to the server. Please check your internet connection and try again.'
    };
  }
};

/**
 * Get current user information
 * @returns {Promise} - The user data
 */
export const getCurrentUser = async () => {
  try {
    console.log('Fetching current user data...');
    const response = await api.get('/auth/me');
    console.log('User data fetched successfully');
    return response.data;
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
};

/**
 * Logout a user
 * @returns {Promise} - The logout result
 */
export const logoutUser = async () => {
  try {
    const response = await api.get('/auth/logout');
    // Clear storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    return response.data;
  } catch (error) {
    console.error('Logout error:', error);
    // Clear storage anyway
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    return {
      success: true,
      message: 'Logged out locally. Server sync failed.'
    };
  }
};

export default api;