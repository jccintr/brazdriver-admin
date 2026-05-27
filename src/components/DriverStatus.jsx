import React from 'react';

const DriverStatus = ({ online }) => {
  const isOnline = online === true;

  return (
    <div className="flex items-center gap-1.5">
      <div
        className={`w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
          isOnline 
            ? 'bg-green-500 animate-pulse' 
            : 'bg-gray-400'
        }`}
      />
      <span
        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
          isOnline 
            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
        }`}
      >
        {isOnline ? 'Online' : 'Offline'}
      </span>
    </div>
  );
};

export default DriverStatus;