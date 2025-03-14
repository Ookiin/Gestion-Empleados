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
    if (userExists) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      password: hashedPassword,
      role: "admin",
    });

    await user.save();

    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword && user.role !== "admin") {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    let employeeData = null;
    let adminData = null;

    if (user.role === "admin") {
      adminData = await User.findOne({ email: user.email });
      res.json({
        _id: user._id,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    }

    if (user.role === "employee") {
      employeeData = await Employee.findOne({ user: user._id });
      res.json({
        _id: user._id,
        email: user.email,
        firstName: employeeData?.firstName,
        lastName: employeeData?.lastName,
        position: employeeData?.position || "",
        birthDate: employeeData?.birthDate || "",
        role: user.role,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const logoutUser = (req, res) => {
  res.json({ message: "Logout exitoso, elimina el token en el cliente" });
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
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  const resetLink = `${process.env.RESET_URL}/reset-password/${resetToken}`;

  await transporter.sendMail({
    to: email,
    subject: "Recuperación de contraseña",
    text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`,
  });

  res.json({ message: "Email enviado. Revisa tu bandeja de entrada." });
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Token inválido o expirado" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.json({ message: "Contraseña restablecida con éxito" });
  } catch (error) {
    console.error("Error en resetPassword:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
