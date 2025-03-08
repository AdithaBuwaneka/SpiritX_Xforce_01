import React from 'react';
import PropTypes from 'prop-types';

const PasswordStrengthMeter = ({ strength }) => {
  // Normalize strength to a 0-5 scale
  const normalizedStrength = Math.min(Math.max(strength, 0), 5);
  
  // Calculate width as percentage
  const percentage = (normalizedStrength / 5) * 100;
  
  // Determine color based on strength
  const getColor = () => {
    if (normalizedStrength <= 1) return 'bg-red-500'; // Very weak
    if (normalizedStrength <= 2) return 'bg-orange-500'; // Weak
    if (normalizedStrength <= 3) return 'bg-yellow-500'; // Medium
    if (normalizedStrength <= 4) return 'bg-blue-500'; // Strong
    return 'bg-green-500'; // Very strong
  };
  
  // Determine strength label
  const getLabel = () => {
    if (normalizedStrength <= 1) return 'Very Weak';
    if (normalizedStrength <= 2) return 'Weak';
    if (normalizedStrength <= 3) return 'Medium';
    if (normalizedStrength <= 4) return 'Strong';
    return 'Very Strong';
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-xs text-gray-400">Password Strength:</span>
        <span className="text-xs text-gray-400">{getLabel()}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${getColor()}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

PasswordStrengthMeter.propTypes = {
  strength: PropTypes.number.isRequired
};

export default PasswordStrengthMeter;