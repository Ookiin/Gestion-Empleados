// src/pages/RegisterEmployee.jsx
import { useState, useEffect } from "react";
import axios from "axios";

function RegisterEmployee() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get(
          "https://ibillboard.com/api/positions"
        );
        setPositions(response.data);
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };

    fetchPositions();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const newEmployee = {
        firstName,
        lastName,
        position,
        birthDate,
      };
      await axios.post("http://localhost:5000/api/employees", newEmployee);
      alert("Empleado registrado");
    } catch (error) {
      console.error("Error registrando empleado:", error);
      alert("Error registrando empleado");
    }
  };

  return (
    <div>
      <h2>Registrar Empleado</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Primer nombre"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <select onChange={(e) => setPosition(e.target.value)} value={position}>
          <option value="">Seleccionar puesto</option>
          {positions.map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>
        <input
          type="date"
          placeholder="Fecha de nacimiento"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default RegisterEmployee;
