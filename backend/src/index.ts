import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import messageRoutes from "./routes/messageRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, server } from "./utils/socket";
import { setupSwagger } from "./swagger/swaggerConfig";

dotenv.config();

const PORT = process.env.PORT || 5001;

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
setupSwagger(app);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, () => {
  console.log(`server started ${PORT}`);
});
