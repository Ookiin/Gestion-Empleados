import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  requestPasswordReset,
  resetPassword,
  getAllEmployees,
} from "../controllers/authController.js";
import { getPositions } from "../controllers/employeeController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", protect, registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/forgot-password", requestPasswordReset);
router.post("/reset-password", resetPassword);
router.get("/", protect, getAllEmployees);
router.get("/positions", getPositions);

export default router;
