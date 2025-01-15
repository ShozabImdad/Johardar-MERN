import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

const AdminProducts = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editSelectedFiles, setEditSelectedFiles] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    metalType: "",
    purity: "",
    weight: "",
    stock: "",
    discount: 0,
    isFeatured: false,
    isActive: true
  });
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5972/api/products/all", {
        withCredentials: true,
      });
      console.log("API Response:", data);
      if (data?.success) {
        console.log("Products:", data.products);
        setProducts(data.products);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching products:", error);
      toast.error("Error fetching products");
      setLoading(false);
    }
  };

  // Delete product
  const handleDeleteProduct = async (productId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5972/api/products/${productId}`,
        {
          withCredentials: true,
        }
      );
      if (data?.Success) {
        toast.success("Product deleted successfully");
        getAllProducts();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting product");
    }
  };

  const handleEditClick = async (product) => {
    setEditingProduct(product);
    if (product.category?._id) {
      await fetchSubcategories(product.category._id);
    }
    setIsEditModalOpen(true);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      // Create a regular object instead of FormData since we're not handling files right now
      const updateData = {
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        metalType: editingProduct.metalType,
        purity: editingProduct.purity,
        weight: editingProduct.weight,
        stock: editingProduct.stock,
        discount: editingProduct.discount,
        isActive: editingProduct.isActive
      };

      // Log the data being sent
      console.log('Sending update data:', updateData);

      const { data } = await axios.put(
        `http://localhost:5972/api/products/${editingProduct._id}`,
        updateData,  // Send as regular JSON
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",  // Changed to JSON content type
          },
        }
      );
      
      console.log('Update Response:', data);
      
      if (data?.Success) {
        toast.success("Product updated successfully");
        setIsEditModalOpen(false);
        getAllProducts(); // Refresh the products list
      } else {
        toast.error(data?.message || "Error updating product");
      }
    } catch (error) {
      console.error("Update error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Error updating product");
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("description", newProduct.description);
      formData.append("price", Number(newProduct.price));
      formData.append("category", newProduct.category);
      formData.append("subcategory", newProduct.subcategory);
      formData.append("metalType", newProduct.metalType);
      formData.append("purity", newProduct.purity);
      formData.append("weight", Number(newProduct.weight));
      formData.append("stock", Number(newProduct.stock));
      formData.append("discount", Number(newProduct.discount));
      formData.append("isFeatured", newProduct.isFeatured);
      formData.append("isActive", newProduct.isActive);

      // Append images if any
      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      const { data } = await axios.post(
        "http://localhost:5972/api/products/create",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data?.Success) {
        toast.success("Product created successfully");
        setIsCreateModalOpen(false);
        setNewProduct({
          name: "",
          description: "",
          price: "",
          category: "",
          subcategory: "",
          metalType: "",
          purity: "",
          weight: "",
          stock: "",
          discount: 0,
          isFeatured: false,
          isActive: true
        });
        setSelectedFiles([]);
        getAllProducts();
      }
    } catch (error) {
      console.error("Create error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Error creating product");
    }
  };

  // Add this function to fetch categories
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:5972/api/categories/all", {
        withCredentials: true,
      });
      if (data?.Success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories");
    }
  };

  // Add this function to fetch subcategories based on selected category
  const fetchSubcategories = async (categoryId) => {
    if (!categoryId) {
      setSubcategories([]);
      return;
    }
    try {
      const { data } = await axios.get(`http://localhost:5972/api/subcategories/by-category/${categoryId}`, {
        withCredentials: true,
      });
      if (data?.Success) {
        setSubcategories(data.data);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      toast.error("Error fetching subcategories");
    }
  };

  // Add these functions for status and featured toggles
  const handleStatusToggle = async (productId, currentStatus) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5972/api/products/${productId}`,
        {
          isActive: !currentStatus
        },
        {
          withCredentials: true,
        }
      );

      if (data?.Success) {
        toast.success("Product status updated successfully");
        getAllProducts();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating product status");
    }
  };

  const handleFeaturedToggle = async (productId, currentFeatured) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5972/api/products/${productId}`,
        {
          isFeatured: !currentFeatured
        },
        {
          withCredentials: true,
        }
      );

      if (data?.Success) {
        toast.success("Product featured status updated successfully");
        getAllProducts();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating featured status");
    }
  };

  // Add this function for editing products
  const renderEditProductModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-[800px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
        <form onSubmit={handleUpdateProduct} className="space-y-4">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                required
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              required
              value={editingProduct.description}
              onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Categories */}
          {renderCategoryDropdowns(true)}

          {/* Product Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Metal Type</label>
              <select
                required
                value={editingProduct.metalType}
                onChange={(e) => setEditingProduct({ ...editingProduct, metalType: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select Metal Type</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="platinum">Platinum</option>
                <option value="diamond">Diamond</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Purity</label>
              <select
                required
                value={editingProduct.purity}
                onChange={(e) => setEditingProduct({ ...editingProduct, purity: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select Purity</option>
                <option value="14K">14K</option>
                <option value="18K">18K</option>
                <option value="22K">22K</option>
                <option value="24K">24K</option>
                <option value="925 Silver">925 Silver</option>
                <option value="Pure Silver">Pure Silver</option>
              </select>
            </div>
          </div>

          {/* Weight and Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Weight (g)</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={editingProduct.weight}
                onChange={(e) => setEditingProduct({ ...editingProduct, weight: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Stock</label>
              <input
                type="number"
                required
                min="0"
                value={editingProduct.stock}
                onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Status and Featured */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="editIsActive"
                checked={editingProduct.isActive}
                onChange={(e) => setEditingProduct({ ...editingProduct, isActive: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="editIsActive" className="ml-2 block text-sm text-gray-900">
                Active Status
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="editIsFeatured"
                checked={editingProduct.isFeatured}
                onChange={(e) => setEditingProduct({ ...editingProduct, isFeatured: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="editIsFeatured" className="ml-2 block text-sm text-gray-900">
                Featured Product
              </label>
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setEditSelectedFiles(Array.from(e.target.files))}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {/* Show existing images */}
            <div className="mt-2 flex gap-2">
              {editingProduct.images?.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:5972/uploads/${image}`}
                  alt={`Product ${index + 1}`}
                  className="h-20 w-20 object-cover rounded"
                />
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderCreateProductModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-[800px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Create New Product</h2>
        <form onSubmit={handleCreateProduct} className="space-y-4">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                required
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              required
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Categories */}
          {renderCategoryDropdowns(false)}

          {/* Product Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Metal Type</label>
              <select
                required
                value={newProduct.metalType}
                onChange={(e) => setNewProduct({ ...newProduct, metalType: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select Metal Type</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="platinum">Platinum</option>
                <option value="diamond">Diamond</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Purity</label>
              <select
                required
                value={newProduct.purity}
                onChange={(e) => setNewProduct({ ...newProduct, purity: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select Purity</option>
                <option value="14K">14K</option>
                <option value="18K">18K</option>
                <option value="22K">22K</option>
                <option value="24K">24K</option>
                <option value="925 Silver">925 Silver</option>
                <option value="Pure Silver">Pure Silver</option>
              </select>
            </div>
          </div>

          {/* Weight and Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Weight (g)</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={newProduct.weight}
                onChange={(e) => setNewProduct({ ...newProduct, weight: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Stock</label>
              <input
                type="number"
                required
                min="0"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Status and Featured */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={newProduct.isActive}
                onChange={(e) => setNewProduct({ ...newProduct, isActive: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                Active Status
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isFeatured"
                checked={newProduct.isFeatured}
                onChange={(e) => setNewProduct({ ...newProduct, isFeatured: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-900">
                Featured Product
              </label>
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderCategoryDropdowns = (isEdit = false) => (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          required
          value={isEdit ? editingProduct.category : newProduct.category}
          onChange={(e) => handleCategoryChange(e, isEdit)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Subcategory</label>
        <select
          required
          value={isEdit ? editingProduct.subcategory : newProduct.subcategory}
          onChange={(e) => {
            if (isEdit) {
              setEditingProduct({ ...editingProduct, subcategory: e.target.value });
            } else {
              setNewProduct({ ...newProduct, subcategory: e.target.value });
            }
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select Subcategory</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory._id} value={subcategory._id}>
              {subcategory.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const handleCategoryChange = (e, isEdit = false) => {
    const categoryId = e.target.value;
    if (isEdit) {
      setEditingProduct({ ...editingProduct, category: categoryId, subcategory: "" });
    } else {
      setNewProduct({ ...newProduct, category: categoryId, subcategory: "" });
    }
    fetchSubcategories(categoryId);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
          <div className="container mx-auto px-6 py-8">
            <div className="mb-8 flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Products Management</h1>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FaPlus className="mr-2" /> Add Product
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category/Subcategory
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price/Stock
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Featured
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={`http://localhost:5972/uploads/${product.images[0]}`}
                                alt={product.name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {product.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {product.metalType} - {product.purity}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {product.category?.name || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.subcategory?.name || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            ₹{product.price.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            Stock: {product.stock}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleStatusToggle(product._id, product.isActive)}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              product.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {product.isActive ? 'Active' : 'Inactive'}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleFeaturedToggle(product._id, product.isFeatured)}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              product.isFeatured
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {product.isFeatured ? 'Featured' : 'Not Featured'}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleEditClick(product)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            <FaEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {isCreateModalOpen && renderCreateProductModal()}
            {isEditModalOpen && renderEditProductModal()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminProducts;
