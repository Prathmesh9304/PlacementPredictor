import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-xl font-bold">PlacementPredictor</h2>
            <p className="text-gray-300 mt-2">Predict your placement chances with ML</p>
          </div>
          
          <div className="flex flex-row space-x-6 mb-6 md:mb-0">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/predict" className="text-gray-300 hover:text-white transition-colors">
              Predict
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} PlacementPredictor. All rights reserved.</p>
          <p className="mt-2 text-sm">Created as a Machine Learning Lab Project</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;