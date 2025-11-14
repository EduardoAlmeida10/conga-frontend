import { TrendingDown, TrendingUp } from "lucide-react";
import { FaFileAlt, FaHome, FaUsers } from "react-icons/fa";

export const sideBarItems = [
  {
    to: "/dashboard-admin",
    icon: <FaHome />,
    text: "Dashboard",
    hasSubmenu: false,
  },
  {
    to: "/producao",
    icon: <TrendingUp />,
    text: "Produção e Receita",
    hasSubmenu: true,
  },
  {
    to: "/despesas",
    icon: <TrendingDown />,
    text: "Despesas",
    hasSubmenu: true,
  },
  {
    to: "/relatorios",
    icon: <FaFileAlt />,
    text: "Relatórios",
    hasSubmenu: true,
  },
  {
    to: "/usuarios",
    icon: <FaUsers />,
    text: "Usuários",
    hasSubmenu: true,
  },
];
