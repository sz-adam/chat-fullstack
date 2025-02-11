import jwt from "jsonwebtoken";
import { Response } from "express";

//jwt cookiba való elhelyezés
export const generateToken = (userId: number, res: Response) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET || "defaultSecret",
    {
      expiresIn: "7d",
    }
  );

  res.cookie("jwt", token, {
    maxAge: 60 * 60 * 24 * 7 * 1000, // 7 nap élettartam
    httpOnly: true,
    sameSite: "strict", // CSRF támadások megelőzése érdekében
    secure: process.env.NODE_ENV === "production", // Csak HTTPS-en küldjük, ha production környezetben vagyunk
  });
  return token;
};
