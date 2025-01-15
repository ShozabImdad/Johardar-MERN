import express from 'express'
import { login, logout, register} from '../controllers/auth.js';
import {auth, adminAuth} from '../middleware/auth.js'


const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.post("/logout", auth, logout);

//protected route user auth
router.get("/user-auth", auth, (req, res) => {
    res.status(200).send({ ok: true, message: "You are authenticated" });
  });
  
  //protected route admin auth
  router.get("/admin-auth", auth, adminAuth, (req, res) => {
    res.status(200).send({ ok: true, message: "You are authenticated" });
  });

export default router;