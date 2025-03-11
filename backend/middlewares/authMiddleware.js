import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;
      console.log("Usuario autenticado: ", req.user);
      next();
    } catch (error) {
      res.status(401).json({ message: "Token no válido o expirado" });
    }
  } else {
    res.status(401).json({ message: "No hay token, acceso denegado" });
  }
};

export default protect;
