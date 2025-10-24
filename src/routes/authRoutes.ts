import { Router } from "express";
import { register, login, logout } from "@/controllers/authController";
import { checkRole } from "@/middlewares/auth";

const router = Router();

// ---------------------- AUTH ROUTES ----------------------

// Register a new user (role auto-assigned inside service)
router.post("/register", register);

// Login (returns JWT with role)
router.post("/login", login);

// Logout (protected route, only logged-in users can logout)
router.post("/logout", checkRole(["Admin", "Customer"]), logout);

// Example protected route for Admin only
router.get("/admin-dashboard", checkRole(["Admin"]), (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin!",
    user: req.user, // ✅ no more TypeScript error
  });
});

router.get("/profile", checkRole(["Customer", "Admin"]), (req, res) => {
  res.json({
    success: true,
    message: "User profile accessed",
    user: req.user, // ✅ safe
  });
});

export default router;
