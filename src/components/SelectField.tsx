import React, { useId } from 'react';

import {
  FaExclamationTriangle, 
  FaExclamationCircle,   
  FaCheckCircle,         
  FaSpinner,             
} from 'react-icons/fa';

const statusStyles = {
  default: {
    ring: 'ring-gray-300 focus:ring-blue-500', 
    bg: 'bg-white', 
    text: 'text-gray-500', 
    icon: null,
  },
  validation: {
    ring: 'ring-yellow-500', 
    bg: 'bg-yellow-50', 
    text: 'text-yellow-700',
    icon: <FaExclamationTriangle />,
  },
  error: {
    ring: 'ring-red-500', 
    bg: 'bg-red-50', 
    text: 'text-red-700', 
    icon: <FaExclamationCircle />,
  },
  loading: {
    ring: 'ring-gray-300 focus:ring-blue-500', 
    bg: 'bg-white',
    text: 'text-gray-500', 
    icon: <FaSpinner className="animate-spin" />,
  },
  success: {
    ring: 'ring-green-500', 
    bg: 'bg-white', 
    text: 'text-green-700', 
    icon: <FaCheckCircle />,
  },
};

type FieldStatus = keyof typeof statusStyles;

interface SelectProps extends React.ComponentPropsWithoutRef<'select'> {
  id?: string;
  
  title?: string;
  
  status?: FieldStatus;
  
  message?: React.ReactNode;
}

export default function SelectField({
  title,
  id: providedId,
  status = 'default', 
  message,          
  
  disabled,
  className = '',
  children, 
  ...rest
}: SelectProps) {
  
  const autoId = useId();
  const id = providedId || autoId;

  const currentStyles = statusStyles[status];
  const selectStyles =
    'block w-full rounded-md border-0 py-2.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6';
  
  const disabledStyles = 
    'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200';

  const showStatusMessage = status !== 'default' && message;

  return (
    <div className="w-full">
      {title && (
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900 mb-2">
          {title}
        </label>
      )}

      <select
        id={id}
        disabled={disabled}
        className={`
          ${selectStyles} 
          ${disabledStyles} 
          ${className} 
          ${currentStyles.ring}  
          ${currentStyles.bg}    
        `}
        {...rest}
      >
        {children}
      </select>

      {showStatusMessage && (
        <div className={`mt-2 flex items-center text-sm ${currentStyles.text}`}>
          {currentStyles.icon && (
            <span className="mr-1.5">{currentStyles.icon}</span>
          )}
          {message}
        </div>
      )}
    </div>
  );
}