export interface Employee {
  user: {
    _id: string;
  };
  _id: string;
  firstName: string;
  lastName: string;
  position: string;
  birthDate: number;
  email: string;
}

export interface EmployeeModalProps {
  isOpen: boolean;
  employee: Employee | null;
  positions: string[];
  onUpdate: (
    employeeId: string,
    newFirstName: string,
    newPosition: string
  ) => void;
  onClose: () => void;
}

export interface DataToSend {
  position: string;
  firstName?: string;
}

export interface ButtonProps {
  buttonText: string;
  onDeleteUser?: () => void;
  color: string;
}

export interface EmployeesContextType {
  employeesLength: number;
  setEmployeesLength: (length: number) => void;
}
