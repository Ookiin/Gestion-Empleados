import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../styles";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return <StyledButton onClick={handleLogout}>Cerrar sesión</StyledButton>;
}
