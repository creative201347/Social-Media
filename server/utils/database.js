import mongoose from "mongoose";
import logger from "./logger.js";

const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING ||
  "mongodb+srv://nabin:dhami@cluster0.tgsmw.mongodb.net/?retryWrites=true&w=majority";

export async function connectToDatabase() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    logger.info("Successfully connected to database");
  } catch (e) {
    logger.error(e, "Failed to connect to database. Goodbye");
    process.exit(1);
  }
}
