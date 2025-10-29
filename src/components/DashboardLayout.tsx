import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./SideBar/Sidebar";
import PageHeader from "./PageHeader";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout() {
  const today = new Date().toLocaleDateString("pt-BR");
  const { user } = useAuth();
  const name = user?.name ?? user?.username ?? "Usuário";
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/dashboard-admin":
        return "Visão Geral";
      case "/dashboard-colaborador":
        return "Visão Geral";
      case "/despesas":
        return "Gestão de Despesas";
      case "/usuarios":
        return "Gestão de Usuários";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="flex h-screen overflow-hidden gap-8">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-5">
        <PageHeader title={getTitle()} nameUser={name} date={today} />
        <Outlet />
      </main>
    </div>
  );
}
