import express, { json } from "express";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import positionsRoutes from "./routes/positionsRoutes.js";

config();
connectDB();

const app = express();

app.use(express.json());

app.use(cors());
app.use(json());

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/positions", positionsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
