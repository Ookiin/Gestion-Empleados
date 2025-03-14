import axios from "axios";

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

export const deleteEmployee = async (token: string, id: string) => {
  try {
    const response = await axios.delete(`${apiUrl}/employees/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar empleado:", error);
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/forgot-password`, {
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Error al enviar el enlace de recuperación:", error);
    throw error;
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const response = await axios.post(
      `${apiUrl}/auth/reset-password/${token}`,
      { newPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al restablecer la contraseña:", error);
    throw error;
  }
};

export const updateUser = async (
  token: string,
  id: string,
  updateData: { position?: string; firstName?: string }
) => {
  const url = `${apiUrl}/employees/${id}/update`;
  try {
    const response = await axios.put(url, updateData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const updatedEmployee = response.data;
    localStorage.setItem("user", JSON.stringify(updatedEmployee));
    return updatedEmployee;
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${apiUrl}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const searchEmployees = async (name: string) => {
  try {
    const response = await axios.get(`${apiUrl}/employees/search`, {
      params: { name },
    });
    return response.data;
  } catch (error) {
    console.error("Error al buscar empleados:", error);
    throw error;
  }
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
