import express from "express";
import userRoutes from "@/routes/userRoutes";
import authRoutes from "@/routes/authRoutes"; // if you have auth routes
import errorHandler from "@/middlewares/errorHandler";

const app = express();

// Body parser
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes); // optional, if auth routes exist

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "API is running" });
});

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
