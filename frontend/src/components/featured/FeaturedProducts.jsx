import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ProductCard from "../newCards/ProductCard";
import Modal from "react-modal";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  
  const PRODUCTS_PER_VIEW = 4;
  const CARD_WIDTH = 300; // Width of each card
  const GAP = 24; // Gap between cards (6 * 4 = 24px for gap-6)

  const getFeaturedProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5972/api/products/featured"
      );
      setProducts(data?.featuredProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeaturedProducts();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  // Updated scroll handlers
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const maxIndex = Math.max(0, products.length - PRODUCTS_PER_VIEW);
      let newIndex;

      if (direction === 'left') {
        newIndex = Math.max(0, currentIndex - PRODUCTS_PER_VIEW);
      } else {
        newIndex = Math.min(maxIndex, currentIndex + PRODUCTS_PER_VIEW);
      }

      setCurrentIndex(newIndex);
      
      const scrollPosition = newIndex * (CARD_WIDTH + GAP);
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-semibold text-gray-800 tracking-wide">
            FEATURED COLLECTIONS
          </h2>
          <div className="w-16 h-0.5 bg-gray-800 mx-auto mt-2"></div>
        </div>

        {/* Product Slider Container */}
        <div className="relative">
          {/* Left Arrow - Show only if not at start */}
          {currentIndex > 0 && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <FaChevronLeft className="text-2xl text-gray-600" />
            </button>
          )}

          {/* Products Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-hidden scroll-smooth gap-6 px-12"
            style={{
              scrollSnapType: 'x mandatory',
              scrollPadding: '0 24px',
            }}
          >
            {products.length > 0 ? (
              products.map((product) => (
                <div 
                  key={product._id} 
                  className="flex-none w-[300px]"
                  style={{
                    scrollSnapAlign: 'start',
                  }}
                >
                  <ProductCard
                    product={{
                      name: product.name,
                      material: product.metalType,
                      price: product.price,
                      categories: [product.category?.name || "N/A"],
                      image: `http://localhost:5972/uploads/${product.images[0]}`,
                    }}
                    onQuickView={() => openModal(product)}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center w-full">
                No products found.
              </p>
            )}
          </div>

          {/* Right Arrow - Show only if not at end */}
          {currentIndex < products.length - PRODUCTS_PER_VIEW && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <FaChevronRight className="text-2xl text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Quick View Modal"
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 relative m-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        {selectedProduct && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={`http://localhost:5972/uploads/${selectedProduct.images[0]}`}
                alt={selectedProduct.name}
                className="w-full h-auto rounded object-cover aspect-square"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {selectedProduct.name}
              </h2>
              <p className="text-lg font-medium text-gray-600">
                ${selectedProduct.price.toFixed(2)}
              </p>
              <p className="mt-4 text-gray-700">
                Description: {selectedProduct.description}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Category: {selectedProduct.category?.name || "N/A"}
              </p>
              <div className="mt-6 flex items-center space-x-4">
                <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
                  Add to Cart
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-800 text-gray-800 rounded hover:bg-gray-800 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default FeaturedProducts;
