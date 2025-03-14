import { Card } from "../../styles";
import { CardEmployeeProps } from "../utilities/interfaces";

export default function CardEmployee({ employee }: CardEmployeeProps) {
  const { firstName, lastName, position, email, birthDate } = employee;
  return (
    <Card>
      <h3>{`${firstName} ${lastName}`}</h3>
      <p>
        <strong>Posición:</strong> {position}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Fecha de Nacimiento:</strong>{" "}
        {new Date(birthDate).toLocaleDateString("es-ES")}
      </p>
    </Card>
  );
}
