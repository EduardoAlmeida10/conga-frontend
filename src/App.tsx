import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import AdminDashboard from "./pages/Dashboards/AdminDashboard";
import CollaboratorDashboard from "./pages/Dashboards/ColaboradorDashboard";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard-admin" element={<AdminDashboard />} />
        <Route path="/dashboard-colaborador" element={<CollaboratorDashboard />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
