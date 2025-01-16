import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import axios from "axios";
import ProductCard from "../components/newCards/ProductCard";
import Modal from "react-modal";

Modal.setAppElement("#root");

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5972/api/products/all");
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <section className="flex-grow py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl mt-10 font-semibold text-gray-800 tracking-wide">
              ALL PRODUCTS
            </h2>
            <div className="w-16 h-0.5 bg-gray-800 mx-auto mt-2"></div>
          </div>

          {/* Updated grid container with fixed columns and card sizing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="h-full">
                  <ProductCard
                    product={{
                      name: product.name,
                      material: product.metalType,
                      price: product.price,
                      categories: [product.category?.name || "N/A"],
                      image: `http://localhost:5972/uploads/${product.images[0]}`,
                    }}
                    onQuickView={() => openModal(product)}
                    className="h-full" // Add height 100% to ensure consistent sizing
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No products found.
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />

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
              <p className="mt-4 text-gray-700">Description: {selectedProduct.description}</p>
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
    </div>
  );
};

export default AllProducts; 