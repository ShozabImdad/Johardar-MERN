import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Subcategory from '../models/Subcategory.js'
import slugify from "slugify";

export const addProduct = async (req, res) => {
  try {
    // Extract filenames from uploaded files
    const images = req.files.map((file) => file.filename);

    // Add the images array and slug to the request body
    req.body.images = images;
    req.body.slug = slugify(req.body.name);

    // Create the product and save it to the database
    const product = await Product.create(req.body);

    res.status(201).json({
      Success: true,
      message: "Product Created Successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      Success: false,
      message: error.message,
      data: null,
    });
  }
};

// export const getAllProducts = async (req, res) => {
//   try {
//     const {
//       page = 1,
//       limit = 10,
//       category,
//       subcategory,
//       metalType,
//     } = req.query;
//     const query = {};

//     if (category) query.category = category;
//     if (subcategory) query.subcategory = subcategory;
//     if (metalType) query.metalType = metalType;

//     const products = await Product.find(query)
//       .populate("category")
//       .populate("subcategory")
//       .limit(limit * 1)
//       .skip((page - 1) * limit);

//     const count = await Product.countDocuments(query);

//     res.json({
//       products,
//       totalPages: Math.ceil(count / limit),
//       currentPage: page,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(10)
      .sort({ createdAt: -1 });
    console.log("products : ", products);
    res.status(200).json({
      success: true,
      message: "All Products.",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      message: "Failed to get all Products.",
      error: error.message,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        Success: false,
        message: "Product not found",
        data: null,
      });
    }

    res.status(200).json({
      Success: true,
      message: "Product found",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      Success: false,
      message: error.message,
      data: null,
    });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).sort({
      createdAt: -1,
    });
    if (!featuredProducts) {
      return res.status(204).json({
        Success: false,
        message: "No Featured Products Found",
        data: null,
      });
    }

    res.status(200).json({
      Success: true,
      message: "Featured Products",
      count: featuredProducts.length,
      featuredProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Success: false,
      message: "Failed to get Featured Products",
      error: error.message,
    });
  }
};

export const getBestSelling = async (req, res) => {
  try {
    const bestSellingProducts = await Product.find({})
      .sort({ sold: -1 })
      .limit(10);
    if (!bestSellingProducts) {
      return res.status(204).json({
        Success: false,
        message: "No Best Selling Products Found",
        data: null,
      });
    }

    res.status(200).json({
      Success: true,
      message: "Best Selling Products",
      bestSellingProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Success: false,
      message: "Failed to get Best Selling Products",
      error: error.message,
    });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { categorySlug } = req.params;

    const category = await Category.findOne({ slug: categorySlug });
    if (!category) {
      return res.status(404).json({
        Success: false,
        message: "category not found",
        data: null,
      });
    }

    const products = await Product.find({ category: category._id })
      .populate("category", "name slug")
      .populate("subcategory", "name slug");

    res.status(200).json({
      Success: true,
      category: category.slug,
      message: "Products by category",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Success: false,
      message: "Failed to get products bu category",
      error: error.message,
    });
  }
};

export const getProductsByCategorySubCategory = async (req, res) => {
  try {
    const { categorySlug, subCategorySlug } = req.params;

    const category = await Category.findOne({ slug: categorySlug });
    if (!category) {
      return res.status(404).json({
        Success: false,
        message: "category not found",
        data: null,
      });
    }

    const subCategory = await Subcategory.findOne({
      slug: subCategorySlug,
      category: category._id
    })

    if (!subCategory) {
      return res.status(404).json({
        Success: false,
        message: "Subcategory not found",
        data: null,
      });
    }

    const products = await Product.find({ category: category._id, subcategory: subCategory._id })
      .populate("category", "name slug")
      .populate("subcategory", "name slug");

    res.status(200).json({
      Success: true,
      category: category.slug,
      subcategory: subCategory.slug,
      message: "Products by category and subcategory",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Success: false,
      message: "Failed to get products bu category and subcategory",
      error: error.message,
    });
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Handle file uploads if any
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((file) => file.filename);
    }

    // Convert string values to appropriate types
    if (updateData.price) updateData.price = Number(updateData.price);
    if (updateData.weight) updateData.weight = Number(updateData.weight);
    if (updateData.stock) updateData.stock = Number(updateData.stock);
    if (updateData.isActive !== undefined) {
      updateData.isActive =
        updateData.isActive === "true" || updateData.isActive === true;
    }
    if (updateData.isFeatured !== undefined) {
      updateData.isFeatured =
        updateData.isFeatured === "true" || updateData.isFeatured === true;
    }

    // Generate slug from name if name is being updated
    if (updateData.name) {
      updateData.slug = slugify(updateData.name);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    ).populate(["category", "subcategory"]);

    if (!updatedProduct) {
      return res.status(404).json({
        Success: false,
        message: "Product not found",
        data: null,
      });
    }

    res.status(200).json({
      Success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      Success: false,
      message: error.message || "Error updating product",
      data: null,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        Success: false,
        message: "Product not found",
        data: null,
      });
    }

    await product.deleteOne();

    res.status(200).json({
      Success: true,
      message: "Product deleted",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      Success: false,
      message: error.message,
      data: null,
    });
  }
};

export const searchProduct = async (req, res) => {
  try {
    const { query, category, metalType, minPrice, maxPrice } = req.query;
    const searchQuery = {
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    };

    if (category) searchQuery.category = category;
    if (metalType) searchQuery.metalType = metalType;
    if (minPrice || maxPrice) {
      searchQuery.price = {};
      if (minPrice) searchQuery.price.$gte = minPrice;
      if (maxPrice) searchQuery.price.$lte = maxPrice;
    }

    const products = await Product.find(searchQuery)
      .populate("category")
      .populate("subcategory");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
