import { useState, useEffect } from "react";
import axios from "axios";
import {
  ButtonRegister,
  ContainerRegister,
  FormRegister,
  InputRegister,
  SelectRegister,
  TitleRegister,
} from "../../styles";
import { useNavigate } from "react-router-dom";
import { fetchPositions } from "../services/authService";

const apiUrl = import.meta.env.VITE_API_URL;

export default function RegisterEmployee() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [positions, setPositions] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const getPositions = async () => {
    const response = await fetchPositions();
    setPositions(response.positions);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token no encontrado");
      return;
    }

    try {
      const newEmployee = {
        firstName,
        lastName,
        position,
        birthDate,
        email,
        password,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      await axios.post(`${apiUrl}/employees`, newEmployee, config);
      navigate("/adminDashboard");
    } catch (error) {
      console.error("Error registrando empleado:", error);
    }
  };

  const handleBack = () => {
    navigate("/adminDashboard");
  };

  useEffect(() => {
    getPositions();
  }, []);

  return (
    <ContainerRegister>
      <TitleRegister>Registrar Empleado</TitleRegister>
      <FormRegister onSubmit={handleSubmit}>
        <InputRegister
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputRegister
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputRegister
          type="text"
          placeholder="Primer nombre"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <InputRegister
          type="text"
          placeholder="Apellido"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <SelectRegister
          onChange={(e) => setPosition(e.target.value)}
          value={position}
        >
          <option value="">Seleccionar puesto</option>
          {positions.map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </SelectRegister>
        <InputRegister
          type="date"
          placeholder="Fecha de nacimiento"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <ButtonRegister type="submit">Registrar</ButtonRegister>
        <ButtonRegister type="button" onClick={handleBack}>
          Cancelar
        </ButtonRegister>
      </FormRegister>
    </ContainerRegister>
  );
}
