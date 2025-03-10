import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient, User } from "@prisma/client";
import { handleError } from "../utils/errorHandler";
import { generateToken } from "../utils/jwt";

//TODO: profilképet megoldani

interface AuthenticatedRequest extends Request {
  user?: User; 
}

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { fullName, email, password, avatar } = req.body;

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
      data: { fullName, email, password: hashedPassword, profilePic:avatar },
    });

    // JWT generálás regisztráció utáni egybőli belépéshez
    generateToken(Number(newUser.id), res);

    res.status(201).json({
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.error("An error occurred during registration:", error);
    return handleError(res, 500, "An error occurred during registration.");
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return handleError(res, 400, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return handleError(res, 400, "Incorrect password");
    }
    const token = generateToken(user.id, res);

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic || "",
        isDarkMod: user.isDarkMod,
      },
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return handleError(res, 500, "An internal error has occurred");
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out succesfully" });
  } catch (error) {
    console.log("Error in logout controller", error);
    return handleError(res, 500, "Internal Server Error");
  }
};

export const checkAuth = (req: AuthenticatedRequest, res: Response): void => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", (error as Error).message);
    return handleError(res, 500, "Internal server error");
  }
};