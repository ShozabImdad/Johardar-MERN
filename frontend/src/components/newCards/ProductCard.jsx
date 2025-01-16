import React from "react";
import {FaHeart, FaShoppingCart, FaEye} from 'react-icons/fa'

const ProductCard = ({ product, onQuickView }) => {
  return (
    <div className="group max-w-xs mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl relative">
      <div className="relative">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        {/* Action Icons (hidden by default, visible on hover) */}
        <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Quick View Button */}
          <button
            onClick={onQuickView}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          >
            <FaEye className="text-xl text-gray-500 hover:text-amber-700" />
          </button>

          {/* Add to Wishlist Button */}
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
            <FaHeart className="text-xl text-gray-500 hover:text-amber-700" />
          </button>

          {/* Add to Cart Button */}
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
            <FaShoppingCart className="text-xl text-gray-500 hover:text-amber-700"/>
          </button>
        </div>
      </div>
      {/* Product Details */}
      <div className="p-4 text-center">
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
        <p className="text-sm text-gray-600 mt-2">Material: {product.material}</p>
        <p className="text-lg font-bold text-amber-600 mt-2">${product.price}</p>
        <div className="mt-3 flex justify-center space-x-2">
          {product.categories.map((category, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs text-white bg-amber-600 rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
