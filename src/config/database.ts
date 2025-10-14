import mongoose from "mongoose";
import { environment } from "@/config/environment";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(environment.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
