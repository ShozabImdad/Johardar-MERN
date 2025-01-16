import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const HeaderCategories = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categorySlug, setCategorySlug] = useState("");
  const [subCategorySlug, setSubCategorySlug] = useState("");

  // Fetch categories and their subcategories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5972/api/categories/all-with-subcategories"
        );
        if (data?.Success) {
          setCategories(data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleMouseEnter = (category) => {
    setOpenDropdown(category.slug);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const handleCategoryClick = (slug) => {
    setCategorySlug(slug);

    // setSubCategorySlug(""); // Reset subcategory when switching category
  };

  const handleSubCategoryClick = (categorySlug, subCategorySlug) => {
    setCategorySlug(categorySlug);
    setSubCategorySlug(subCategorySlug);
  };

  const renderDropdown = (category, subcategories) => (
    <div
      className={`absolute top-8 left-0 w-40 bg-white shadow-lg rounded-lg transition-all duration-300 z-10 ${
        openDropdown === category.slug
          ? "opacity-100 visible"
          : "opacity-0 invisible"
      }`}
      onMouseEnter={() => handleMouseEnter(category)}
      onMouseLeave={handleMouseLeave}
    >
      <ul className="py-1 text-sm text-gray-700">
        {subcategories.map((subcategory) => (
          <li
            key={subcategory._id}
            className="block px-4 py-2 hover:bg-gray-100 hover:text-amber-700"
          >
            <Link
              to={`/categories/${category.slug}/${subcategory.slug}`}
              onClick={() =>
                handleSubCategoryClick(category.slug, subcategory.slug)
              }
            >
              {subcategory.name.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  if (loading) {
    return <div className="flex space-x-6">Loading...</div>;
  }

  if (error) {
    return <div className="flex space-x-6 text-red-500">{error}</div>;
  }

  return (
    <div className="flex space-x-6">
      {categories.map((category) => (
        <div
          key={category._id}
          className="relative"
          onMouseEnter={() => handleMouseEnter(category)}
          onMouseLeave={handleMouseLeave}
        >
          <span
            className="text-sm font-semibold text-gray-800 hover:text-amber-700 cursor-pointer"
            onClick={() => handleCategoryClick(category.slug)}
          >
            <Link to={`/categories/${category.slug}`}>
              {category.name.toUpperCase()}
            </Link>
          </span>
          {renderDropdown(category, category.subcategories)}
        </div>
      ))}
    </div>
  );
};

export default HeaderCategories;
