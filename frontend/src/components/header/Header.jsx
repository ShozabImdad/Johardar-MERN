import React from "react";
import { Link } from "react-router-dom";
import {FaShoppingCart, FaSearch, FaUser} from 'react-icons/fa'
import HeaderCategories from './HeaderCategories'
import HeaderLogo from './HeaderLogo'
import HeaderLinksIcons from './HeaderLinksIcons'

const Navbar = () => {
  return (
    <nav className="flex opacity-100 justify-between items-center px-8 w-full py-4 border-b border-gray-200 bg-white  fixed z-50">
      {/* Left - Categories */}
      <HeaderCategories />

      {/* Center - Logo */}
      <HeaderLogo />

      {/* Right - Links and Icons */}
      <HeaderLinksIcons />

    </nav>
  );
};

export default Navbar;
