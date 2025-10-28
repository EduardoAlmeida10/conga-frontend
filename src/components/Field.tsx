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

interface CommonFieldProps {
  id?: string;
  title?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  helperText?: React.ReactNode;
  status?: FieldStatus;
  message?: React.ReactNode;
  className?: string; 
}

type InputFieldProps = CommonFieldProps &
  Omit<React.ComponentPropsWithoutRef<'input'>, 'id' | 'className'> & {
    as?: 'input';
  };

type TextareaFieldProps = CommonFieldProps &
  Omit<React.ComponentPropsWithoutRef<'textarea'>, 'id' | 'className'> & {
    as: 'textarea';
  };

type FieldProps = InputFieldProps | TextareaFieldProps;

export default function Field(props: FieldProps) {
  const {
    id: providedId,
    title,
    icon,
    iconPosition = 'right',
    helperText,
    status = 'default',
    message,
    className = '',
    disabled,
  } = props;

  const autoId = useId();
  const id = providedId || autoId;

  const currentStyles = statusStyles[status];
  const isIconLeft = icon && iconPosition === 'left';
  const isIconRight = icon && iconPosition === 'right';

  const baseInputStyles =
    'block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6';
  
  const disabledStyles =
    'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200';

  const paddingStyles = `
    ${isIconLeft ? 'pl-10' : 'pl-3'}
    ${isIconRight ? 'pr-10' : 'pr-3'}
  `;

  const iconWrapperStyles = `
    absolute inset-y-0 flex items-center
    ${isIconLeft ? 'left-0 pl-3' : 'right-0 pr-3'}
    text-gray-400 peer-focus:text-blue-500
  `;
  
  const combinedClassName = `
    ${baseInputStyles} 
    ${paddingStyles} 
    ${disabledStyles} 
    ${className} 
    peer 
    ${currentStyles.ring}  
    ${currentStyles.bg}    
  `;

  const currentLength = String(props.value || '').length;
  const showCounter = props.as === 'textarea' && props.maxLength;
  const showStatusMessage = status !== 'default' && message;
  const showHelperText = status === 'default' && helperText;

  return (
    <div className="w-full">
      {title && (
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900 mb-2">
          {title}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className={iconWrapperStyles}>
            {icon}
          </div>
        )}

        {props.as === 'textarea' ? (
          <textarea
            id={id}
            disabled={disabled}
            className={combinedClassName}
            {...props} 
          />
        ) : (
          <input
            id={id}
            disabled={disabled}
            className={combinedClassName}
            {...props}
          />
        )}
      </div>

      {(showStatusMessage || showHelperText || showCounter) && (
        <div className="mt-2 flex justify-between text-sm">
          {showStatusMessage && (
            <span className={`flex items-center ${currentStyles.text}`}>
              {currentStyles.icon && (
                <span className="mr-1.5">{currentStyles.icon}</span>
              )}
              {message}
            </span>
          )}
          {showHelperText && (
            <span className={currentStyles.text}>
              {helperText}
            </span>
          )}
          {showCounter && (
            <span className={`text-gray-500 ${!showStatusMessage && !showHelperText ? 'w-full text-right' : ''}`}>
              {currentLength}/{props.maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
}