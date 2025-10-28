import React from 'react';

interface ListboxProps {
  children: React.ReactNode;
  className?: string; 
}

export default function Listbox({ children, className = '' }: ListboxProps) {
  return (
    <ul
      role="listbox"
      className={`
        w-64 max-h-72 overflow-y-auto  
        rounded-md bg-white 
        border border-gray-300 
        shadow-lg p-1 
        focus:outline-none 
        ${className}
      `}
    >
      {children}
    </ul>
  );
}