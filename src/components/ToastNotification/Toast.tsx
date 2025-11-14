import { useEffect } from "react";
import iconSuccess from "../../assets/iconSuccess.png";
import iconError from "../../assets/iconError.svg";
import iconInfo from "../../assets/iconInfo.svg";

interface ToastProps {
  message: string;
  title?: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

export default function Toast({ title, message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const typeStyles = {
    success: "bg-[#C0ECC5] border-2 border-[#9AC39F]",
    error: "bg-[#FFD8D8] border-2 border-[#E6B3B3]",
    info: "bg-[#CCEAFB] border-2 border-[#0097E6]",
  };

  const typeIcons = {
    success: iconSuccess,
    error: iconError,
    info: iconInfo,
  };

  return (
    <div className={`px-4 py-2 rounded shadow-lg mb-2 transition-transform transform animate-slide-in ${typeStyles[type]}`}>
      <div className="flex items-start gap-2">
        <img
          src={typeIcons[type]}
          alt={`${type} icon`}
          className="w-6 h-6 mt-0.5"
        />
        <div className="flex-1">
          {title && <h1 className="font-bold">{title}</h1>}
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}
