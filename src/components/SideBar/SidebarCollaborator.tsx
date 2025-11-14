import NavItem from "../NavItem";

import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import iconLogo from "../../assets/iconLogo.svg";
import { sideBarCollaboratorItems } from "./SideBarItems";

const SidebarCollaborator = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (logout) {
      logout(); // limpa usuário e token do contexto e do localStorage
    }
    navigate("/"); // redireciona para a tela de login
  };

  return (
    <aside className="w-64 h-screen bg-white flex flex-col p-4">
      <div className="flex items-center pt-2 pb-8 px-2">
        <span className="flex gap-1 items-center text-2xl font-bold text-gray-800">
          <img src={iconLogo} alt="" />
          ConGa
        </span>
        <span className="text-xs text-gray-500 ml-1 self-start">v.01</span>
      </div>

      <nav>
        <ul className="list-none p-0 m-0">
          {sideBarCollaboratorItems.map((item) => (
            <NavItem
              key={item.text}
              to={item.to}
              icon={item.icon}
              text={item.text}
              hasSubmenu={item.hasSubmenu}
            />
          ))}
        </ul>
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 cursor-pointer"
          title="Sair"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>
    </aside>
  );
};

export default SidebarCollaborator;
