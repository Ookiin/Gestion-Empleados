import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export async function getEmployees(req, res) {
  try {
    const employees = await Employee.find({}).populate("user", "email");
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    res.status(500).json({ message: "Error al obtener empleados", error });
  }
}

export async function searchEmployees(req, res) {
  try {
    const { name } = req.query;
    const employees = await find({
      $or: [
        { firstName: new RegExp(name, "i") },
        { lastName: new RegExp(name, "i") },
      ],
    });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error en la búsqueda", error });
  }
}

export async function createEmployee(req, res) {
  try {
    const { firstName, lastName, position, birthDate, email, password } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !position ||
      !birthDate ||
      !email ||
      !password
    ) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "El correo electrónico ya está registrado" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      role: "employee",
    });

    await newUser.save();

    const newEmployee = new Employee({
      firstName,
      lastName,
      position,
      birthDate,
      user: newUser._id,
    });

    await newEmployee.save();

    res.status(201).json({
      message: "Empleado y usuario creados exitosamente",
      employee: newEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el empleado", error });
  }
}

export async function updateEmployee(req, res) {
  try {
    const { firstName, position } = req.body;

    if (!position && !firstName) {
      return res
        .status(400)
        .json({ message: "Se requiere al menos un campo para actualizar" });
    }

    const employee = await Employee.findOne({ user: req.params.id });

    if (!employee) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    if (req.user.role === "admin") {
      if (firstName) employee.firstName = firstName;
      if (position) employee.position = position;
    } else if (req.user.id === employee.user.toString()) {
      if (position) {
        employee.position = position;
      } else {
        return res
          .status(403)
          .json({ message: "No tienes permiso para modificar el nombre" });
      }
    } else {
      return res
        .status(403)
        .json({ message: "No autorizado para modificar este empleado" });
    }

    await employee.save();
    res.status(200).json(employee);
  } catch (error) {
    console.error("Error al actualizar empleado:", error);
    res.status(500).json({
      message: "Error al actualizar el empleado",
      error: error.message,
    });
  }
}

export async function deleteEmployee(req, res) {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    if (req.user.role !== "admin" && req.user.id !== employee.user.toString()) {
      return res
        .status(403)
        .json({ message: "No autorizado para eliminar este empleado" });
    }

    await employee.deleteOne();

    await User.findByIdAndDelete(employee.user);

    res
      .status(200)
      .json({ message: "Empleado y usuario eliminados correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar empleado", error });
  }
}
