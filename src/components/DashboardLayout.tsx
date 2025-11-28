import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PageHeader from "./PageHeader";
import Sidebar from "./SideBar/Sidebar";
import SidebarCollaborator from "./SideBar/SidebarCollaborator";

export default function DashboardLayout() {
  const today = new Date().toLocaleDateString("pt-BR");
  const { user } = useAuth();
  const name = user?.name ?? user?.username ?? "Usuário";
  const location = useLocation();

  const getSidebar = () => {
    if (user?.role === "ADMIN") {
      return <Sidebar />;
    }
    return <SidebarCollaborator />;
  };

  const getTitle = () => {
    switch (location.pathname) {
      case "/dashboard-admin":
        return "Visão Geral";
      case "/dashboard-colaborador":
        return "Registro de Produção Diária";
      case "/despesas":
        return "Gestão de Despesas";
      case "/usuarios":
        return "Gestão de Usuários";
      case "/producao":
        return "Gestão de Produção";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="flex h-screen overflow-hidden gap-5 pr-5">
      {getSidebar()}
      <main className="flex-1 overflow-y-auto p-5">
        <PageHeader title={getTitle()} nameUser={name} date={today} />
        <Outlet />
      </main>
    </div>
  );
}
