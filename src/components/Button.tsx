import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void; 
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
}

const variants = {
  primary: "bg-primary-100 text-white hover:bg-primary-200 focus:bg-primary-200 ",
  secondary: "",
  outline: "",
};

const Button = ({
  children,
  variant = "primary",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`flex justify-center items-center rounded cursor-pointer h-12 focus:outline-none ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
