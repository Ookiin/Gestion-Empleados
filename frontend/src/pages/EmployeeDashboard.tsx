import { useState, useEffect } from "react";
import { fetchEmployees, updateUser } from "../services/authService";
import { Employee } from "../utilities/interfaces";
import axios from "axios";
import {
  ButtonsContainer,
  CardEmployee,
  DashboardContainerEmployee,
  EmployeeInfoEmployee,
  SearchContainer,
  SelectContainerEmployee,
  StyledButtonEmployee,
  StyledSelectEmployee,
} from "../../styles";
import ActionButton from "../components/button";
import Loader from "../components/loader";
import Search from "../components/search";

const apiUrl = import.meta.env.VITE_API_URL;

export default function EmployeeDashboard() {
  const [employeeData, setEmployeeData] = useState<Employee | null>(null);
  const [newPosition, setNewPosition] = useState<string>("");
  const [positions, setPositions] = useState<string[]>([]);
  const [activePosition, setActivePosition] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      const parsedUser = JSON.parse(userData);

      const getEmployeeData = async () => {
        try {
          const employees = await fetchEmployees(token);

          const employee = employees.find(
            (emp: Employee) =>
              emp._id === parsedUser._id || emp.user._id === parsedUser._id
          );

          if (employee) {
            setEmployeeData(employee);
            localStorage.setItem("user", JSON.stringify(employee));
          } else {
            console.error("Empleado no encontrado");
          }
        } catch (error) {
          console.error("Error obteniendo datos del empleado:", error);
        }
      };

      getEmployeeData();
    }
  }, []);

  useEffect(() => {
    if (employeeData) {
      setActivePosition(employeeData.position);
    }
  }, [employeeData]);

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
        if (employeeData && employeeData.user) {
          await updateUser(token, employeeData.user._id, {
            position: newPosition,
          });
          setActivePosition(newPosition);
        }
      } catch (error) {
        console.error("Error al actualizar la posición:", error);
      }
    }
  };

  return (
    <>
      <SearchContainer>
        <Search />
      </SearchContainer>
      <DashboardContainerEmployee>
        {employeeData ? (
          <CardEmployee>
            <h3>Datos del Empleado</h3>
            <EmployeeInfoEmployee>
              <p>
                <strong>Nombre:</strong> {employeeData.firstName}{" "}
                {employeeData.lastName}
              </p>
              <p>
                <strong>Posición Actual:</strong> {activePosition}
              </p>
              <p>
                <strong>Email:</strong> {employeeData.email}
              </p>
              <p>
                <strong>Fecha de Nacimiento:</strong>{" "}
                {new Date(employeeData.birthDate).toLocaleDateString("es-ES")}
              </p>
            </EmployeeInfoEmployee>

            <SelectContainerEmployee>
              <label htmlFor="position-select">Cambiar Posición:</label>
              <StyledSelectEmployee
                id="position-select"
                value={newPosition}
                onChange={(e) => setNewPosition(e.target.value)}
              >
                <option value="">Seleccione una posición</option>
                {positions.map((position, index) => (
                  <option key={index} value={position}>
                    {position}
                  </option>
                ))}
              </StyledSelectEmployee>
            </SelectContainerEmployee>

            <StyledButtonEmployee onClick={handlePositionChange}>
              Actualizar Posición
            </StyledButtonEmployee>
            <ButtonsContainer>
              <ActionButton
                buttonText={"Cerrar Sesión"}
                token=""
                employeeId=""
                color="grey"
              />
              <ActionButton
                buttonText="Eliminar empleado"
                token={localStorage.getItem("token") || ""}
                employeeId={employeeData._id}
                color="red"
              />
            </ButtonsContainer>
          </CardEmployee>
        ) : (
          <Loader />
        )}
      </DashboardContainerEmployee>
    </>
  );
}
