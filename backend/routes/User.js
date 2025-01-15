import express from 'express'
import {getAllUsers, addUser, getUserProfile, deleteUser, updateUser} from '../controllers/user.js'
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

router.get("/", auth, adminAuth, getAllUsers);
router.post("/create", auth, adminAuth, addUser);
router.get("/:id", auth, getUserProfile);
router.put("/:id", auth, adminAuth, updateUser);
router.delete("/:id", auth, adminAuth, deleteUser);

export default router;