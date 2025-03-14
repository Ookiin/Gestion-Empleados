import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Employee } from "../utilities/interfaces";
import CardEmployee from "../components/cardEmployee";
import EmployeeModal from "../components/modalEmployee";
import {
  fetchEmployees,
  fetchPositions,
  updateUser,
} from "../services/authService";
import {
  ButtonContainer,
  CardsContainer,
  CardWrapper,
  Container,
  SearchButton,
} from "../../styles";

export default function SearchResults() {
  const location = useLocation();
  const { results } = location.state || { results: [] };
  const navigate = useNavigate();
  const [positions, setPositions] = useState<string[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const getPositions = async () => {
    const response = await fetchPositions();
    setPositions(response.positions);
  };

  const fetchEmployeesData = async (token: string) => {
    try {
      const employeesList = await fetchEmployees(token);
      setEmployees(employeesList);
    } catch (error) {
      console.error("Error al obtener empleados:", error);
    }
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
          navigate(-1);
        }

        await fetchEmployeesData(token);
      } catch (error) {
        console.error("Error al actualizar los datos:", error);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchEmployeesData(token);
    }
    getPositions();
  }, []);

  return (
    <Container>
      <h1>Resultados de la Búsqueda</h1>
      {results && results.length > 0 ? (
        <CardsContainer>
          {results.map((employee: Employee) => (
            <CardWrapper
              key={employee._id}
              onClick={() => setSelectedEmployee(employee)}
            >
              <CardEmployee employee={employee} />
            </CardWrapper>
          ))}
        </CardsContainer>
      ) : (
        <p>No se encontraron empleados.</p>
      )}
      <ButtonContainer>
        <SearchButton onClick={() => navigate(-1)}>Volver</SearchButton>
      </ButtonContainer>
      {selectedEmployee && (
        <EmployeeModal
          isOpen={!!selectedEmployee}
          employee={selectedEmployee}
          positions={positions}
          onUpdate={handleUpdateEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </Container>
  );
}
