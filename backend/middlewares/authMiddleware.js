import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "No autorizado" });
      }

      req.user = {
        id: user._id.toString(),
        role: user.role,
      };

      next();
    } catch (error) {
      console.error("Error en protect middleware:", error);
      res.status(401).json({ message: "Token inválido o expirado" });
    }
  } else {
    res.status(401).json({ message: "No hay token, no autorizado" });
  }
});

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Acceso denegado: solo admins" });
  }
};

const employeeOrAdmin = (req, res, next) => {
  if (
    req.user &&
    (req.user.role === "admin" || req.user.id === req.params.id)
  ) {
    next();
  } else {
    res.status(403).json({ message: "No autorizado para esta acción" });
  }
};

export { protect, adminOnly, employeeOrAdmin };
export default protect;
