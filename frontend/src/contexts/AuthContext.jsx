import React, { createContext, useState, useContext, useEffect } from 'react';

// Create auth context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    console.log('AuthProvider initialized:', { 
      hasToken: !!storedToken, 
      hasUser: !!storedUser 
    });
    
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log('User restored from localStorage:', parsedUser);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        // Clear invalid data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = (newToken, username) => {
    console.log('Login called with:', { username, tokenReceived: !!newToken });
    
    if (!newToken) {
      console.error('Attempted login with empty token');
      return;
    }
    
    setToken(newToken);
    const userData = { username };
    setUser(userData);
    
    // Store in localStorage
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('Login complete - token and user stored');
  };

  // Logout function
  const logout = () => {
    console.log('Logout called');
    setToken(null);
    setUser(null);
    
    // Remove from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('Logout complete - token and user removed');
  };

  // Update user data
  const updateUser = (userData) => {
    console.log('Updating user data:', userData);
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // Check if user is authenticated
  const isAuthenticated = !!token;

  // Context value
  const value = {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};