import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import Employee from "../models/Employee.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "El usuario ya existe" });

    const user = await User.create({ email, password });
    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export async function getAllEmployees(req, res) {
  try {
    const employees = await Employee.find({}).populate("user", "email");
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener empleados", error });
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const employee = await Employee.findOne({ user: user._id });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        email: user.email,
        firstName: employee?.firstName,
        lastName: employee?.lastName,
        position: employee?.position,
        birthDate: employee?.birthDate,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Credenciales inválidas" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const logoutUser = (req, res) => {
  res.json({ message: "Logout exitoso, elimina el token en el cliente" });
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Token inválido o expirado" });
  }

  user.password = bcrypt.hashSync(newPassword, 10);
  user.resetToken = null;
  user.resetTokenExpiry = null;
  await user.save();

  res.json({ message: "Contraseña restablecida correctamente" });
};

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetToken = resetToken;
  user.resetTokenExpiry = Date.now() + 3600000;
  await user.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: "tuemail@gmail.com", pass: "tucontraseña" },
  });

  const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

  await transporter.sendMail({
    to: email,
    subject: "Recuperación de contraseña",
    text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`,
  });

  res.json({ message: "Email enviado. Revisa tu bandeja de entrada." });
};
