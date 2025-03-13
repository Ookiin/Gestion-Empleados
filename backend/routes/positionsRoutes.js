import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(process.env.API_POSITIONS);
    res.json(response.data);
  } catch (error) {
    console.error("Error al obtener posiciones:", error);
    res.status(500).json({ message: "Error obteniendo posiciones" });
  }
});

export default router;
