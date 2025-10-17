import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { environment } from "@/config/environment";
import authRoutes from "@/routes/authRoutes"; //  add this
import adminRoutes from "@/routes/adminRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(environment.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });

//  Add Auth Routes
app.use("/api/auth", authRoutes);

// Add Admin Route
app.use("/api/admin", adminRoutes);

app.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true });
});

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(environment.PORT, () => {
  console.log(`🚀 Server running on port ${environment.PORT}`);
});
