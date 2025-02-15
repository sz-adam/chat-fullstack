import express from "express";
import {
  allUser,
  getAllMessages,
  sendMessage,
} from "../controllers/messageController";
import { protectRoute } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/users", protectRoute, allUser);
router.post("/send/:id", protectRoute, sendMessage);
router.get("/:id", protectRoute, getAllMessages);

export default router;
