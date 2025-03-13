import { useState, useEffect } from "react";
import { updateUser, fetchEmployees } from "../services/authService";
import {
  DashboardContainer,
  Title,
  EmployeeList,
  EmployeeItem,
  EmployeeInfo,
} from "../../styles/index";
import ActionButton from "../components/button";
import EmployeeModal from "../components/modalEmployee";
import { Employee } from "../utilities/interfaces";
import axios from "axios";
import Loader from "../components/loader";

const apiUrl = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [positions, setPositions] = useState<string[]>([]);

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

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

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
        }

        await fetchEmployeesData(token);
      } catch (error) {
        console.error("Error al actualizar los datos:", error);
      }
    }
  };

  if (employees.length === 0) {
    return <Loader />;
  }

  return (
    <DashboardContainer>
      <Title>Lista de empleados</Title>
      <EmployeeList>
        {employees.map((emp) => (
          <div key={emp._id}>
            <EmployeeItem>
              <EmployeeInfo onClick={() => handleEmployeeClick(emp)}>
                <span>
                  {emp.firstName} {emp.lastName} - {emp.position}
                </span>
              </EmployeeInfo>
              <ActionButton
                buttonText="Eliminar empleado"
                token={localStorage.getItem("token") || ""}
                employeeId={emp._id}
                color="red"
              />
            </EmployeeItem>
          </div>
        ))}
      </EmployeeList>

      <EmployeeModal
        isOpen={!!selectedEmployee}
        employee={selectedEmployee}
        positions={positions}
        onUpdate={handleUpdateEmployee}
        onClose={() => setSelectedEmployee(null)}
      />

      <ActionButton
        buttonText={"Cerrar Sesión"}
        token=""
        employeeId=""
        color="grey"
      />

      <ActionButton
        buttonText={"Nuevo Empleado"}
        token=""
        employeeId=""
        color="green"
      />
    </DashboardContainer>
  );
}
