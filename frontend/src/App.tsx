// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterEmployee from "./pages/RegisterEmployee";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterEmployee />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
