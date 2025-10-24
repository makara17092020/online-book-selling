// src/server.ts
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { environment } from "@/config/environment";
import { Role } from "@/models/role";
import { User } from "@/models/user";
import app from "./app";
import "@/types/express";

// Routes
import authRoutes from "@/routes/authRoutes";
import adminRoutes from "@/routes/adminRoutes";
import categoryRoutes from "@/routes/categoryRoutes";

// ---------------------
// 1️⃣ Initialize default roles
// ---------------------
const initRoles = async () => {
  const roles = ["Customer", "Admin"];
  for (const name of roles) {
    const exists = await Role.findOne({ name });
    if (!exists) {
      await Role.create({ name });
      console.log(`✅ Role '${name}' created`);
    }
  }
};

// ---------------------
// 2️⃣ Create default Admin
// ---------------------
const createDefaultAdmin = async () => {
  const adminEmail = environment.ADMIN_EMAIL;
  const adminPassword = environment.ADMIN_PASSWORD;

  if (!adminEmail) throw new Error("ADMIN_EMAIL is not set in .env");
  if (!adminPassword) throw new Error("ADMIN_PASSWORD is not set in .env");

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (existingAdmin) return;

  const adminRole = await Role.findOne({ name: "Admin" });
  if (!adminRole)
    throw new Error("Admin role not found. Initialize roles first.");

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await User.create({
    firstName: "Admin",
    lastName: "User",
    userName: "admin",
    email: adminEmail,
    password: hashedPassword,
    roleId: adminRole._id,
  });

  console.log("✅ Default Admin user created");
};

// ---------------------
// 3️⃣ Register routes
// ---------------------
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/v1/categories", categoryRoutes);

// ---------------------
// 4️⃣ Health check
// ---------------------
app.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true });
});

// ---------------------
// 5️⃣ Global error handler
// ---------------------
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ---------------------
// 6️⃣ Connect DB and start server
// ---------------------
const startServer = async () => {
  try {
    await mongoose.connect(environment.MONGODB_URI);
    console.log("✅ MongoDB connected");

    // Init roles & default admin
    await initRoles();
    await createDefaultAdmin();

    app.listen(environment.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${environment.PORT}`);
    });
  } catch (err) {
    console.error("❌ Server startup error:", err);
    process.exit(1);
  }
};

startServer();
