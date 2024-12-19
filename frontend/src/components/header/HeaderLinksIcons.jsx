import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaHeart } from 'react-icons/fa';

const HeaderLinksIcons = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex items-center space-x-6 relative">
      <Link to="/" className={`text-sm font-semibold ${
          isActive('/') ? 'text-amber-700' : 'text-gray-800'
        } hover:text-amber-700`}>
        HOME
      </Link>
      <Link to="/about" className={`text-sm font-semibold ${
          isActive('/about') ? 'text-amber-700' : 'text-gray-800'
        } hover:text-amber-700`}>
        ABOUT
      </Link>
      <Link to="/contact" className={`text-sm font-semibold ${
          isActive('/contact') ? 'text-amber-700' : 'text-gray-800'
        } hover:text-amber-700`}>
        CONTACT
      </Link>
      <Link to="/search" className="text-xl text-gray-800 hover:text-amber-700">
        <FaSearch />
      </Link>

      {/* User Icon with Dropdown */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="text-xl text-gray-800 hover:text-amber-700 focus:outline-none"
        >
          <FaUser />
        </button>
        {isDropdownOpen && (
          <div
            className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border z-10"
            onMouseLeave={closeDropdown}
          >
            <ul className="py-1 text-gray-700">
              <li>
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:bg-gray-100 hover:text-amber-700"
                  onClick={closeDropdown}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="block px-4 py-2 hover:bg-gray-100 hover:text-amber-700"
                  onClick={closeDropdown}
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      <Link to="/wishlist" className="text-xl text-gray-800 hover:text-amber-700">
        <FaHeart />
      </Link>
      <Link to="/cart" className="relative text-xl text-gray-800 hover:text-amber-700">
        <FaShoppingCart />
        <span className="absolute -top-2 -right-3 bg-black text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
          1
        </span>
      </Link>
    </div>
  );
};

export default HeaderLinksIcons;
