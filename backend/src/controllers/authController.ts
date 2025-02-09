import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { handleError } from "../utils/errorHandler";
import { generateToken } from "../utils/jwt";

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return handleError(res, 400, "All fields are required");
  }

  if (password.length < 6) {
    return handleError(res, 400, "Password must be at least 6 characters");
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return handleError(res, 400, "Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { fullName, email, password: hashedPassword },
    });

    // JWT generálás regisztráció utáni egybőli belépéshez
    generateToken(Number(newUser.id), res);

    res.status(201).json({
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,     
    });
  } catch (error) {
    console.error("An error occurred during registration:", error);
    return handleError(res, 500, "An error occurred during registration.");
  }
};

export const login = (req: Request, res: Response) => {
  res.send("login route");
};

export const logout = (req: Request, res: Response) => {
  res.send("logout");
};
