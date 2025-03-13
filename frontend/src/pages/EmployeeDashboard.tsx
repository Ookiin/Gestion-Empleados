import { useState, useEffect } from "react";
import { updateUser } from "../services/authService";
import { Employee } from "../utilities/interfaces";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function EmployeeDashboard() {
  const [employeeData, setEmployeeData] = useState<Employee | null>(null);
  const [newPosition, setNewPosition] = useState<string>("");
  const [positions, setPositions] = useState<string[]>([]);
  const [activePosition, setActivePosition] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = localStorage.getItem("user");
      if (userData) {
        setEmployeeData(JSON.parse(userData));
      }
    }
  }, []);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get(`${apiUrl}/positions`);
        setPositions(response.data.positions);
      } catch (error) {
        console.error("Error obteniendo posiciones:", error);
      }
    };

    fetchPositions();
  }, []);

  const handlePositionChange = async () => {
    const token = localStorage.getItem("token");
    if (token && newPosition) {
      try {
        if (employeeData) {
          await updateUser(token, employeeData._id, { position: newPosition });
        }
        setActivePosition(newPosition);
      } catch (error) {
        console.error("Error al actualizar la posición:", error);
      }
    }
  };

  return (
    <div>
      {employeeData ? (
        <div>
          <h3>Datos del empleado</h3>
          <p>
            {employeeData.firstName} {employeeData.lastName} - {activePosition}
          </p>
          <p>Fecha de nacimiento: {employeeData.birthDate}</p>

          <select
            value={newPosition}
            onChange={(e) => setNewPosition(e.target.value)}
          >
            <option value="">Seleccione una posición</option>
            {positions.map((position, index) => (
              <option key={index} value={position}>
                {position}
              </option>
            ))}
          </select>

          <button onClick={handlePositionChange}>Actualizar posición</button>
        </div>
      ) : (
        <p>Cargando datos del empleado...</p>
      )}
    </div>
  );
}
