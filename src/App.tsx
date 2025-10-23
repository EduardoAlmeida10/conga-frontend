import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import AdminDashboard from "./pages/Dashboards/AdminDashboard";
import CollaboratorDashboard from "./pages/Dashboards/ColaboradorDashboard";
import PrivateRoute from "./components/PrivateRoute";
import DashboardLayout from "./components/DashboardLayout";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard-admin"
            element={
              <PrivateRoute allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard-colaborador"
            element={
              <PrivateRoute allowedRoles={["COLLABORATOR"]}>
                <CollaboratorDashboard />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
