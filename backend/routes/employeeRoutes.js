import express from "express";
import {
  getEmployees,
  searchEmployees,
  createEmployee,
  updatePosition,
  deleteEmployee,
} from "../controllers/employeeController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getEmployees);
router.get("/search", searchEmployees);
router.post("/", createEmployee);
router.put("/:id/position", protect, updatePosition);
router.delete("/:id", protect, deleteEmployee);

export default router;
