import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes"

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
  console.log(`server started ${PORT}`);
});
