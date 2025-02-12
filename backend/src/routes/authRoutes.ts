import express from "express";

import { checkAuth, login, logout, signup } from "../controllers/authController";
import { protectRoute } from "../middleware/authMiddleware";


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", protectRoute, checkAuth);

export default router;
