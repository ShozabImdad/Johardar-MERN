import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

const AdminSubCategory = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState(null);
  const [newSubCategory, setNewSubCategory] = useState({
    name: "",
    category: "",
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch categories for dropdown
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:5972/api/categories/all", {
        withCredentials: true,
      });
      if (data?.Success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching categories");
    }
  };

  // Fetch subcategories
  const getAllSubCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:5972/api/subcategories/all", {
        withCredentials: true,
      });
      console.log("API Response:", data);
      if (data?.Success) {
        setSubCategories(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching subcategories");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllSubCategories();
  }, []);

  // Create subcategory
  const handleCreateSubCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5972/api/subcategories/create",
        newSubCategory,
        {
          withCredentials: true,
        }
      );

      if (data?.success) {
        toast.success("Subcategory created successfully");
        setIsCreateModalOpen(false);
        setNewSubCategory({ name: "", category: "" });
        getAllSubCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error creating subcategory");
    }
  };

  // Delete subcategory
  const handleDeleteSubCategory = async (subCategoryId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5972/api/subcategories/${subCategoryId}`,
        {
          withCredentials: true,
        }
      );
      if (data?.Success) {
        toast.success("Subcategory deleted successfully");
        getAllSubCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting subcategory");
    }
  };

  // Edit subcategory
  const handleEditClick = (subCategory) => {
    setEditingSubCategory(subCategory);
    setIsEditModalOpen(true);
  };

  const handleUpdateSubCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:5972/api/subcategories/${editingSubCategory._id}`,
        {
          name: editingSubCategory.name,
          category: editingSubCategory.category,
        },
        {
          withCredentials: true,
        }
      );

      if (data?.Success) {
        toast.success("Subcategory updated successfully");
        setIsEditModalOpen(false);
        getAllSubCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error updating subcategory");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
          <div className="container mx-auto px-6 py-8">
            <div className="mb-8 flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Subcategory Management</h1>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FaPlus className="mr-2" /> Add Subcategory
              </button>
            </div>

            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : subCategories.length === 0 ? (
              <div className="text-center py-4">No subcategories found</div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Slug
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created At
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subCategories.map((subCategory) => (
                      <tr key={subCategory._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {subCategory.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {subCategory.category?.name || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{subCategory.slug}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(subCategory.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleEditClick(subCategory)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            <FaEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteSubCategory(subCategory._id)}
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

            {/* Create Subcategory Modal */}
            {isCreateModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg w-96">
                  <h2 className="text-xl font-semibold mb-4">Create Subcategory</h2>
                  <form onSubmit={handleCreateSubCategory}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Subcategory Name
                      </label>
                      <input
                        type="text"
                        required
                        value={newSubCategory.name}
                        onChange={(e) =>
                          setNewSubCategory({ ...newSubCategory, name: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Parent Category
                      </label>
                      <select
                        required
                        value={newSubCategory.category}
                        onChange={(e) =>
                          setNewSubCategory({ ...newSubCategory, category: e.target.value })
                        }
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
                    <div className="flex justify-end space-x-3">
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
                        Create
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Edit Subcategory Modal */}
            {isEditModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg w-96">
                  <h2 className="text-xl font-semibold mb-4">Edit Subcategory</h2>
                  <form onSubmit={handleUpdateSubCategory}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Subcategory Name
                      </label>
                      <input
                        type="text"
                        required
                        value={editingSubCategory.name}
                        onChange={(e) =>
                          setEditingSubCategory({
                            ...editingSubCategory,
                            name: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Parent Category
                      </label>
                      <select
                        required
                        value={editingSubCategory.category?._id || editingSubCategory.category}
                        onChange={(e) =>
                          setEditingSubCategory({
                            ...editingSubCategory,
                            category: e.target.value,
                          })
                        }
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
                    <div className="flex justify-end space-x-3">
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
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminSubCategory;
