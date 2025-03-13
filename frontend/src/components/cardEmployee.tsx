import { CardEmployeeProps } from "../utilities/interfaces";

const CardEmployee: React.FC<CardEmployeeProps> = ({ employee }) => {
  return (
    <div style={styles.card}>
      <h3>
        {employee.firstName} {employee.lastName}
      </h3>
      <p>
        <strong>Posición:</strong> {employee.position}
      </p>
      <p>
        <strong>Email:</strong> {employee.email}
      </p>
      <p>
        <strong>Fecha de Nacimiento:</strong>{" "}
        {new Date(employee.birthDate).toLocaleDateString("es-ES")}
      </p>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "20px",
    margin: "10px 0",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
};

export default CardEmployee;
