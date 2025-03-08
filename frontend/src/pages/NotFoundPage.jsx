import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const NotFoundPage = () => {
  const { isAuthenticated } = useAuth();
  const redirectPath = isAuthenticated ? '/dashboard' : '/login';

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <FaExclamationTriangle className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
        <h1 className="text-4xl font-bold text-white mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to={redirectPath}
          className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
        >
          <FaArrowLeft className="mr-2" />
          {isAuthenticated ? 'Back to Dashboard' : 'Back to Login'}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;