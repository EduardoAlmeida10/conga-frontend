import { HashRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import PrivateRoute from "./components/PrivateRoute";
import ToastContainer from "./components/ToastNotification/ToastConteiner";
import CollaboratorDashboard from "./pages/ColaborattorDashboard/ColaboradorDashboard";
import AdminDashboard from "./pages/Dashboards/AdminDashboard";
import Expenses from "./pages/Expenses/Expenses";
import Login from "./pages/Login/Login";
import Users from "./pages/Users/Users";
import ProductionRevenue from "./pages/ProductionRevenue/ProductionRevenue";

function App() {
  return (
    <>
      <ToastContainer />
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
              path="/producao"
              element={
                <PrivateRoute allowedRoles={["ADMIN"]}>
                  <ProductionRevenue />
                </PrivateRoute>
              }
            />
            <Route
              path="/despesas"
              element={
                <PrivateRoute allowedRoles={["ADMIN"]}>
                  <Expenses />
                </PrivateRoute>
              }
            />
            <Route
              path="/usuarios"
              element={
                <PrivateRoute allowedRoles={["ADMIN"]}>
                  <Users />
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
    </>
  );
}

export default App;
