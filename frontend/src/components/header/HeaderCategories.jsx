import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const HeaderCategories = () => {
  const [openDropdown, setOpenDropdown] = useState(null)

  const handleMouseEnter = (category) => {
    setOpenDropdown(category)
  }

  const handleMouseLeave = () => {
    setOpenDropdown(null)
  }

  const renderDropdown = (category, links) => (
    <div
      className={`absolute top-8 left-0 w-40 bg-white shadow-lg rounded-md transition-all duration-300 z-10 ${
        openDropdown === category ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onMouseEnter={() => handleMouseEnter(category)}
      onMouseLeave={handleMouseLeave}
    >
      <ul className="text-sm text-gray-700">
        {links.map((link) => (
          <li key={link.path} className="hover:bg-gray-100 px-4 py-2">
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="flex space-x-6">
      {/* Diamond */}
      <div
        className="relative"
        onMouseEnter={() => handleMouseEnter('diamond')}
        onMouseLeave={handleMouseLeave}
      >
        <span className="text-sm font-semibold text-gray-800 hover:text-amber-700 cursor-pointer">
          DIAMOND
        </span>
        {renderDropdown('diamond', [
          { path: '/diamond/rings', label: 'Rings' },
          { path: '/diamond/bracelets', label: 'Bracelets' },
          { path: '/diamond/necklaces', label: 'Necklaces' },
        ])}
      </div>

      {/* Gold */}
      <div
        className="relative"
        onMouseEnter={() => handleMouseEnter('gold')}
        onMouseLeave={handleMouseLeave}
      >
        <span className="text-sm font-semibold text-gray-800 hover:text-amber-700 cursor-pointer">
          GOLD
        </span>
        {renderDropdown('gold', [
          { path: '/gold/rings', label: 'Rings' },
          { path: '/gold/bracelets', label: 'Bracelets' },
          { path: '/gold/earrings', label: 'Earrings' },
        ])}
      </div>

      {/* Silver */}
      <div
        className="relative"
        onMouseEnter={() => handleMouseEnter('silver')}
        onMouseLeave={handleMouseLeave}
      >
        <span className="text-sm font-semibold text-gray-800 hover:text-amber-700 cursor-pointer">
          SILVER
        </span>
        {renderDropdown('silver', [
          { path: '/silver/necklaces', label: 'Necklaces' },
          { path: '/silver/rings', label: 'Rings' },
        ])}
      </div>

      {/* Watches */}
      <div
        className="relative"
        onMouseEnter={() => handleMouseEnter('watches')}
        onMouseLeave={handleMouseLeave}
      >
        <span className="text-sm font-semibold text-gray-800 hover:text-amber-700 cursor-pointer">
          WATCHES
        </span>
        {renderDropdown('watches', [
          { path: '/watches/men', label: "Men's Watches" },
          { path: '/watches/women', label: "Women's Watches" },
        ])}
      </div>
    </div>
  )
}

export default HeaderCategories
