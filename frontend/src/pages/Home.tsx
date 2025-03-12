import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import EmployeeDashboard from "../pages/EmployeeDashboard";

function Home() {
  const navigate = useNavigate();

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");

    if (storedRole) {
      setRole(storedRole);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <h2>Bienvenido</h2>
      {role === "admin" ? (
        <AdminDashboard />
      ) : role === "employee" ? (
        <EmployeeDashboard />
      ) : (
        <p>Redirigiendo...</p>
      )}
    </div>
  );
}

export default Home;
