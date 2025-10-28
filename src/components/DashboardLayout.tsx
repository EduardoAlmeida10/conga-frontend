import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import PageHeader from "./PageHeader";

export default function DashboardLayout() {
  const today = new Date().toLocaleDateString("pt-BR");
  const userName = "Carlos";
  const title = "Gestão de Despesas"
  return (
    <div className="flex h-screen overflow-hidden gap-8">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-5">
        <PageHeader title={title} userName={userName} date={today} />
        <Outlet />
      </main>
    </div>
  );
}
