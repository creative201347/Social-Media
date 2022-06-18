import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

import logger from "./utils/logger.js";
import { connectToDatabase } from "./utils/database.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import uploadRoutes from "./routes/upload.route.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/posts", postRoutes);
app.use("/upload", uploadRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  logger.info(`http://localhost:${PORT}`);
  await connectToDatabase();
});
