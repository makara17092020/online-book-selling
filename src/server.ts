import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { environment } from "@/config/environment";
import { Role } from "@/models/role";
import authRoutes from "@/routes/authRoutes";
import adminRoutes from "@/routes/adminRoutes";
import orderRoutes from "@/routes/orderRoute";
import orderItemRoutes from "@/routes/orderItemRoute";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(environment.MONGODB_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");

    // Initialize default roles
    if (!(await Role.findOne({ name: "User" })))
      await Role.create({ name: "User" });
    if (!(await Role.findOne({ name: "Admin" })))
      await Role.create({ name: "Admin" });

    console.log("✅ Default roles initialized");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/order-items", orderItemRoutes);

// Health check
app.get("/health", (_req: Request, res: Response) => res.json({ ok: true }));

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start server
app.listen(environment.PORT, () => {
  console.log(`🚀 Server running on port ${environment.PORT}`);
});
