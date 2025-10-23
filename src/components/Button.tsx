import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const variants = {
  primary:
    "bg-primary-100 text-white hover:bg-primary-200 focus:bg-primary-200 ",
  secondary: "",
  outline: "",
};

const Button = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex justify-center items-center rounded cursor-pointer h-12 px-3 gap-2 focus:outline-none ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
