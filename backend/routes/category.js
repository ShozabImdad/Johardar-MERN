import express from 'express'
import {auth, adminAuth} from '../middleware/auth.js'
import { createCategory, deleteCategory, getAllCategories, getAllCategoriesWithSubcategories } from '../controllers/category.js'


const router = express.Router()


router.post("/create", auth, adminAuth, createCategory)
router.get("/all", getAllCategories)
router.delete("/:id", auth, adminAuth, deleteCategory)
router.get("/all-with-subcategories", getAllCategoriesWithSubcategories)
router.delete("/delete/:id", auth, adminAuth, deleteCategory);


export default router