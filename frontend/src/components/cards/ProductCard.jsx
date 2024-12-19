import React from "react";


// Card Component to display product image and name
const ProductCard = ({ image, name }) => {
    return (
      <div className="text-center">
        <div className="w-full h-64 mb-4 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-lg font-medium text-gray-800">{name}</h3>
      </div>
    );
  };



  export default ProductCard;