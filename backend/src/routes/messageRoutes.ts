import express from "express";
import {
  allUser,
  deleteMessage,
  getAllMessages,
  sendMessage,
  unreadMessage,
} from "../controllers/messageController";
import { protectRoute } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/users", protectRoute, allUser);
router.post("/send/:id", protectRoute, sendMessage);
router.get("/:id", protectRoute, getAllMessages);
router.get("/unread/:id", protectRoute, unreadMessage);
router.delete("/delete/:id", protectRoute, deleteMessage);

export default router;
