import type { FC } from "react";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

const Toggle: FC<ToggleProps> = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div
        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
          checked ? "bg-blue-500" : "bg-gray-300"
        }`}
        onClick={() => onChange(!checked)}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
            checked ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </div>
      {label && <span>{label}</span>}
    </label>
  );
};

export default Toggle;
