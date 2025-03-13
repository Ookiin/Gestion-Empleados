import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../styles";
import { ButtonProps } from "../utilities/interfaces";
import { deleteEmployee } from "../services/authService"; // Asegúrate de importar deleteEmployee

export default function ActionButton({
  buttonText,
  token,
  employeeId,
  color,
}: ButtonProps & { token: string; employeeId: string }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleAction = async () => {
    if (buttonText === "Cerrar Sesión") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      navigate("/login");
    } else if (buttonText === "Eliminar empleado") {
      try {
        await deleteEmployee(token, employeeId);
        if (
          employeeId === JSON.parse(localStorage.getItem("user")!)._id &&
          role === "employee"
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("user");
          navigate("/login");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error al eliminar el empleado:", error);
      }
    } else if (buttonText === "Nuevo Empleado") {
      navigate("/adminDashboard/register-employee");
    }
  };

  return (
    <StyledButton onClick={handleAction} color={color} $buttonText={buttonText}>
      {buttonText}
    </StyledButton>
  );
}
