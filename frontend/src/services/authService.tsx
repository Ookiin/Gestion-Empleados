import axios from "axios";
import { DataToSend } from "../utilities/interfaces";

const apiUrl = import.meta.env.VITE_API_URL;

export const registerUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${apiUrl}/register`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error en el registro:", error);
    throw error;
  }
};

export const fetchEmployees = async (token: string) => {
  try {
    const response = await axios.get(`${apiUrl}/employees`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    throw error;
  }
};

export const updateUser = async (
  token: string,
  id: string,
  position: string,
  firstName?: string
) => {
  const dataToSend: DataToSend = { position };
  if (firstName) dataToSend.firstName = firstName;

  const url = `${apiUrl}/employees/${id}/update`;
  const response = await axios.put(url, dataToSend, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const updatedEmployee = response.data;
  localStorage.setItem("user", JSON.stringify(updatedEmployee));
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${apiUrl}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getRole = () => {
  return localStorage.getItem("role");
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

export const isAuthenticated = () => {
  const token = getToken();
  return token !== null;
};
