import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalInput,
  ModalSelect,
  Button,
  CancelButton,
  CloseButton,
} from "../../styles/index";
import { EmployeeModalProps } from "../utilities/interfaces";

const EmployeeModal: React.FC<EmployeeModalProps> = ({
  isOpen,
  employee,
  positions,
  onUpdate,
  onClose,
}) => {
  const [newFirstName, setNewFirstName] = useState<string>("");
  const [newPosition, setNewPosition] = useState<string>("");

  useEffect(() => {
    if (employee) {
      setNewFirstName(employee.firstName);
      setNewPosition(employee.position);
    }
  }, [employee]);

  const handleUpdate = () => {
    if (employee) {
      onUpdate(employee._id, newFirstName, newPosition);
      onClose();
    }
  };

  if (!isOpen || !employee) return null;

  return (
    <Modal>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalHeader>Editar Empleado</ModalHeader>
        <ModalInput
          type="text"
          value={newFirstName}
          onChange={(e) => setNewFirstName(e.target.value)}
          placeholder="Nuevo nombre"
        />
        <ModalInput
          type="text"
          value={employee.lastName}
          readOnly
          placeholder="Apellido"
        />
        <ModalInput
          type="text"
          value={employee.birthDate}
          readOnly
          placeholder="Fecha de nacimiento"
        />
        <ModalSelect
          value={newPosition}
          onChange={(e) => setNewPosition(e.target.value)}
        >
          <option value="">Seleccione una posición</option>
          {positions.map((position, index) => (
            <option key={index} value={position}>
              {position}
            </option>
          ))}
        </ModalSelect>
        <Button onClick={handleUpdate}>Actualizar</Button>
        <CancelButton onClick={onClose}>Cancelar</CancelButton>
      </ModalContent>
    </Modal>
  );
};

export default EmployeeModal;
