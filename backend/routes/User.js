import express from 'express'
import {getAllUsers, addUser, getUserProfile, deleteUser} from '../controllers/user.js'

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", addUser)
router.get("/:id", getUserProfile)
router.delete("/:id", deleteUser)




export default router;