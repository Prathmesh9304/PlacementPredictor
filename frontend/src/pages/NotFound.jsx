import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">404 - Page Not Found</h1>
        <p className="text-base sm:text-lg mb-8 text-gray-600">The page you are looking for does not exist or has been moved.</p>
        <Link 
          to="/" 
          className="inline-flex items-center px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md"
        >
          <FaHome className="mr-2" /> Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;