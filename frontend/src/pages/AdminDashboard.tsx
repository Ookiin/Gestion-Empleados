// src/pages/AdminDashboard.tsx
import { useState, useEffect } from "react";
import { updateUser, fetchEmployees } from "../services/authService";
import {
  DashboardContainer,
  Title,
  EmployeeList,
  EmployeeItem,
  EmployeeInfo,
} from "../../styles/index";
import LogoutButton from "../components/logoutButton";
import EmployeeModal from "../components/modalEmployee";
import { Employee } from "../utilities/interfaces";

const apiPositions = import.meta.env.VITE_API_POSITIONS;

export default function AdminDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [positions, setPositions] = useState<string[]>([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await fetch(apiPositions);
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
    <DashboardContainer>
      <Title>Lista de empleados</Title>
      <EmployeeList>
        {employees.map((emp) => (
          <EmployeeItem key={emp._id}>
            <EmployeeInfo onClick={() => handleEmployeeClick(emp)}>
              <span>
                {emp.firstName} {emp.lastName} - {emp.position}
              </span>
            </EmployeeInfo>
          </EmployeeItem>
        ))}
      </EmployeeList>

      <EmployeeModal
        isOpen={!!selectedEmployee}
        employee={selectedEmployee}
        positions={positions}
        onUpdate={handleUpdateEmployee}
        onClose={() => setSelectedEmployee(null)}
      />

      <LogoutButton />
    </DashboardContainer>
  );
}
