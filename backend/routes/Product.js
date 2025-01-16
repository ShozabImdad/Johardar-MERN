import express from 'express';
import {auth, adminAuth} from '../middleware/auth.js'
import {addProduct, deleteProduct, getAllProducts, getBestSelling, getFeaturedProducts, getProduct, getProductsByCategory, getProductsByCategorySubCategory, updateProduct} from '../controllers/product.js'
import upload from "../Utils/multer.js";
const router = express.Router();


router.post("/create",auth, adminAuth, upload.array("images", 5), addProduct);
router.get("/all", getAllProducts);
router.get("/featured", getFeaturedProducts)
router.get("/bestselling", getBestSelling)
router.get("/categories/:categorySlug", getProductsByCategory);
router.get("/categories/:categorySlug/:subCategorySlug", getProductsByCategorySubCategory);
router.get("/:id", getProduct);
router.put("/:id", auth, adminAuth, upload.array("images", 5), updateProduct);
router.delete("/:id",auth, adminAuth, deleteProduct);




export default router;

