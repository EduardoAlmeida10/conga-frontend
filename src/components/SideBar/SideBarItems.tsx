import { FaHome, FaRegCircle, FaFileAlt, FaUsers } from "react-icons/fa";

export const sideBarItems = [
  {
    to: "/dashboard-admin",
    icon: <FaHome />,
    text: "Dashboard",
    hasSubmenu: false,
  },
  {
    to: "/producao",
    icon: <FaRegCircle />,
    text: "Produção e Receita",
    hasSubmenu: true,
  },
  {
    to: "/despesas",
    icon: <FaRegCircle />,
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