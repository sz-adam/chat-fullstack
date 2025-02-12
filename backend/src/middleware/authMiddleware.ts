import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { PrismaClient, User } from "@prisma/client";
import { handleError } from "../utils/errorHandler";

const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
  user?: User;
}

export const protectRoute = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {   
    const token = req.cookies.jwt;

    if (!token) {
      return handleError(res, 401, "Unauthorized - No Token Provided");
    } 
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: number;
    };

    if (!decoded) {
      return handleError(res, 401, "Unauthorized - Invalid Token");
    }
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return handleError(res, 404, "User not found");
    }

    req.user = user;

    next();
  } catch (error) {     
      console.error("Error in protectRoute middleware:", (error as Error).message);      
      return handleError(res, 500, "Internal server error");
   
  }
};
