import NavItem from "../NavItem";

import { sideBarItems } from "./SideBarItems";
import iconLogo from "../../assets/iconLogo.svg";

const Sidebar = () => {
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
          {sideBarItems.map((item) => (
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
