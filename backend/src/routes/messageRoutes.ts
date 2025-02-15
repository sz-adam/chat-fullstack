import express from "express";
import { allUser } from "../controllers/messageController";
import { protectRoute } from "../middleware/authMiddleware";


const router = express.Router();

router.get("/users", protectRoute, allUser);

export default router;
