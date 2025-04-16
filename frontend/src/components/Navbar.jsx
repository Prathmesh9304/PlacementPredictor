import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4 px-4 sm:px-6 relative z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-blue-600 z-10">
          PlacementPredictor
        </NavLink>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-600 focus:outline-none z-10"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive 
                ? "text-blue-600 font-medium border-b-2 border-blue-600" 
                : "text-gray-600 hover:text-blue-600 transition-colors"
            }
            end
          >
            Home
          </NavLink>
          <NavLink 
            to="/predict" 
            className={({ isActive }) => 
              isActive 
                ? "text-blue-600 font-medium border-b-2 border-blue-600" 
                : "text-gray-600 hover:text-blue-600 transition-colors"
            }
          >
            Predict
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              isActive 
                ? "text-blue-600 font-medium border-b-2 border-blue-600" 
                : "text-gray-600 hover:text-blue-600 transition-colors"
            }
          >
            About
          </NavLink>
        </div>
      </div>

      {/* Mobile Menu - Modified to cover half screen and start from top */}
      <div 
        className={`fixed top-0 right-0 w-1/2 h-full bg-white z-40 shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        {/* Close button at the top */}
        <div className="flex justify-end p-4">
          <button 
            onClick={toggleMenu}
            className="text-gray-600 hover:text-blue-600 focus:outline-none"
          >
            <FaTimes size={24} />
          </button>
        </div>
        
        <div className="flex flex-col items-start p-6 space-y-6 text-lg">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive 
                ? "text-blue-600 font-medium" 
                : "text-gray-600 hover:text-blue-600 transition-colors"
            }
            onClick={toggleMenu}
            end
          >
            Home
          </NavLink>
          <NavLink 
            to="/predict" 
            className={({ isActive }) => 
              isActive 
                ? "text-blue-600 font-medium" 
                : "text-gray-600 hover:text-blue-600 transition-colors"
            }
            onClick={toggleMenu}
          >
            Predict
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              isActive 
                ? "text-blue-600 font-medium" 
                : "text-gray-600 hover:text-blue-600 transition-colors"
            }
            onClick={toggleMenu}
          >
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;