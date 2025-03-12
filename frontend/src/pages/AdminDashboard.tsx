import { useState, useEffect } from "react";
import { updateUser, fetchEmployees } from "../services/authService";

interface Employee {
  user: {
    _id: string;
  };
  _id: string;
  firstName: string;
  lastName: string;
  position: string;
}

function AdminDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editEmployeeId, setEditEmployeeId] = useState<string | null>(null);
  const [newFirstName, setNewFirstName] = useState<string>("");
  const [newPosition, setNewPosition] = useState<string>("");
  const [positions, setPositions] = useState<string[]>([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await fetch("https://ibillboard.com/api/positions");
        const data = await response.json();
        setPositions(data.positions);
      } catch (error) {
        console.error("Error al obtener posiciones:", error);
      }
    };

    fetchPositions();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchEmployeesData(token);
    }
  }, []);

  const fetchEmployeesData = async (token: string) => {
    try {
      const employeesList = await fetchEmployees(token);
      setEmployees(employeesList);
    } catch (error) {
      console.error("Error al obtener empleados:", error);
    }
  };

  const handleEditClick = (employee: Employee) => {
    setEditEmployeeId(employee._id);
    setNewFirstName(employee.firstName);
    setNewPosition(employee.position);
  };

  const handleUpdateEmployee = async (employeeId: string) => {
    const token = localStorage.getItem("token");
    const employee = employees.find((emp) => emp._id === employeeId);

    if (employee && token && (newFirstName || newPosition)) {
      try {
        if (employee.user && employee.user._id) {
          await updateUser(token, employee.user._id, newPosition);
        }
        alert("Posición actualizada exitosamente.");
        await fetchEmployeesData(token);
      } catch (error) {
        console.error("Error al actualizar la posición:", error);
      }
    }
  };

  return (
    <div>
      <h3>Lista de empleados</h3>
      <ul>
        {employees.map((emp) => (
          <li key={emp._id}>
            {editEmployeeId === emp._id ? (
              <div>
                <input
                  type="text"
                  value={newFirstName}
                  onChange={(e) => setNewFirstName(e.target.value)}
                  placeholder="Nuevo nombre"
                />
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
                <button onClick={() => handleUpdateEmployee(emp._id)}>
                  Actualizar
                </button>
                <button onClick={() => setEditEmployeeId(null)}>
                  Cancelar
                </button>
              </div>
            ) : (
              <div>
                {emp.firstName} {emp.lastName} - {emp.position}
                <button onClick={() => handleEditClick(emp)}>Editar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
