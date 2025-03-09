import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaSignOutAlt, FaUserShield } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { logoutUser, getCurrentUser } from '../services/authService';
import LoadingSpinner from '../components/LoadingSpinner';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  
  // Add states for session management
  const [sessionTime, setSessionTime] = useState(30 * 60); // 30 minutes in seconds
  const [lastLoginTime, setLastLoginTime] = useState(new Date().toLocaleTimeString());

  // Handle logout with useCallback
  const handleLogout = useCallback(async () => {
    try {
      // Display toast notification when user clicks logout
      toast.success('Logged out successfully', {
        id: 'logout-success',
        duration: 3000 // 3 seconds
      });
      
      await logoutUser();
      logout();
      navigate('/login');
    
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if API call fails
      toast.error('Error during logout, redirecting anyway', {
        id: 'logout-error',
        duration: 3000
      });
      logout();
      navigate('/login');
    }
  }, [logout, navigate]);

  // Handle session timeout with useCallback
  const handleSessionTimeout = useCallback(() => {
    // Use toast.error with an ID to prevent duplicates
    toast.error('Your session has expired. Please login again.', {
      id: 'session-timeout', // Unique ID prevents duplicate toasts
      duration: 5000 // 5 seconds
    });
    handleLogout();
  }, [handleLogout]);

  // Fetch user data with useCallback  
  const fetchUserData = useCallback(async () => {
    try {
      console.log('Attempting to fetch user data...');
      const data = await getCurrentUser();
      console.log('User data successfully fetched', data);
      
      // Update last login time if available in the API response
      if (data && data.lastLogin) {
        setLastLoginTime(new Date(data.lastLogin).toLocaleString());
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
      // We won't automatically log out the user now
    }
  }, []);

  // Format time function for countdown display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    // Display the dashboard right away
    console.log("Dashboard component mounted");
    setLoading(false);
    
    // Optionally, try to fetch user data after a delay
    const delayedFetch = setTimeout(() => {
      fetchUserData();
    }, 2000); // Wait 2 seconds before trying to validate session
    
    // Session timer countdown
    const timer = setInterval(() => {
      setSessionTime(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSessionTimeout();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => {
      clearTimeout(delayedFetch);
      clearInterval(timer);
    };
  }, [fetchUserData, handleSessionTimeout]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" color="pink" />
          <p className="mt-4 text-white">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <FaUserShield className="h-8 w-8 text-pink-500 mr-3" />
            <h1 className="text-2xl font-bold text-white">SecureConnect</h1>
          </div>
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Welcome card */}
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6 sm:mb-10">
          <div className="px-4 sm:px-6 py-6 sm:py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-0">
                Hello, <span className="text-pink-500">{user?.username || 'User'}</span>!
              </h2>
              <div className="bg-green-600 px-3 py-1 rounded-full text-sm font-medium text-white self-start sm:self-auto">
                Logged In
              </div>
            </div>
            <p className="mt-4 text-gray-400 text-sm sm:text-base">
              You've successfully logged into your secure dashboard. Your session is active and protected.
            </p>
          </div>
        </div>

        {/* Security card with live session timer */}
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 sm:px-6 py-6 sm:py-8">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Security Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm sm:text-base">Secure connection</span>
                <span className="text-green-400 text-sm sm:text-base">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm sm:text-base">Session expires in</span>
                <span className={`text-sm sm:text-base ${sessionTime < 300 ? 'text-red-400' : 'text-yellow-400'}`}>
                  {formatTime(sessionTime)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm sm:text-base">Last login</span>
                <span className="text-gray-300 text-sm sm:text-base">{lastLoginTime}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;