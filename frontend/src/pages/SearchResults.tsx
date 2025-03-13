import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Employee } from "../utilities/interfaces";
import CardEmployee from "../components/cardEmployee";
import EmployeeModal from "../components/modalEmployee";
import axios from "axios";
import { fetchEmployees, updateUser } from "../services/authService";

const apiUrl = import.meta.env.VITE_API_URL;

export default function SearchResults() {
  const location = useLocation();
  const { results } = location.state || { results: [] };
  const navigate = useNavigate();
  const [positions, setPositions] = useState<string[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

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

  const fetchEmployeesData = async (token: string) => {
    try {
      const employeesList = await fetchEmployees(token);
      setEmployees(employeesList);
    } catch (error) {
      console.error("Error al obtener empleados:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchEmployeesData(token);
    }
  }, []);

  const handleUpdateEmployee = async (
    employeeId: string,
    newFirstName: string,
    newPosition: string
  ) => {
    const token = localStorage.getItem("token");
    const employee = employees.find((emp) => emp._id === employeeId);

    if (employee && token && (newFirstName || newPosition)) {
      try {
        if (employee.user && employee.user._id) {
          const updateData: { firstName?: string; position?: string } = {};

          if (newFirstName) {
            updateData.firstName = newFirstName;
          }
          if (newPosition) {
            updateData.position = newPosition;
          }

          await updateUser(token, employee.user._id, updateData);
          navigate(-1);
        }

        await fetchEmployeesData(token);
      } catch (error) {
        console.error("Error al actualizar los datos:", error);
      }
    }
  };

  return (
    <div>
      <h1>Resultados de la Búsqueda</h1>
      {results && results.length > 0 ? (
        <div>
          {results.map((employee: Employee) => (
            <div
              key={employee._id}
              onClick={() => setSelectedEmployee(employee)}
            >
              <CardEmployee employee={employee} />
            </div>
          ))}
        </div>
      ) : (
        <p>No se encontraron empleados.</p>
      )}
      <button onClick={() => navigate(-1)}>Volver</button>

      {selectedEmployee && (
        <EmployeeModal
          isOpen={!!selectedEmployee}
          employee={selectedEmployee}
          positions={positions}
          onUpdate={handleUpdateEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
}
