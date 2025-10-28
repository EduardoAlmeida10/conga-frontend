import NavItem from './NavItem';
import { 
  FaHome, 
  FaRegCircle, 
  FaFileAlt, 
  FaUsers 
} from 'react-icons/fa';

const menuItems = [
  { 
    to: "/dashboard-admin", 
    icon: <FaHome />, 
    text: "Dashboard",
    hasSubmenu: false 
  },
  { 
    to: "/producao", 
    icon: <FaRegCircle />, 
    text: "Produção e Receita", 
    hasSubmenu: true 
  },
  { 
    to: "/despesas", 
    icon: <FaRegCircle />, 
    text: "Despesas", 
    hasSubmenu: true 
  },
  { 
    to: "/relatorios", 
    icon: <FaFileAlt />, 
    text: "Relatórios", 
    hasSubmenu: true 
  },
  { 
    to: "/usuarios", 
    icon: <FaUsers />, 
    text: "Usuários", 
    hasSubmenu: true 
  },
];

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-white flex flex-col p-4">
      
      <div className="flex items-center pt-2 pb-8 px-2">
        <span className="text-2xl font-bold text-gray-800">ConGa</span>
        <span className="text-xs text-gray-500 ml-1 self-start">v.01</span>
      </div>

      <nav>
        <ul className="list-none p-0 m-0">
          {menuItems.map((item) => (
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
    </aside>
  );
};

export default Sidebar;