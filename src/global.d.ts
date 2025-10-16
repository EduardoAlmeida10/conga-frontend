declare global {
  interface Window {
    toast: (title: string, message: string, type: "success" | "info" | "error") => void;
  }
}

export {};
