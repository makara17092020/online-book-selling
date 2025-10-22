import express, { Request, Response, NextFunction } from "express";
import authRoutes from "@/routes/authRoutes";
import adminRoutes from "@/routes/adminRoutes";
import bookRoute from "@/routes/bookRoutes";
import errorHandler from "@/middlewares/errorHandler";
import userRoutes from "@/routes/userRoutes";
import orderRoutes from "@/routes/orderRoutes";
import orderItemRoutes from "@/routes/orderItemRoutes";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/books", bookRoute); // corrected to plural for consistency
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/order-items", orderItemRoutes);

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

export default app;
