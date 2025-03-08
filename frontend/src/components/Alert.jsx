import React from 'react';
import PropTypes from 'prop-types';
import { FaCheckCircle, FaInfoCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';

const Alert = ({ type = 'info', message, onClose }) => {
  // Define styles based on type
  const styles = {
    success: {
      bg: 'bg-green-900/50',
      text: 'text-green-200',
      icon: <FaCheckCircle className="h-5 w-5 text-green-400" />
    },
    info: {
      bg: 'bg-blue-900/50',
      text: 'text-blue-200',
      icon: <FaInfoCircle className="h-5 w-5 text-blue-400" />
    },
    warning: {
      bg: 'bg-yellow-900/50',
      text: 'text-yellow-200',
      icon: <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
    },
    error: {
      bg: 'bg-red-900/50',
      text: 'text-red-200',
      icon: <FaTimesCircle className="h-5 w-5 text-red-400" />
    }
  };

  const { bg, text, icon } = styles[type] || styles.info;

  return (
    <div className={`${bg} ${text} p-4 rounded-md flex items-start`}>
      <div className="flex-shrink-0 mr-3 mt-0.5">
        {icon}
      </div>
      <div className="flex-grow">
        <p className="text-sm">{message}</p>
      </div>
      {onClose && (
        <button
          className="ml-auto -mr-1 -mt-1 bg-transparent text-current hover:text-white"
          onClick={onClose}
        >
          <span className="sr-only">Dismiss</span>
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func
};

export default Alert;