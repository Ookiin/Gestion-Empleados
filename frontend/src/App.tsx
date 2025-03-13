// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterEmployee from "./pages/RegisterEmployee";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminLayout from "./layouts/adminLayout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/adminDashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="register-employee" element={<RegisterEmployee />} />
        </Route>
        <Route path="/employeeDashboard" element={<EmployeeDashboard />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
