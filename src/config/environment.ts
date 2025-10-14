import dotenv from "dotenv";
dotenv.config();

export const environment = {
  API_URL: process.env.API_URL || "http://localhost:4000/api",
  PORT: process.env.PORT || 4000,
  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb+srv://rithsophea_db_user:r8zbSqOC3j2QoAs0@cluster0.sjw7iau.mongodb.net/?retryWrites=true&w=majority",
};
