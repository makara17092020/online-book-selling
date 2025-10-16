import dotenv from "dotenv";
dotenv.config();

export const environment = {
  API_URL: process.env.API_URL || "http://localhost:4000/api",
  PORT: process.env.PORT || 4000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://...",
  JWT_SECRET: process.env.JWT_SECRET || "changeme",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "admin123", // 👈 add this
};
