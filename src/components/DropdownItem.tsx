import React from 'react';

interface CommonProps {
  onClick?: () => void;
  isDisabled?: boolean;
}

type ListValueProps = CommonProps & {
  variant: 'list-value';
  label: string;
  isActive?: boolean; 
};

type MultiSelectProps = CommonProps & {
  variant: 'multiselect';
  label: string;
  isChecked: boolean; 
};

type SearchProps = CommonProps & {
  variant: 'search';
  category: string; 
  value: string;    
  isActive?: boolean;
};

type DropdownItemProps = ListValueProps | MultiSelectProps | SearchProps;


const baseStyles = "w-full flex items-center text-left p-2 rounded";
const interactiveStyles = "cursor-pointer hover:bg-gray-100"; 
const disabledStyles = "text-gray-400 cursor-not-allowed"; 


export default function DropdownItem(props: DropdownItemProps) {
  const { onClick, isDisabled = false } = props;

  let content: React.ReactNode;
  let textStyleClass = isDisabled ? 'text-gray-400' : 'text-gray-800';
  let ariaSelected = false;

  switch (props.variant) {
    
    case 'multiselect':
      ariaSelected = props.isChecked;
      content = (
        <>
          <input
            type="checkbox"
            readOnly
            checked={props.isChecked}
            disabled={isDisabled}
            className="mr-2 rounded text-blue-500 focus:ring-0 focus:ring-offset-0"
          />
          <span>{props.label}</span>
        </>
      );
      break;
    
    case 'search':
      ariaSelected = props.isActive || false;
      if (props.isActive && !isDisabled) {
        textStyleClass = 'text-blue-500';
      }
      content = (
        <>
          <span className={`mr-2 ${props.isActive && !isDisabled ? 'text-blue-500' : 'text-gray-500'}`}>
            {props.category}
          </span>
          <span>{props.value}</span>
        </>
      );
      break;

    case 'list-value':
    default:
      ariaSelected = props.isActive || false;
      if (props.isActive && !isDisabled) {
        textStyleClass = 'text-blue-500';
      }
      content = <span>{props.label}</span>;
      break;
  }

  return (
    <li role="option" aria-selected={ariaSelected}>
      <button
        type="button"
        onClick={onClick}
        disabled={isDisabled}
        className={`
          ${baseStyles} 
          ${isDisabled ? disabledStyles : interactiveStyles} 
          ${textStyleClass}
        `}
      >
        {content}
      </button>
    </li>
  );
}