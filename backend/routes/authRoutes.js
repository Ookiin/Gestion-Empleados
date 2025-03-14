import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  requestPasswordReset,
} from "../controllers/authController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);
router.post("/forgot-password", requestPasswordReset);

export default router;
