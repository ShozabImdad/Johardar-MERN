import Subcategory from '../models/Subcategory.js'
import slugify from 'slugify'

export const createSubCategory = async (req, res) => {
    try {
        const { name, category } = req.body
        const subCategory = await Subcategory.create({
            name,
            category,
            slug: slugify(name)
        })

        const populatedSubCategory = await subCategory.populate('category')

        res.status(201).json({
            success: true,
            message: "Subcategory Created Successfully",
            data: populatedSubCategory
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

export const getAllSubCategories = async (req, res) => {
    try {
        const subCategories = await Subcategory.find({}).populate('category')

        res.status(200).json({
            Success: true,
            message: "All Subcategories",
            data: subCategories
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

export const updateSubCategory = async (req, res) => {
    try {
        const { id } = req.params
        const { name, category } = req.body

        const updatedSubCategory = await Subcategory.findByIdAndUpdate(
            id,
            {
                name,
                category,
                slug: slugify(name)
            },
            { new: true }
        ).populate('category')

        if (!updatedSubCategory) {
            return res.status(404).json({
                Success: false,
                message: "Subcategory not found",
                data: null
            })
        }

        res.status(200).json({
            Success: true,
            message: "Subcategory Updated Successfully",
            data: updatedSubCategory
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

export const deleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params

        const subCategory = await Subcategory.findByIdAndDelete(id)

        if (!subCategory) {
            return res.status(404).json({
                Success: false,
                message: "Subcategory not found",
                data: null
            })
        }

        res.status(200).json({
            Success: true,
            message: "Subcategory Deleted Successfully",
            data: subCategory
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

export const getAllSubCategoriesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const subcategories = await Subcategory.find({ category: categoryId }).populate('category');

        res.status(200).json({
            Success: true,
            message: "Subcategories by category",
            data: subcategories
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            Success: false,
            message: "Server Error",
            error: error.message
        });
    }
};