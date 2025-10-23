import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  hasSubmenu?: boolean;
}

const baseLinkClasses = "flex items-center py-3 px-4 rounded-lg mb-1 transition-colors duration-200";

const inactiveLinkClasses = "text-gray-600 hover:bg-gray-100";
const activeLinkClasses = "bg-blue-500 text-white font-bold";
const iconClasses = "text-xl w-8 flex justify-center items-center mr-3";
const textClasses = "flex-grow text-sm";


const NavItem = ({ to, icon, text, hasSubmenu }: NavItemProps) => {
  return (
    <li className="list-none"> 
      <NavLink 
        to={to} 
        className={({ isActive }) => 
          `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
        }
      >
        {({ isActive }) => (
          <>
            <span className={iconClasses}>{icon}</span>
            <span className={textClasses}>{text}</span>
            {hasSubmenu && (
              <FaChevronRight 
                className={`text-xs ${isActive ? 'text-white' : 'text-gray-400'}`} 
              />
            )}
          </>
        )}
      </NavLink>
    </li>
  );
};

export default NavItem;