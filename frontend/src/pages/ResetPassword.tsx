import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ContainerReset,
  Message,
  StyledButtonReset,
  StyledInput,
  TitleReset,
} from "../../styles/index";
import { resetPassword } from "../services/authService";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      const data = await resetPassword(token!, newPassword);
      setMessage(
        data.message ||
          "Contraseña actualizada con éxito. Puedes iniciar sesión ahora."
      );
      alert("Contraseña actualizada con éxito. Puedes iniciar sesión ahora.");
      navigate("/login");
    } catch {
      setMessage(
        "Hubo un problema al restablecer la contraseña. Intenta nuevamente."
      );
    }
  };

  return (
    <div style={{ marginTop: "200px" }}>
      <ContainerReset>
        <TitleReset>Restablecer Contraseña</TitleReset>
        <StyledInput
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Nueva contraseña"
        />
        <StyledButtonReset onClick={handleResetPassword}>
          Restablecer contraseña
        </StyledButtonReset>
        {message && <Message>{message}</Message>}
      </ContainerReset>
    </div>
  );
}
