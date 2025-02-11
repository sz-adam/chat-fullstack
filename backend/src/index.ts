import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server started ${PORT}`);
});
