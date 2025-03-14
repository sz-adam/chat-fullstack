import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import { handleError } from "../utils/errorHandler";
import { getReceiverSocketId, io } from "../utils/socket";

const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
  user?: User;
}

// Olvasatlan üzenetek 
export const unreadMessage = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = Number(req.user?.id);
    if (!userId) {
      return handleError(res, 400, "User ID is required");
    }

    const unreadMessages = await prisma.message.findMany({
      where: {
        receiverId: userId,
        isRead: false,
      },
      orderBy: { createdAt: "asc" },
    });

    res.status(200).json(unreadMessages);
  } catch (error) {
    console.error("Error fetching unread messages:", error);   
    handleError(res, 500, "Internal server error");
  }
};

//Összes felhasználó kivéve a bejelentkezett
export const allUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      return handleError(res, 401, "Not authorized");
    }

    const loggedInUserId = req.user.id;

    const filteredUsers = await prisma.user.findMany({
      where: { id: { not: loggedInUserId } },
      select: {
        id: true,
        fullName: true,
        profilePic: true,
      },
    });

    // Olvasatlan üzenetek számának lekérése
    const usersWithUnreadMessages = await Promise.all(
      filteredUsers.map(async (user) => {
        const unreadCount = await prisma.message.count({
          where: {
            senderId: user.id,
            receiverId: loggedInUserId,
            isRead: false,
          },
        });
        return { ...user, unreadMessages: unreadCount };
      })
    );

    res.status(200).json(usersWithUnreadMessages);
  } catch (error) {
    console.error(error);
    handleError(res, 500, "Something went wrong");
  }
};

// Üzenet küldése
export const sendMessage = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { text } = req.body;
    const receiverId = Number(req.params?.id);
    const senderId = Number(req.user?.id);

    const newMessage = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        text,
        createdAt: new Date(),
        isRead: false,
      },
    });
    //socket üzenet küldés
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage controller:", error);
    handleError(res, 500, "Internal server error");
  }
};

export const getAllMessages = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userToChatId = Number(req.params?.id);
    const loggedInUserId = Number(req.user?.id);

    // olvasatlan üzenetek állapotának frissítése
    await prisma.message.updateMany({
      where: {
        senderId: userToChatId,
        receiverId: loggedInUserId,
        isRead: false,
      },
      data: { isRead: true },
    });

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: loggedInUserId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: loggedInUserId },
        ],
      },
      orderBy: { createdAt: "asc" },
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages controller:", error);
    handleError(res, 500, "Internal server error");
  }
};


//üzenet törlése 
export const deleteMessage = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const messageId = Number(req.params?.id);
    const loggedInUserId = Number(req.user?.id);

    if (!messageId) {
      return handleError(res, 400, "Message ID is required");
    }

    // Ellenőrizzük, hogy az üzenet létezik-e és a bejelentkezett felhasználó küldte-e
    const message = await prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      return handleError(res, 404, "Message not found");
    }

    if (message.senderId !== loggedInUserId) {
      return handleError(res, 403, "You can only delete your own messages");
    }

    await prisma.message.delete({
      where: { id: messageId },
    });

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error in deleteMessage controller:", error);
    handleError(res, 500, "Internal server error");
  }
};
