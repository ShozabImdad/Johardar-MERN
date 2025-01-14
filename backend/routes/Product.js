import express from 'express';
import {auth, adminAuth} from '../middleware/auth.js'
import {addProduct, deleteProduct, getAllProducts, getProduct, updateProduct} from '../controllers/product.js'
import upload from "../Utils/multer.js";
const router = express.Router();


router.post("/create",auth, adminAuth, upload.array("images", 5), addProduct);
router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id",auth, adminAuth, deleteProduct);




export default router;

