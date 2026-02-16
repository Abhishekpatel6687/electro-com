import express from "express";
import { register, login } from "../controllers/authController.js";
import { authorize, protect,  } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", protect, (req, res) => {
  res.json({ user: req.user });
});

router.get(
  "/admin-dashboard",
  protect,
  authorize("superadmin"),
  (req, res) => {
    res.json({ message: "Welcome Super Admin" });
  }
);

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

export default router;
