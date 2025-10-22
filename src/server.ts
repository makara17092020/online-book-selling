// src/server.ts
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { environment } from "@/config/environment";
import { Role } from "@/models/role";
import app from "./app";

// Routes
import authRoutes from "@/routes/authRoutes";
import adminRoutes from "@/routes/adminRoutes";
import categoryRoutes from "@/routes/categoryRoutes"; // Added

// Initialize default roles
const initRoles = async () => {
  const roles = ["User", "Admin"];
  for (const name of roles) {
    const exists = await Role.findOne({ name });
    if (!exists) {
      await Role.create({ name });
      console.log(`✅ Role '${name}' created`);
    }
  }
};

// Register routes BEFORE starting the server
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/v1/categories", categoryRoutes);

// Health check
app.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true });
});

// Global error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Connect DB and start server
const startServer = async () => {
  try {
    await mongoose.connect(environment.MONGODB_URI);
    console.log("✅ MongoDB connected");

    await initRoles();

    app.listen(environment.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${environment.PORT}`);
    });
  } catch (err) {
    console.error("❌ Server startup error:", err);
    process.exit(1);
  }
};

startServer();
