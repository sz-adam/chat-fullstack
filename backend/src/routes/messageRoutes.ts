import express from "express";
import { allUser, sendMessage } from "../controllers/messageController";
import { protectRoute } from "../middleware/authMiddleware";


const router = express.Router();

router.get("/users", protectRoute, allUser);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
