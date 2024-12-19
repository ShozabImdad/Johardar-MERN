import React from "react";
import Ring from '../../assets/ring.png'
import Earing from '../../assets/earing.png'
import Bangles from '../../assets/bangles.png'
import BridalSet from '../../assets/bridalset.png'
import ProductCard from '../cards/ProductCard'


// Main Component for Trending Now Section
const ProductCards = ({title}) => {
  const products = [
    {
      image: Ring, // Replace with actual paths
      name: "Sapphire Ring",
    },
    {
      image: Earing,
      name: "Earings",
    },
    {
      image: Bangles,
      name: "Bangles",
    },
    {
      image: BridalSet,
      name: "Bridal Set",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-semibold text-gray-800 tracking-wide">
            {title}
          </h2>
          <div className="w-16 h-0.5 bg-gray-800 mx-auto mt-2"></div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              image={product.image}
              name={product.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCards;
