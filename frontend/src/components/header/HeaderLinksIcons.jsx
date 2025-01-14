import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaHeart } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { toast } from "react-hot-toast";
import axios from 'axios';

const HeaderLinksIcons = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5972/api/auth/logout",
        {},
        {
          withCredentials: true
        }
      );
      
      if (data?.Success) {
        setAuth({
          ...auth,
          user: null,
        });
        localStorage.removeItem("auth");
        toast.success("Logged out successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

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
              {!auth?.user ? (
                <>
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
                </>
              ) : (
                <>
                  <li>
                    <span className="block px-4 py-2 text-gray-800 font-medium">
                      Welcome, {auth?.user.username}
                    </span>
                  </li>
                  <li>
                    <Link
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-amber-700"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                  <Link
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-amber-700"
                    >
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-amber-700"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
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
