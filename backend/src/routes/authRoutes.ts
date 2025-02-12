import express from "express";

import { checkAuth, login, logout, signup } from "../controllers/authController";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", checkAuth);

export default router;
