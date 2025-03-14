import { useState } from "react";
import {
  ModalPassword,
  ModalContentPassword,
  ModalHeaderPassword,
  InputPassword,
  ButtonPassword,
  ModalFooter,
} from "../../styles";
import { forgotPassword } from "../services/authService";

const ForgotPasswordModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [email, setEmail] = useState<string>("");

  const handleForgotPassword = async () => {
    try {
      const data = await forgotPassword(email);
      if (data.message) {
        alert("Revisa tu bandeja de entrada para el enlace de recuperación.");
      } else {
        alert("Ocurrió un error. Intenta nuevamente.");
      }
    } catch {
      alert("Hubo un problema al enviar el email. Intenta nuevamente.");
    }
  };

  return isOpen ? (
    <ModalPassword>
      <ModalContentPassword>
        <ModalHeaderPassword>Recuperar Contraseña</ModalHeaderPassword>
        <InputPassword
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
        />
        <ModalFooter>
          <ButtonPassword onClick={handleForgotPassword}>
            Enviar enlace
          </ButtonPassword>
          <ButtonPassword onClick={onClose}>Cancelar</ButtonPassword>
        </ModalFooter>
      </ModalContentPassword>
    </ModalPassword>
  ) : null;
};

export default ForgotPasswordModal;
