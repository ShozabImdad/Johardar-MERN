import React from "react";

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>

          {/* Add to Wishlist Button */}
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8a4 4 0 018-0 4 4 0 018 0c0 4.418-4 8-8 8s-8-3.582-8-8z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.21 13.55l.79.7-.79-.7z"
              />
            </svg>
          </button>

          {/* Add to Cart Button */}
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l3.6 7.59M16 16H8a4 4 0 01-4-4M6 21a2 2 0 104 0m7-3a3 3 0 11-2-1h2zm5.01-.5l1.25 2.5"
              />
            </svg>
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
