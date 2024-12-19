import express from 'express';
import {auth, adminAuth} from '../middleware/auth.js'
import {addProduct, deleteProduct, getAllProducts, getProduct, updateProduct} from '../controllers/product.js'

const router = express.Router();


router.post("/",auth, adminAuth, addProduct);
router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id",auth, adminAuth, deleteProduct);




export default router;

