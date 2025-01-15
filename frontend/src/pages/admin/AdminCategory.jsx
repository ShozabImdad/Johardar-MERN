import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

const AdminCategory = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:5972/api/categories/all", {
        withCredentials: true,
      });
      console.log("API Response:", data);
      if (data?.Success) {
        setCategories(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching categories");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Create category
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5972/api/categories/create",
        newCategory,
        {
          withCredentials: true,
        }
      );

      if (data?.success) {
        toast.success("Category created successfully");
        setIsCreateModalOpen(false);
        setNewCategory({ name: "" });
        getAllCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error creating category");
    }
  };

  // Delete category
  const handleDeleteCategory = async (categoryId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5972/api/categories/${categoryId}`,
        {
          withCredentials: true,
        }
      );
      if (data?.Success) {
        toast.success("Category deleted successfully");
        getAllCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting category");
    }
  };

  // Edit category
  const handleEditClick = (category) => {
    setEditingCategory(category);
    setIsEditModalOpen(true);
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:5972/api/category/${editingCategory._id}`,
        {
          name: editingCategory.name,
        },
        {
          withCredentials: true,
        }
      );

      if (data?.Success) {
        toast.success("Category updated successfully");
        setIsEditModalOpen(false);
        getAllCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error updating category");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
          <div className="container mx-auto px-6 py-8">
            <div className="mb-8 flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Category Management</h1>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FaPlus className="mr-2" /> Add Category
              </button>
            </div>

            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : categories.length === 0 ? (
              <div className="text-center py-4">No categories found</div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-1000 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-1000 uppercase tracking-wider">
                        Slug
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-1000 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {categories.map((category) => (
                      <tr key={category._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {category.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{category.slug}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleEditClick(category)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            <FaEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category._id)}
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

            {/* Create Category Modal */}
            {isCreateModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg w-96">
                  <h2 className="text-xl font-semibold mb-4">Create Category</h2>
                  <form onSubmit={handleCreateCategory}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Category Name
                      </label>
                      <input
                        type="text"
                        required
                        value={newCategory.name}
                        onChange={(e) =>
                          setNewCategory({ ...newCategory, name: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
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

            {/* Edit Category Modal */}
            {isEditModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg w-96">
                  <h2 className="text-xl font-semibold mb-4">Edit Category</h2>
                  <form onSubmit={handleUpdateCategory}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Category Name
                      </label>
                      <input
                        type="text"
                        required
                        value={editingCategory.name}
                        onChange={(e) =>
                          setEditingCategory({
                            ...editingCategory,
                            name: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
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

export default AdminCategory;
