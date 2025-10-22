import mongoose from "mongoose";
import { environment } from "@/config/environment";
import { Role } from "@/models/role";
import app from "./app";

// Initialize default roles
const initRoles = async () => {
  const roles = ["User", "Admin"];
  for (const name of roles) {
    const exists = await Role.findOne({ name });
    if (!exists) {
      await Role.create({ name });
      console.log(`Role '${name}' created`);
    }
  }
};

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
