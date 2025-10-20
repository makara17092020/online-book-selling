import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { environment } from "@/config/environment";
import authRoutes from "@/routes/authRoutes";
import errorHandler from "@/middlewares/errorHandler";
import { Role } from "@/models/role";

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ success: true, message: "API is running" });
});
app.use(errorHandler);

// Initialize roles
const initRoles = async () => {
  const roles = ["User", "Admin"];
  for (const name of roles) {
    const exists = await Role.findOne({ name });
    if (!exists) {
      await Role.create({ name });
      console.log(`Role '${name}' created`);
    } else {
      console.log(`Role '${name}' already exists`);
    }
  }
};

// Connect DB and start server
const startServer = async () => {
  try {
    await mongoose.connect(environment.MONGODB_URI);
    console.log("MongoDB connected");
    await initRoles();
    app.listen(environment.PORT, () =>
      console.log(`Server running at http://localhost:${environment.PORT}`)
    );
  } catch (err) {
    console.error("Server startup error:", err);
    process.exit(1);
  }
};

startServer();
export default app;
