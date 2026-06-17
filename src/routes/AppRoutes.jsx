import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout.jsx";
import Appointments from "../pages/Appointments.jsx";
import Clients from "../pages/Clients.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Services from "../pages/Services.jsx";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="clientes" element={<Clients />} />
          <Route path="servicos" element={<Services />} />
          <Route path="agendamentos" element={<Appointments />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
