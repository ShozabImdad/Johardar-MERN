import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaTachometerAlt, 
  FaBox, 
  FaShoppingCart, 
  FaUsers, 
  FaTags,
  FaListUl
} from 'react-icons/fa';

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed left-0 h-screen bg-gray-800 text-white transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-9 bg-gray-800 text-white p-1 rounded-full"
      >
        {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </button>

      <div className="p-4">
        <div className="flex items-center justify-center mb-8">
          <span className={`font-bold text-xl ${!isOpen && 'hidden'}`}>Admin Panel</span>
        </div>

        <nav className="space-y-2">
          <Link
            to="/admin/dashboard"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FaTachometerAlt className="text-xl" />
            <span className={`${!isOpen && 'hidden'}`}>Dashboard</span>
          </Link>

          <Link
            to="/admin/products"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FaBox className="text-xl" />
            <span className={`${!isOpen && 'hidden'}`}>Products</span>
          </Link>

          <Link
            to="/admin/categories"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FaTags className="text-xl" />
            <span className={`${!isOpen && 'hidden'}`}>Categories</span>
          </Link>

          <Link
            to="/admin/subcategories"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FaListUl className="text-xl" />
            <span className={`${!isOpen && 'hidden'}`}>Subcategories</span>
          </Link>

          <Link
            to="/admin/orders"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FaShoppingCart className="text-xl" />
            <span className={`${!isOpen && 'hidden'}`}>Orders</span>
          </Link>

          <Link
            to="/admin/users"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FaUsers className="text-xl" />
            <span className={`${!isOpen && 'hidden'}`}>Users</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
