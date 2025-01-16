import Category from '../models/Category.js'
import slugify from 'slugify'

export const createCategory = async (req, res) => {
    try {
        const {name, subcategory} = req.body
        const category = await Category.create({
            name: name,
            slug: slugify(name),
            subcategory: subcategory
        })

        res.status(201).json({
            success: true,
            message: "Category Created Successfully",
            data: category
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message

        })
    }
}


export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({})

        res.status(200).json({
            Success: true,
            message: "All Categories",
            data: categories
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            Success: false,
            message: "Server Error",
            error: error.message
        })
    }
}


export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCategory = await Category.findByIdAndDelete(id);
        
        if (!deletedCategory) {
            return res.status(404).json({
                Success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            Success: true,
            message: "Category deleted successfully",
            data: deletedCategory
        });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({
            Success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

export const getAllCategoriesWithSubcategories = async (req, res) => {
    try {
        const categories = await Category.find()
            .populate({
                path: 'subcategories',
                select: 'name slug _id'
            })
            .select('name slug _id');

        res.status(200).json({
            Success: true,
            message: "Categories fetched successfully",
            data: categories
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            Success: false,
            message: "Error fetching categories",
            error: error.message
        });
    }
};