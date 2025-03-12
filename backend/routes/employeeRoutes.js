import express from "express";
import {
  getEmployees,
  searchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getEmployees);
router.get("/search", protect, searchEmployees);
router.post("/", protect, createEmployee);
router.put("/:id/update", protect, updateEmployee);
router.delete("/:id", protect, deleteEmployee);

export default router;
