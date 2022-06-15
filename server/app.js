import express from "express";
import bodyParser from "body-parser";

import logger from "./utils/logger.js";
import { connectToDatabase } from "./utils/database.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  logger.info(`http://localhost:${PORT}`);
  await connectToDatabase();
});
