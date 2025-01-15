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
        const { id } = req.params.id

        const category = await Category.findByIdAndDelete({id})

        res.status(200).json({
            Success: true,
            message: "Category Deleted Successfully",
            data: category
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