import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subcategory,
      metalType,
      weight,
      images,
      stock,
    } = req.body;
    const product = Product.create({
      name,
      description,
      price,
      category,
      subcategory,
      metalType,
      weight,
      images,
      stock,
    });

    res.status(200).json({
      Success: true,
      message: "Product Created",
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

export const getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      subcategory,
      metalType,
    } = req.query;
    const query = {};

    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    if (metalType) query.metalType = metalType;

    const products = await Product.find(query)
      .populate("category")
      .populate("subcategory")
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
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

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({
        Success: false,
        message: "Product not found",
        data: null,
      });
    }

    res.status(200).res.json({
      Success: true,
      message: "Product Updated",
      data: product
    })
  } catch (error) {
    res.status(500).json({
      Success: false,
      message: error.message,
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
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } }
      ]
    };

    if (category) searchQuery.category = category;
    if (metalType) searchQuery.metalType = metalType;
    if (minPrice || maxPrice) {
      searchQuery.price = {};
      if (minPrice) searchQuery.price.$gte = minPrice;
      if (maxPrice) searchQuery.price.$lte = maxPrice;
    }

    const products = await Product.find(searchQuery)
      .populate('category')
      .populate('subcategory');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
