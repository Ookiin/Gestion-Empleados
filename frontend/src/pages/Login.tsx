import { useState } from "react";
import { loginUser } from "../services/authService.js";
import { useNavigate } from "react-router-dom";
import {
  LoginContainer,
  FormWrapper,
  Title,
  Input,
  Button,
} from "../../styles/index.js";
import ForgotPasswordModal from "./ForgetPassword.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      if (data.token && data.role) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      } else {
        alert("Error en el login");
      }
    } catch (error) {
      console.error(error);
      alert("Error en el login");
    }
  };

  return (
    <LoginContainer>
      <FormWrapper>
        <Title>Iniciar Sesión</Title>
        <form onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Iniciar Sesión</Button>
        </form>
        <Button onClick={() => setIsModalOpen(true)}>
          Olvidé mi contraseña
        </Button>

        <ForgotPasswordModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </FormWrapper>
    </LoginContainer>
  );
}
