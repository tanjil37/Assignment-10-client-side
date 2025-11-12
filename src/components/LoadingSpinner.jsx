import React from 'react';

const LoadingSpinner = ({size = 8}) => {
    return (
         <div className="flex items-center justify-center">
      <div style={{ width: size * 4, height: size * 4 }} className="animate-spin border-4 border-dashed rounded-full border-indigo-600 border-t-transparent"></div>
    </div>
    );
};

export default LoadingSpinner;