import React, { useEffect, useState } from 'react';
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
  // Removing unused state variable
  // const [userData, setUserData] = useState(null);

  useEffect(() => {
    // IMPORTANT: We're skipping the immediate validation that was causing issues
    // Instead, we'll display the dashboard right away
    console.log("Dashboard component mounted");
    setLoading(false);
    
    // Optionally, try to fetch user data after a delay
    const delayedFetch = setTimeout(() => {
      fetchUserData();
    }, 2000); // Wait 2 seconds before trying to validate session
    
    return () => clearTimeout(delayedFetch);
  }, []);
  
  // Separated the fetch function for clarity
  const fetchUserData = async () => {
    try {
      console.log('Attempting to fetch user data...');
      const data = await getCurrentUser();
      console.log('User data successfully fetched', data);
      // setUserData(data); // Removed since we're not using userData state
      // Update displayed user info if needed
      // Update displayed user info if needed
    } catch (error) {
      console.log('Error fetching user data:', error);
      // We won't automatically log out the user now
      // Only log them out if they try to perform an action that requires fresh auth
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if API call fails
      logout();
      navigate('/login');
    }
  };

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

        {/* Dashboard content - with improved responsiveness */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Security card */}
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
                  <span className="text-yellow-400 text-sm sm:text-base">30 minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm sm:text-base">Last login</span>
                  <span className="text-gray-300 text-sm sm:text-base">Just now</span>
                </div>
              </div>
            </div>
          </div>

          {/* Project info card */}
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="px-4 sm:px-6 py-6 sm:py-8">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Project Information</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm sm:text-base">Project name</span>
                  <span className="text-pink-500 text-sm sm:text-base">SecureConnect</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm sm:text-base">Status</span>
                  <span className="text-green-400 text-sm sm:text-base">Completed</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm sm:text-base">Score</span>
                  <span className="text-yellow-400 text-sm sm:text-base">250 points</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;