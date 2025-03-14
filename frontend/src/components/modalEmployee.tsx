import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalInput,
  ModalSelect,
  Button,
  CloseButton,
  ButtonsContainer,
} from "../../styles/index";
import { EmployeeModalProps } from "../utilities/interfaces";
import ActionButton from "./button";
import { useLocation } from "react-router-dom";

const EmployeeModal: React.FC<EmployeeModalProps> = ({
  isOpen,
  employee,
  positions,
  onUpdate,
  onClose,
}) => {
  const [newFirstName, setNewFirstName] = useState<string>("");
  const [newPosition, setNewPosition] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const location = useLocation();
  const currentPath = location.pathname;

  const handleUpdate = () => {
    if (employee) {
      onUpdate(employee._id, newFirstName, newPosition);
      onClose();
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) {
      setRole(role);
    }

    if (employee) {
      setNewFirstName(employee.firstName);
      setNewPosition(employee.position);
    }
  }, [employee]);

  if (!isOpen || !employee) return null;

  return (
    <Modal>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        {role === "admin" ? <ModalHeader>Editar Empleado</ModalHeader> : null}
        <ModalInput
          type="text"
          value={newFirstName}
          onChange={(e) => setNewFirstName(e.target.value)}
          placeholder="Nuevo nombre"
          readOnly={role !== "admin"}
        />
        <ModalInput
          type="text"
          value={employee.lastName}
          readOnly
          placeholder="Apellido"
        />
        <ModalInput
          type="text"
          value={employee.email}
          readOnly
          placeholder="Email"
        />
        <ModalInput
          type="text"
          value={new Date(employee.birthDate).toLocaleDateString("es-ES")}
          readOnly
          placeholder="Fecha de nacimiento"
        />
        <ModalSelect
          value={newPosition}
          onChange={(e) => setNewPosition(e.target.value)}
          disabled={role !== "admin"}
        >
          <option value="">Seleccione una posición</option>
          {positions.map((position, index) => (
            <option key={index} value={position}>
              {position}
            </option>
          ))}
        </ModalSelect>
        <ButtonsContainer>
          {role === "admin" && (
            <Button onClick={handleUpdate}>Actualizar</Button>
          )}
          {role === "admin" && currentPath !== "/adminDashboard" && (
            <ActionButton
              buttonText={"Eliminar empleado"}
              color={"red"}
              token={localStorage.getItem("token") || ""}
              employeeId={employee._id}
            />
          )}
        </ButtonsContainer>
      </ModalContent>
    </Modal>
  );
};

export default EmployeeModal;
