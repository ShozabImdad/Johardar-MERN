import express from 'express'
import {auth, adminAuth} from '../middleware/auth.js'
import { 
    createSubCategory, 
    deleteSubCategory, 
    getAllSubCategories,
    updateSubCategory,
    getAllSubCategoriesByCategory
} from '../controllers/subCategory.js'

const router = express.Router()

router.post("/create", auth, adminAuth, createSubCategory)
router.get("/all", getAllSubCategories)
router.put("/:id", auth, adminAuth, updateSubCategory)
router.delete("/:id", auth, adminAuth, deleteSubCategory)
router.get("/by-category/:categoryId", getAllSubCategoriesByCategory)

export default router