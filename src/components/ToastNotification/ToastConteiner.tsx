import { useState } from "react";
import Toast from "./Toast";

interface ToastData {
  id: number;
  message: string;
  title?: string;
  type: "success" | "info" | "error";
}

let toastId = 0;

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = (
    title: string,
    message: string,
    type: "success" | "info" | "error",
  ) => {
    toastId++;
    const newToast = { id: toastId, title, message, type };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  window.toast = addToast;

  return (
    <div className="fixed top-4 right-4 z-50">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          title={toast.title}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}
