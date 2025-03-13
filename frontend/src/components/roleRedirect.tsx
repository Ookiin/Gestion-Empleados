import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RoleRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role === "admin") {
      navigate("/adminDashboard");
    } else if (role === "employee") {
      navigate("/employeeDashboard");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <p>Redirigiendo...</p>
    </div>
  );
}
