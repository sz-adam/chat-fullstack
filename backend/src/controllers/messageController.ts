import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import { handleError } from "../utils/errorHandler";

const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
  user?: User;
}

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
      where: {
        id: { not: loggedInUserId },
      },
      select: {
        id: true,
        fullName: true,
        profilePic: true,
      },
    });

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error(error);
    handleError(res, 500, "Something went wrong");
  }
};

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
      },
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage controller:", error);
    handleError(res, 500, "Internal server error");
  }
};
