import styled from "styled-components";

// LOGIN STYLES ////////////////////////////////////////////

export const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #242424;
  padding: 20px;
`;

export const FormWrapper = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

export const Title = styled.h2`
  text-align: center;
  color: #333;
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin: 0.8rem 0;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #4ca1af;
    box-shadow: 0 0 5px rgba(76, 161, 175, 0.5);
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #4ca1af;
  border: none;
  color: white;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #2c3e50;
  }
`;

// DASHBOARD STYLES ///////////////////////////////////////////////////////////////////

export const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #f4f4f9;
  border-radius: 10px;
  margin-top: 100px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const TitleDashboard = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
`;

export const EmployeeList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const EmployeeItem = styled.li`
  display: flex;
  align-items: center; /* Alineamos el contenido en el centro */
  justify-content: space-between; /* Separar nombre y botón */
  background-color: #fff;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: #333; /* Color para el texto */

  &:hover {
    background-color: #f4f4f9;
  }
`;

export const EmployeeInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center; // Centra el contenido horizontalmente
  align-items: center; // Centra el contenido verticalmente
  position: absolute;
  top: 0; // Posiciona el Search en la parte superior
  width: 100%;
  padding: 20px;
  background-color: #242424;
`;

// MODAL //////////////////////////////////////////////////////////////////////////

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
`;

export const ModalHeader = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

export const ModalInput = styled.input`
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
`;

export const ModalSelect = styled.select`
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
`;

export const ButtonDashboard = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  margin-bottom: 1rem;

  &:hover {
    background-color: #45a049;
  }
`;

export const CancelButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;

  &:hover {
    background-color: #e53935;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;

  &:hover {
    color: #e53935;
  }
`;

// LOGOUT BUTTON STYLES ///////////////////////////////////////////////////////////////////

interface StyledButtonProps {
  color: string;
  $buttonText: string;
}

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  height: 50%;
  padding: 10px;
`;

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${({ color }) => color};
  color: white;
  font-weight: 600;
  padding: ${({ $buttonText }) =>
    $buttonText === "Eliminar empleado" ? "0.5rem 1rem" : "1rem"};
  border-radius: 8px;
  transition: background-color 0.3s, box-shadow 0.3s;
  cursor: pointer;
  width: ${({ $buttonText }) =>
    $buttonText === "Eliminar empleado" ? "auto" : "50%"};
  margin-left: ${({ $buttonText }) =>
    $buttonText === "Eliminar empleado" ? "10px" : "0"};
  align-self: ${({ $buttonText }) =>
    $buttonText === "Eliminar empleado" ? "center" : "stretch"};

  &:hover {
    background-color: ${({ color }) => color};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

//  NEW EMPLOYEE  ///////////////////////////////////////////////////////////////////

export const ContainerRegister = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const TitleRegister = styled.h2`
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

export const FormRegister = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const InputRegister = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4d90fe;
  }

  &::placeholder {
    color: #aaa;
  }
`;

export const SelectRegister = styled.select`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4d90fe;
  }
`;

export const ButtonRegister = styled.button`
  padding: 12px;
  background-color: #4d90fe;
  color: #ffffff;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #357ae8;
  }

  &:active {
    background-color: #2e6cb3;
  }
`;

// EMPLOYEE DASHBOARD ///////////////////////////////////////////////////////////////////

export const DashboardContainerEmployee = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #242424;
`;

export const CardEmployee = styled.div`
  background: white;
  padding: 2rem;
  color: black;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px;
  text-align: center;
`;

export const EmployeeInfoEmployee = styled.div`
  margin: 1rem 0;
  text-align: left;
  p {
    margin: 0.5rem 0;
  }
`;

export const SelectContainerEmployee = styled.div`
  margin-top: 1rem;
  text-align: left;
  label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }
`;

export const StyledSelectEmployee = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
`;

export const StyledButtonEmployee = styled.button`
  background-color: #007bff;
  color: white;
  font-weight: 600;
  padding: 0.75rem;
  border-radius: 8px;
  transition: background-color 0.3s, box-shadow 0.3s;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  border: none;
  outline: none;

  &:hover {
    background-color: #0056b3;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;
