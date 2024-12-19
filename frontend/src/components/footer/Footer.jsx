import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#f9f5f3] text-gray-700 py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-wrap justify-between">
        {/* Logo and Store Info */}
        <div className="mb-6 lg:mb-0">
          <h2 className="text-2xl font-semibold text-gray-800">JOHARDAR</h2>
          <p className="text-sm text-gray-500 mt-1 tracking-wide">JEWELLERS</p>
        </div>

        {/* About Us Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">About us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-gray-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-600">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-600">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/rings" className="hover:text-gray-600">
                Rings
              </Link>
            </li>
            <li>
              <Link to="/bracelets" className="hover:text-gray-600">
                Bracelets
              </Link>
            </li>
            <li>
              <Link to="/earrings" className="hover:text-gray-600">
                Earrings
              </Link>
            </li>
            <li>
              <Link to="/necklaces" className="hover:text-gray-600">
                Necklaces
              </Link>
            </li>
          </ul>
        </div>

        {/* Address and Contact */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Address</h3>
          <p className="text-sm leading-6">
            123 Fifth Avenue, New York, NY 10160
            <br />
            <a href="mailto:contact@info.com" className="hover:text-gray-600">
              contact@info.com
            </a>
            <br />
            929-242-8688
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 border-t border-gray-200 pt-4">
        <p className="text-xs text-gray-500">
          Copyright © 2024 Johardar Jewellers | Powered by Shozab Imdad
        </p>
      </div>
    </footer>
  );
};

export default Footer;
